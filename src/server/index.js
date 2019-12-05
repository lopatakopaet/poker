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
        return this.minCall = +value;
    }

    setBank(value) {
        return this.bank += +value
    }
}

let moneyInGame = new MoneyInGame(1);
// let bank = 0;


// const onConnectUser = () => {
//     io.sockets.emit('game-info', {type: 'players_info', info: coreGame.getGlobalPlayersInfo()});
// };

io.on('connection', function (socket) {
    sockets.push(socket.id);
    // coreGame.setHands();
    // coreGame.setFlopCards();///test
    // coreGame.setTernCards();///test


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
        io.sockets.emit('game-info', {type: 'players_info', info: coreGame.getGlobalPlayersInfo()});
        io.sockets.emit('game-info', {
            type: 'players_info', info: {
                bank: moneyInGame.bank,
                minCall: moneyInGame.minCall,
            }
        });
        socket.emit('game-info', {type: 'players_info', info: {currentUserId: socket.id,}});
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
        sockets.forEach(elem => {
            io.to(elem).emit('game-info', {
                type: 'players_info', info: {
                    playersInGame: playersInGame.map(player => {
                        if (elem === player.userId) {
                            return player
                        } else if (player.inHand) {
                            return {...player, cards: [52, 52]}
                        } else return {...player, cards: []};
                    })
                }
            });
        })
    };

    refreshPokerTableDisplay();

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
            coreGame.bbDoBet(playersInGame, moneyInGame.bb);
            coreGame.sbDoBet(playersInGame, moneyInGame.sb);
            if (!coreGame.isContinueRound(playersInGame)) {
                coreGame.setFlopCards();///test
            }
            // coreGame.setTernCards();///test
            // coreGame.isContinueRound(playersInGame);///test


        }
        refreshPokerTableDisplay();
    });

    socket.on('fold', function (msg) {
        let playersInGame = coreGame.getPlayersInGame();
        let activeUser = coreGame.getActivePlayer(playersInGame);
        if (activeUser && activeUser.userId === socket.id) {
            coreGame.setActivePlayerInGame(playersInGame);
            coreGame.playerLost({userId: activeUser.userId});
            refreshPokerTableDisplay();
        }
        refreshPokerTableDisplay();
    });
    socket.on('call', function () {
        let playersInGame = coreGame.getPlayersInGame();
        let activeUser = coreGame.getActivePlayer(playersInGame);
        if (activeUser && activeUser.userId === socket.id) {
            coreGame.reducePlayerChips(playersInGame, socket.id, moneyInGame.minCall);
            moneyInGame.setBank(moneyInGame.minCall);
            coreGame.setActivePlayerInGame(playersInGame);
            coreGame.setPlayerBet(playersInGame, socket.id, moneyInGame.minCall);
            coreGame.isContinueRound(playersInGame);///test
            if (!coreGame.isContinueRound(playersInGame)) {
                !coreGame.setFlopCards() && coreGame.setFlopCards()
            }
            refreshPokerTableDisplay();
        }
    });
    socket.on('raise', (val) => {
        let {value} = val;
        let playersInGame = coreGame.getPlayersInGame();
        let activeUser = coreGame.getActivePlayer(playersInGame);
        if (activeUser && activeUser.userId === socket.id) {
            coreGame.reducePlayerChips(playersInGame, socket.id, value);
            moneyInGame.setBank(value);
            coreGame.setPlayerBet(playersInGame, socket.id, value);
            moneyInGame.setMinCall(value);
            // bank = moneyInGame.setBank(value);
            coreGame.setActivePlayerInGame(playersInGame);
            if (!coreGame.isContinueRound(playersInGame)) {
                !coreGame.setFlopCards() && coreGame.setFlopCards()
            }
            refreshPokerTableDisplay();
        }
    })
});

http.listen(3030, function () {
    console.log('listening on *:3030');
});