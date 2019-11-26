import React, {Component} from 'react';
import PokerTable from "./PokerTable";
import GameControlButtons from './GameControlButtons'
import {start, Handlers} from '../../core-game'
import './index.css'


class PokerRoom extends Component {
    state = {
        playerId: 111,
        players: [],
        bank: 50,
        stack: 150,
        minCall: 2,
        minRaise: 4,
        isBet: false
    };

    componentDidMount() {
        Handlers.setPlayersInfo = players => {
            this.setState({players});
        };
        console.log(this.state.players)

        Handlers.setCards = cards => {
            //
        }

        start();
    }

    setBank = (value) => {
        this.setState({bank: value})
    };

    onFold = () => {

    };

    onCall = (val) => {

    };

    onRaise = (val) => {

    };

    // onServerMessage = (mes) => {
    //     switch (mes.type) {
    //         case 'updatePlayersInfo':
    //             this.setState({players: mes.data.players});
    //             break;
    //         // case ''
    //     }
    // };

    render() {
        return (
            <div className={'poker_room-wrap'}>
                <PokerTable players={this.state.players}/>
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