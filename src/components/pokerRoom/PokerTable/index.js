import React, {Component} from 'react';
import {PlayerSeat} from './PlayerSeat';
import TableCards from "./TableCards";
import Button from "../../button";
import './index.css';


class PokerTable extends Component {
    state = {
        bayIn:0,
        visibleBlock:'none',
        players: [
            // {
            //     id: 111,
            //     name: 'Vasya',
            //     bank: 110,
            //     position: 'SB',
            //     cards: [46, 12],
            // },
            // {
            //     id: 222,
            //     name: 'Petya',
            //     bank: 220,
            //     position: 'BB',
            //     cards: [8, 11],
            // },
            // {
            //     id: 333,
            //     name: 'Pisun',
            //     bank: 330,
            //     position: '',
            //     cards: [45, 35],
            // }
        ],
        cardsOnTable: []
        // cardsOnTable: [0,1, 2, 3, 4]
    };
    hideBuyInBlock = () => {
        this.setState({visibleBlock: 'none'})
    };
    showBuyInBlock =  () =>{
        this.setState({visibleBlock: 'block'})
    };
    handleClickOnEmptySeat = (e) =>{
        this.props.getEmptySeatId(e);
        this.showBuyInBlock()
    };
    handleClickOnAcceptBuyIn =(e) =>{
        this.props.handleGetBuyIn(e);
        this.hideBuyInBlock();
    };

    handleChangeBuyInValue =(e)=>{
        this.setState({bayIn: e.target.value});
    };

    getPlayer = ({seatId}) => {
        return this.props.players.find(player => +player.seatId === +seatId);

    };

    render() {
        let {players, cardsOnTable, reservedSeats} = this.props;
        return (
            <div className="table_layout" >
                {/*форма получения размера бай-ина*/}
                <div className={`buy-in_window`} style={{display:`${this.state.visibleBlock}`}}>
                    <label htmlFor = {'buy-in_window-input'}>Введите сумму,которую возьмете за стол</label>
                    <input id={'buy-in_window-input'} type="number" placeholder={0} onChange={this.handleChangeBuyInValue}/>
                    <button onClick = {()=> {this.handleClickOnAcceptBuyIn(this.state.bayIn)} }>Принять</button>
                    <Button color={'red'} name={'test'}/>
                </div>

                <div className="table"></div>
                <div className="players-top_section player_wrap">
                    {/*ТРЕТИЙ ИГРОК*/}
                    {
                        (this.getPlayer({seatId: 3}))
                            ? <PlayerSeat playerData={this.getPlayer({seatId: 3})}/>
                            // ? <Button color={'red'} name={'test'}/> :

                            :(reservedSeats.findIndex(elem => elem && +elem.seatId === 3) !== -1
                                ? <div className="empty_seat">игрок садится</div>
                                : <div className="empty_seat" data-id = {'3'}
                                       onClick = {this.handleClickOnEmptySeat}>Занять место</div>)
                    }
                    {/*ЧЕТВЕРТЫЙ ИГРОК*/}
                    {
                        (this.getPlayer({seatId: 4}))
                            ? <PlayerSeat playerData={this.getPlayer({seatId: 4})}/>
                            :(reservedSeats.findIndex(elem => elem && +elem.seatId === 4) !== -1
                                ? <div className="empty_seat">игрок садится</div>
                                : <div className="empty_seat" data-id = {'4'} onClick = {this.handleClickOnEmptySeat}>Занять место</div>)
                    }
                </div>
                <div className="players-mid_section">

                {/*    ВТОРОЙ ИГРОК*/}
                {
                    (this.getPlayer({seatId: 2}))
                        ? <PlayerSeat playerData={this.getPlayer({seatId: 2})}/>
                        :(reservedSeats.findIndex(elem => elem && +elem.seatId === 2) !== -1
                        ? <div className="empty_seat">игрок садится</div>
                        : <div className="empty_seat" data-id = {'2'} onClick = {this.handleClickOnEmptySeat}>Занять место</div>)
                }
                {/*    Карты на столе*/}
                    {cardsOnTable && cardsOnTable.length > 0 ?
                        <div>
                            <TableCards cards={cardsOnTable}/>
                            <div className={'bank'}>Total pot: <span className={'bank_value'}> 100</span></div>
                            :
                        </div> :
                        <div className="cards-on-table">
                            <div className="card"></div>
                            <div className="card"></div>
                            <div className="card"></div>
                            <div className="card"></div>
                            <div className="card"></div>
                        </div>}
                {/*    ПЯТЫЙ ИГРОК*/}
                {
                    (this.getPlayer({seatId: 5}))
                        ? <PlayerSeat playerData={this.getPlayer({seatId: 5})}/>
                        :(reservedSeats.findIndex(elem => elem && +elem.seatId === 5) !== -1
                        ? <div className="empty_seat">игрок садится</div>
                        : <div className="empty_seat" data-id = {'5'} onClick = {this.handleClickOnEmptySeat}>Занять место</div>)
                }
                </div>
                <div className="players-bottom_section">
                {/*    ПЕРВЫЙ ИГРОК*/}
                {
                    (this.getPlayer({seatId: 1}))
                        ? <PlayerSeat playerData={this.getPlayer({seatId: 1})}/>
                        :(reservedSeats.findIndex(elem => elem && +elem.seatId === 1) !== -1
                        ? <div className="empty_seat">игрок садится</div>
                        : <div className="empty_seat" data-id = {'1'} onClick = {this.handleClickOnEmptySeat}>Занять место</div>)
                }
                {/*    НУЛЕВОЙ ИГРОК*/}
                    {
                        (this.getPlayer({seatId: 0}))
                            ? <PlayerSeat playerData={this.getPlayer({seatId: 0})}/>
                            :(reservedSeats.findIndex(elem => elem && +elem.seatId === 0) !== -1
                            ? <div className="empty_seat">игрок садится</div>
                            : <div className="empty_seat" data-id = {'0'} onClick = {this.handleClickOnEmptySeat}>Занять место</div>)
                    }
                </div>
            </div>
        );
    }
}

export default PokerTable;