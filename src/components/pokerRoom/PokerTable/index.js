import React, {Component} from 'react';
import './index.css';
// import test from './components/pokerRoom/cardsIMG/img/1.png';

// <img className={'table_img'} src={require('../PokerTable3.png')} alt="test"/>
class PokerTable extends Component {
    render() {
        return (
            <div className="table_layout">
                <div className="table"></div>
                <div className="players-top_section player_wrap">
                    <div className="player_block player_1">
                        <div className="player_block-cards">
                            <img src="img/1.png" alt=""></img>
                            <img src="img/1.png" alt=""></img>
                        </div>
                        <div className="player_info">
                            <div className="player_info-name">player_1</div>
                            <div className="player_info-chips">101</div>
                            <div className="player_info_game-position player_info_game-position--mp">MP</div>
                        </div>
                    </div>
                    <div className="player_block player_2">
                        <div className="player_block-cards">
                            <img src="img/1.png" alt=""></img>
                            <img src="img/1.png" alt=""></img>
                        </div>
                        <div className="player_info">
                            <div className="player_info-name">player_2</div>
                            <div className="player_info-chips">102</div>
                        </div>
                    </div>
                </div>
                <div className="players-mid_section">
                    <div className="player_block player_3">
                        <div className="player_block-cards">
                            <img src="img/1.png" alt=""></img>
                            <img src="img/1.png" alt=""></img>
                        </div>
                        <div className="player_info">
                            <div className="player_info-name">player_3</div>
                            <div className="player_info-chips">103</div>
                        </div>
                    </div>
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
                    <div className="player_block player_4">player_4</div>
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
                    <div className="player_block player_6">player_6</div>
                </div>
            </div>
        );
    }
}

export default PokerTable;