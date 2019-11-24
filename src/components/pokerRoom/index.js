import React, {Component} from 'react';
import PokerTable from "./PokerTable";
import GameControlButtons from './GameControlButtons'
import './index.css'


class PokerRoom extends Component {
    render() {
        return (
            <div className={'poker_room-wrap'}>
                <PokerTable></PokerTable>
                <GameControlButtons bank ={'100'} stack ={'1200'} minCall = {'2'} chooseToRaise = {'2'}></GameControlButtons>
            </div>


        );
    }
}

export default PokerRoom;