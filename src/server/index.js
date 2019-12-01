const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const coreGame = require('../core-game');

app.get('/', function (req, res) {
    res.send('<h1>Hello world</h1>');
});

const onConnectUser = () => {
    io.sockets.emit('game-info', {type: 'players_info', info: coreGame.getGlobalPlayersInfo()});
};
io.on('connection', function (socket) {

    onConnectUser();

    // let player = {
    //     id: socket.id,
    //     gameId: 4,
    //     name: 'Vasya',
    //     position: 'BB',
    //     stack: 200,
    //     cards: [46, 22]
    // };
    // playersOnTable.push(player);

    socket.on('disconnect', () => {
        coreGame.disconnectUser({userId: socket.id});
        io.sockets.emit('game-info', {type: 'players_info', info: coreGame.getGlobalPlayersInfo()});
    });

    //резервируем выбранное место за столом
    socket.on('seat_reservation', (data) => {
        coreGame.reserveSeat({seatId: data.seatId, userId: socket.id});
        io.sockets.emit('game-info', {type: 'players_info', info: coreGame.getGlobalPlayersInfo()});
    });
    //
    socket.on('get_buyIn', data => {
            let {buyIn, userId} = data;
        let {reservedSeats} = coreGame.getGlobalPlayersInfo();
        let elem = reservedSeats.find(elem => elem.userId === userId);
        let {seatId} = elem || {};
        coreGame.addPlayerOnTable({buyIn: buyIn, userId: socket.id, seatId: seatId});
        io.sockets.emit('game-info', {type: 'players_info', info: coreGame.getGlobalPlayersInfo()});

        // if (coreGame.isGameAllow()){
        //     let playersInGame = coreGame.setHands();
        //     playersInGame.forEach(elem => {
        //         io.to(elem.userId).emit('game-info', {type: 'players_info', info: {
        //                 playersOnTable: playersInGame.map(player => {
        //                     return elem.userId === player.userId ? elem : {...player, cards: [52, 52]};
        //                 })
        //         }});
        //     })
        // }
    });

    socket.on('fold', function (msg) {
        console.log(socket.id);
        // io.emit('chat message', msg);
    });

});

http.listen(3030, function () {
    console.log('listening on *:3030');
});