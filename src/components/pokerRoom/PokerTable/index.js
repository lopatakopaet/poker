import React, {Component} from 'react';
import PlayerSeat from './PlayerSeat'
import './index.css';
// import test from './components/pokerRoom/cardsIMG/img/1.png';

// <img className={'table_img'} src={require('../PokerTable3.png')} alt="test"/>
class PokerTable extends Component {
    state = {
        players: [
            {
                id: 111,
                name: 'Vasya',
                bank: 110,
                position: 'SB',
                cards:[1, 1],
                // combo:'',
            },
            // {
            //     id: 222,
            //     name: 'Petya',
            //     bank: 220,
            //     position: 'BB',
            //     cards:[1, 1],
            // },
            {
                id: 333,
                name: 'Pisun',
                bank: 330,
                position: '',
                cards:[1, 1],
            }
        ],
        cardsOnTable: []
    }
    render() {
        let {players} = this.state;
        // console.log(this.state.players);
        return (
            <div className="table_layout">
                <div className="table"></div>
                <div className="players-top_section player_wrap">
                    <PlayerSeat playerData = {this.state.players[1]}/>
                </div>
                <div className="players-mid_section">
                    <PlayerSeat playerData = {this.state.players[1]}/>
                    <div className="cards-on-table">
                        <div className="card">
                            <img src="img/1.png" alt=""></img>
                        </div>
                        <div className="card">
                            <img src="img/1.png" alt=""></img>
                        </div>
                        <div className="card">
                            <img src="img/1.png" alt=""></img>
                        </div>
                        <div className="card">
                            <img src="img/1.png" alt=""></img>
                        </div>
                        <div className="card">
                            <img src="img/1.png" alt=""></img>
                        </div>
                    </div>
                    <PlayerSeat playerData = {this.state.players[1]}/>
                </div>
                <div className="players-bottom_section">
                    <div className="player_block player_5">
                        <div className="player_block-cards">
                            <img src="img/1.png" alt=""></img>
                            <img src="img/1.png" alt=""></img>
                        </div>
                        <div className="player_info">
                            <div className="player_info-name">player_5</div>
                            <div className="player_info-chips">105</div>
                        </div>
                    </div>
                    {/*ПЕРВЫЙ ИГРОК*/}
                    { players[2]? <PlayerSeat playerData = {this.state.players[1]}/> : <div className="empty_seat">Сесть тут</div> }
                    {/*<PlayerSeat playerData = {this.state.players[0]}/>*/}
                </div>



            </div>
        );
    }
}

export default PokerTable;