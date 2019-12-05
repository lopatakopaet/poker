import React, {Component} from 'react';
import PokerTable from "./PokerTable";
import GameControlButtons from './GameControlButtons'
import './index.css'
import io from 'socket.io-client'

const socket = io('http://localhost:3030');

class PokerRoom extends Component {
    state = {
        reservedSeats: [],
        playersInGame: [],
        playersOnTable: [],
        currentUserId: '',
        bank: 0,
        cardsOnTable: [],
        stack: 150,
        minCall: 0,
        minRaise: 4,
        isBet: false,
        bet:'',
    };
    getEmptySeatId = (e) => {
        socket.emit('seat_reservation', {seatId: +e.target.dataset.id});
    };
    handleGetBuyIn = (value) => {
        socket.emit('get_buyIn', {buyIn: value, userId: socket.id});
    };

    componentDidMount() {
        socket.on('game-info', (mes) => this.onServerMessage(mes));
    }

    onFold = () => {
        socket.emit('fold');
    };

    onCall = () => {
        socket.emit('call');
    };

    onRaise = (val) => {
        socket.emit('raise', {value: val});
    };

    //ОБРАБОТЧИК СОБЫТИЙ С СЕРВЕРА
    onServerMessage = (mes) => {
        switch (mes.type) {
            case 'players_info':
                const {reservedSeats,bet, currentUserId, playersOnTable, playersInGame, bank, cardsOnTable, minCall} = mes.info;
                this.setState({
                    playersOnTable: playersOnTable || this.state.playersOnTable,
                    playersInGame: playersInGame || this.state.playersInGame,
                    reservedSeats: reservedSeats || this.state.reservedSeats,
                    bank: bank || this.state.bank,
                    minCall: minCall || this.state.minCall,
                    cardsOnTable: cardsOnTable || this.state.cardsOnTable,
                    currentUserId: currentUserId || this.state.currentUserId,
                    bet: bet || this.state.bet,

                });
                break;
        }
    };

    render() {
        let {playersOnTable, currentUserId, reservedSeats, playersInGame, bank, cardsOnTable} = this.state;
        return (
            <div className={'poker_room-wrap'}>
                <PokerTable
                    playersOnTable={playersOnTable}
                    playersInGame={playersInGame}
                    getEmptySeatId={this.getEmptySeatId}
                    reservedSeats={reservedSeats}
                    handleGetBuyIn={this.handleGetBuyIn}
                    cardsOnTable={cardsOnTable}
                    currentUserId={currentUserId}
                    bank={bank}
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