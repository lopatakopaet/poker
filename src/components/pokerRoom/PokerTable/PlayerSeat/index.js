import React, {Component} from 'react';

// {
//     id: 111,
//         name: 'Vasya',
//     bank: 110,
//     // cards:[15, 12],
//     // combo:'',
// },

class PlayerSeat extends Component {
    state = {
        playerData:this.props.playerData,
    };

    render() {
        let {name,bank,position,cards} = this.state.playerData;
        let cardImg1 = `img/${cards[0]}.png`;
        let cardImg2 = `img/${cards[1]}.png`;
        return (
            <div className="player_block player_1">
                <div className="player_block-cards">
                    <img src={cardImg1} alt="card"></img>
                    <img src={cardImg2} alt="card"></img>
                    {/*<img src="img/1.png" alt=""></img>*/}
                </div>
                <div className="player_info">
                    <div className="player_info-name">{name}</div>
                    <div className="player_info-chips">{bank}</div>
                    {position && <div className="player_info_game-position player_info_game-position--mp">{position}</div>}

                </div>
            </div>
        );
    }
}

export default PlayerSeat;