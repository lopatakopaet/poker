import React, {Component} from 'react';
import PokerTable from "./PokerTable";
import GameControlButtons from './GameControlButtons'
import './index.css'
// const players = require('../../core-game');

import io from 'socket.io-client'

const socket = io('http://localhost:3030');

class PokerRoom extends Component {
    state = {
        // playerId: 111,
        reservedSeats: [],
        players: [
            // {
            //     id : 11111,
            //     name : 'Vasya',
            //     position: 'BB',
            //     stack : 200,
            //     cards: [46, 12]
            // }
        ],
        bank: 50,
        stack: 150,
        minCall: 2,
        minRaise: 4,
        isBet: false
    };
    getEmptySeatId = (e) => {
        socket.emit('seat_reservation', {id: e.target.dataset.id});
    };
    handleGetBuyIn = (value) => {
        socket.emit('get_buyIn', {data: value})
    }


    componentDidMount() {
        socket.on('game-info', (mes) => this.onServerMessage(mes));
    }

    setBank = (value) => {
        this.setState({bank: value})
    };

    onFold = () => {
        socket.emit('fold');
    };

    onCall = (val) => {

    };

    onRaise = (val) => {

    };

    //ОБРАБОТЧИК СОБЫТИЙ С СЕРВЕРА
    onServerMessage = (mes) => {
        switch (mes.type) {
            case 'players-info':
                this.setState({players: mes.players});
                break;
            case 'reserved_seats':
                this.setState({reservedSeats: mes.data});
                break;
            case 'user_disconnected':
                this.setState({players: mes.players});
                break;
        }
    };

    render() {
        let {players, reservedSeats} = this.state;
        return (
            <div className={'poker_room-wrap'}>
                <PokerTable
                    players={players}
                    getEmptySeatId={this.getEmptySeatId}
                    reservedSeats={reservedSeats}
                    handleGetBuyIn={this.handleGetBuyIn}
                />
                <GameControlButtons
                    bank={this.state.bank}
                    stack={this.state.stack}
                    minCall={this.state.minCall}
                    minRaise={this.state.minRaise}
                    isBet={this.state.isBet}
                    onFold={this.onFold}
                    onCall={this.onCall}
                    onRaise={this.onRaise}
                />
            </div>


        );
    }
}

export default PokerRoom;