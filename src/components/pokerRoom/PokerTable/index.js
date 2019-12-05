import React, {Component} from 'react';
import {PlayerSeat} from './PlayerSeat';
import TableCards from "./TableCards";
import Button from "../../button";
import './index.css';


class PokerTable extends Component {
    state = {
        bayIn: 0,
        visibleBlock: 'none',
        cardsOnTable: []
    };
    hideBuyInBlock = () => {
        this.setState({visibleBlock: 'none'})
    };
    showBuyInBlock = () => {
        this.setState({visibleBlock: 'block'})
    };
    handleClickOnEmptySeat = (e) => {
        this.props.getEmptySeatId(e);
        this.showBuyInBlock()
    };
    handleClickOnAcceptBuyIn = (e) => {
        this.props.handleGetBuyIn(e);
        this.hideBuyInBlock();
    };

    handleChangeBuyInValue = (e) => {
        this.setState({bayIn: e.target.value});
    };

    getPlayer = ({seatId}) => {
        return this.props.playersOnTable.find(player => +player.seatId === +seatId);
    };
    getPlayerInGame = ({seatId}) => {
        return this.props.playersInGame.find(player => +player.seatId === +seatId);
    };

    render() {
        let {cardsOnTable, reservedSeats, bank, currentUserId, playersOnTable} = this.props;
        return (
            <div className="table_layout">
                {/*форма получения размера бай-ина*/}
                <div className={`buy-in_window`} style={{display: `${this.state.visibleBlock}`}}>
                    <img className={'buy-in_window-chips'} src="chipsImg/chips.png" alt="chips"/>
                    <div className={'buy-in_window-info-wrap'}>
                        <label htmlFor={'buy-in_window-input '}><span className={'buy-in_window-input-label'}>укажите сумму фишек</span></label>
                        <div className="buy-in_window-input-wrap">
                            <input id={'buy-in_window-input'} type="number" autoFocus={true} placeholder={0}
                                   onChange={this.handleChangeBuyInValue}/>
                            <Button onClick={() => {
                                this.handleClickOnAcceptBuyIn(this.state.bayIn)
                            }} color={'red'} name={'Подтвердить'}/>
                        </div>
                    </div>
                </div>

                <div className="table"></div>
                <div className="players-top_section player_wrap">
                    {/*ТРЕТИЙ ИГРОК*/}
                    {
                        (this.getPlayer({seatId: 3}))
                            ? <PlayerSeat playerData={this.getPlayer({seatId: 3})}
                                          playerInGame={this.getPlayerInGame({seatId: 3})}/>
                            : (reservedSeats.findIndex(elem => elem && +elem.seatId === 3) !== -1
                            ? <div className="empty_seat">игрок садится</div>
                            : (playersOnTable.findIndex(elem => elem && elem.userId === currentUserId) !== -1
                                ? <div className="empty_seat" data-id={'3'}>Пустое место</div>
                                : <div className="empty_seat" data-id={'3'}
                                       onClick={this.handleClickOnEmptySeat}>Занять место</div>))
                    }
                    {/*ЧЕТВЕРТЫЙ ИГРОК*/}
                    {
                        (this.getPlayer({seatId: 4}))
                            ? <PlayerSeat playerData={this.getPlayer({seatId: 4})}
                                          playerInGame={this.getPlayerInGame({seatId: 4})}/>
                            : (reservedSeats.findIndex(elem => elem && +elem.seatId === 4) !== -1
                            ? <div className="empty_seat">игрок садится</div>
                            : (playersOnTable.findIndex(elem => elem && elem.userId === currentUserId) !== -1
                                ? <div className="empty_seat" data-id={'4'}>Пустое место</div>
                                : <div className="empty_seat" data-id={'4'}
                                       onClick={this.handleClickOnEmptySeat}>Занять место</div>))
                    }
                </div>
                <div className="players-mid_section">

                    {/*    ВТОРОЙ ИГРОК*/}
                    {
                        (this.getPlayer({seatId: 2}))
                            ? <PlayerSeat playerData={this.getPlayer({seatId: 2})}
                                          playerInGame={this.getPlayerInGame({seatId: 2})}/>
                            : (reservedSeats.findIndex(elem => elem && +elem.seatId === 2) !== -1
                            ? <div className="empty_seat">игрок садится</div>
                            : (playersOnTable.findIndex(elem => elem && elem.userId === currentUserId) !== -1
                                ? <div className="empty_seat" data-id={'2'}>Пустое место</div>
                                : <div className="empty_seat" data-id={'2'}
                                       onClick={this.handleClickOnEmptySeat}>Занять место</div>))
                    }
                    {/*    Карты на столе*/}
                    {cardsOnTable && cardsOnTable.length > 0 ?
                        <div>
                            <TableCards cards={cardsOnTable}/>
                            <div className={'bank'}>Total pot: <span className={'bank_value'}> {bank}</span></div>
                        </div> :
                        <div>
                            <div className="cards-on-table">
                                <div className="cards-on-table">
                                    <div className="card"/>
                                    <div className="card"/>
                                    <div className="card"/>
                                    <div className="card"/>
                                    <div className="card"/>
                                </div>
                            </div>
                            <div className={'bank'}>Total pot: <span className={'bank_value'}> {bank}</span></div>
                        </div>
                    }
                    {/*    ПЯТЫЙ ИГРОК*/}
                    {
                        (this.getPlayer({seatId: 5}))
                            ? <PlayerSeat playerData={this.getPlayer({seatId: 5})}
                                          playerInGame={this.getPlayerInGame({seatId: 5})}/>
                            : (reservedSeats.findIndex(elem => elem && +elem.seatId === 5) !== -1
                            ? <div className="empty_seat">игрок садится</div>
                            : (playersOnTable.findIndex(elem => elem && elem.userId === currentUserId) !== -1
                                ? <div className="empty_seat" data-id={'5'}>Пустое место</div>
                                : <div className="empty_seat" data-id={'5'}
                                       onClick={this.handleClickOnEmptySeat}>Занять место</div>))
                    }
                </div>
                <div className="players-bottom_section">
                    {/*    ПЕРВЫЙ ИГРОК*/}
                    {
                        (this.getPlayer({seatId: 1}))
                            ? <PlayerSeat playerData={this.getPlayer({seatId: 1})}
                                          playerInGame={this.getPlayerInGame({seatId: 1})}/>
                            : (reservedSeats.findIndex(elem => elem && +elem.seatId === 1) !== -1
                            ? <div className="empty_seat">игрок садится</div>
                            : (playersOnTable.findIndex(elem => elem && elem.userId === currentUserId) !== -1
                                ? <div className="empty_seat" data-id={'1'}>Пустое место</div>
                                : <div className="empty_seat" data-id={'1'}
                                       onClick={this.handleClickOnEmptySeat}>Занять место</div>))
                    }
                    {/*    НУЛЕВОЙ ИГРОК*/}
                    {
                        (this.getPlayer({seatId: 0}))
                            ? <PlayerSeat playerData={this.getPlayer({seatId: 0})}
                                          playerInGame={this.getPlayerInGame({seatId: 0})}/>
                            : (reservedSeats.findIndex(elem => elem && +elem.seatId === 0) !== -1
                            ? <div className="empty_seat">игрок садится</div>
                            : (playersOnTable.findIndex(elem => elem && elem.userId === currentUserId) !== -1
                                ? <div className="empty_seat" data-id={'0'}>Пустое место</div>
                                : <div className="empty_seat" data-id={'0'}
                                       onClick={this.handleClickOnEmptySeat}>Занять место</div>))
                    }
                </div>
            </div>
        );
    }
}

export default PokerTable;
