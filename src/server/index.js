const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const coreGame = require('../core-game');

app.get('/', function (req, res) {
    res.send('<h1>Hello world</h1>');
});

const sockets = [];
class MoneyInGame {
    constructor(sb) {
        this.sb = sb;
        this.bb = sb + sb;
        this.minCall = this.bb;
        this.bank = sb + this.bb;
    }

    setMinCall(value) {
        return this.minCall += value;
    }

    setBank(value) {
        return this.bank += value
    }
}


// const onConnectUser = () => {
//     io.sockets.emit('game-info', {type: 'players_info', info: coreGame.getGlobalPlayersInfo()});
// };

io.on('connection', function (socket) {
    sockets.push(socket.id);

    const sendPersonalPlayersInfo = () => {
        let playersOnTable = coreGame.getPlayersOnTable();
        playersOnTable.forEach(elem => {
            io.to(elem.userId).emit('game-info', {
                type: 'players_info', info: {
                    playersOnTable: playersOnTable.map(player => {
                        return elem.userId === player.userId ? elem : {...player, cards: [52, 52]};
                    })
                }
            });
        })
    };

    const refreshPokerTableDisplay = () => {
        io.sockets.emit('game-info', {type: 'players_info', info: coreGame.getGlobalPlayersInfo()})
        sendPersonalCardInfo();
    };

    // const sendPersonalCardInfo = (players) => {
    //     let playersInGame;
    //     if (players) playersInGame = players;
    //     else playersInGame = coreGame.getPlayersInGame();
    //     // playersInGame ? playersInGame : playersInGame = coreGame.getPlayersInGame();
    //     playersInGame.forEach(elem => {
    //         io.to(elem.userId).emit('game-info', {
    //             type: 'players_info', info: {
    //                 playersInGame: playersInGame.map(player => {
    //                     return elem.userId === player.userId ? elem : {...player, cards: [52, 52]};
    //                 })
    //             }
    //         });
    //     })
    // };

    const sendPersonalCardInfo = (players) => {
        let playersInGame;
        if (players) playersInGame = players;
        else playersInGame = coreGame.getPlayersInGame();
        // playersInGame ? playersInGame : playersInGame = coreGame.getPlayersInGame();
        sockets.forEach(elem => {
            io.to(elem).emit('game-info', {
                type: 'players_info', info: {
                    playersInGame: playersInGame.map(player => {
                        return elem === player.userId ? player : {...player, cards: [52, 52]};
                    })
                }
            });
        })
    };

    refreshPokerTableDisplay();

    // let player = {
    //     id: socket.id,
    //     gameId: 4,
    //     name: 'Vasya',
    //     position: 'BB',
    //     stack: 200,
    //     cards: [46, 22]
    // };

    socket.on('disconnect', () => {
        sockets.splice(sockets.findIndex(elem => elem === socket.id), 1);
        coreGame.disconnectUser({userId: socket.id});
        refreshPokerTableDisplay();

    });

    //резервируем выбранное место за столом
    socket.on('seat_reservation', (data) => {
        coreGame.reserveSeat({seatId: data.seatId, userId: socket.id});
        refreshPokerTableDisplay();
    });
    //
    // socket.on('get_buyIn', data => {
    //     let {buyIn, userId} = data;
    //     let {reservedSeats} = coreGame.getGlobalPlayersInfo();
    //     let elem = reservedSeats.find(elem => elem.userId === userId);
    //     let {seatId} = elem || {};
    //     coreGame.addPlayerOnTable({buyIn: buyIn, userId: socket.id, seatId: seatId});
    //     io.sockets.emit('game-info', {type: 'players_info', info: coreGame.getGlobalPlayersInfo(socket.id)});
    //
    //     if (coreGame.isGameAllow()){
    //         let playersInGame = coreGame.setHands();
    //         playersInGame.forEach(elem => {
    //             io.to(elem.userId).emit('game-info', {type: 'players_info', info: {
    //                     playersInGame: playersInGame.map(player => {
    //                         return elem.userId === player.userId ? elem : {...player, cards: [52, 52]};
    //                     })
    //             }});
    //         })
    //     }
    // });

    socket.on('get_buyIn', data => {
        let {buyIn, userId} = data;
        let {reservedSeats} = coreGame.getGlobalPlayersInfo();
        let elem = reservedSeats.find(elem => elem.userId === userId);
        let {seatId} = elem || {};
        coreGame.addPlayerOnTable({buyIn: buyIn, userId: socket.id, seatId: seatId});
        refreshPokerTableDisplay();
        if (coreGame.isGameAllow()) {
            let playersInGame = coreGame.setHands();
            coreGame.setPlayersPosition(playersInGame);
            coreGame.setActivePlayerInGame(playersInGame);
            let moneyInGame = new MoneyInGame(1);
            coreGame.bbDoBet(playersInGame,moneyInGame.bb);
            coreGame.sbDoBet(playersInGame,moneyInGame.sb);

        }
        // coreGame.newHand();
         refreshPokerTableDisplay();
    });

    socket.on('fold', function (msg) {
        let playersInGame = coreGame.getPlayersInGame();
        let activeUser =  coreGame.getActivePlayer(playersInGame);
        if (activeUser && activeUser.userId === socket.id) {
            coreGame.playerLost({userId: activeUser.userId});
            refreshPokerTableDisplay();
        }
        // io.emit('chat message', msg);
    });
});

http.listen(3030, function () {
    console.log('listening on *:3030');
});