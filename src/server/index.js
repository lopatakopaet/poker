const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const coreGame = require('../core-game');
let playersOnTable = [];
let reservedSeats = [];

app.get('/', function (req, res) {
    res.send('<h1>Hello world</h1>');
});

io.on('connection', function (socket) {
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
        let id = playersOnTable.findIndex((elem) => elem.id == socket.id);
        playersOnTable.splice(id, 1);
        io.sockets.emit('game-info', {type: 'user_disconnected',players:playersOnTable});
        let reservedSeatId = reservedSeats.findIndex(elem => elem.userId == socket.id);
        if (reservedSeatId != -1){
            reservedSeats.splice(reservedSeatId, 1);
        }
    })

    //резервируем выбранное место за столом
    socket.on('seat_reservation', (data) => {
        let player = {
            seatId: data.id,
            userId: socket.id,
        };
        if (reservedSeats.filter(elem => elem.seatId == data.id).length < 1){
            reservedSeats.push(player);
        }
        io.sockets.emit('game-info', {type: 'reserved_seats', data: reservedSeats});
        console.log(reservedSeats)
    })
    //дублирую событие, чтобы новый игрок видел зарезервированные места
    io.sockets.emit('game-info', {type: 'reserved_seats', data: reservedSeats});

    io.sockets.emit('game-info', {type: 'players-info', players: playersOnTable});

    socket.on('get_buyIn', buyIn =>{
        let value = buyIn.data;
        console.log(value)
    })



    socket.on('fold', function (msg) {
        console.log(socket.id);
        console.log(playersOnTable);
        // io.emit('chat message', msg);
    });

});

http.listen(3030, function () {
    console.log('listening on *:3030');
});