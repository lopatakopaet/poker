import React from 'react';
import './index.css'

    export const PlayerSeat = ({playerData, playerInGame}) => {
    let {userId, buyIn} = playerData;
    let {cards,BB,SB,activePlayer} = playerInGame  || {};
    let cardImg1 = cards && `img/${cards[0]}.png` ;
    let cardImg2 = cards && `img/${cards[1]}.png`;

    return (
        <div className={`player_block player_1 `}>
            {cards && cards.length === 2  ?
                <div className="player_block-cards">
                    <img src={cardImg1} alt="card"/>
                    <img src={cardImg2} alt="card"/>
                </div> : <div className="player_block-cards"></div>}
            <div className={`player_info ${activePlayer && 'active_player'}`}>
                <div className="player_info-name">{userId}</div>
                <div className="player_info-chips">{buyIn}</div>
                { (BB || SB) &&
                <div className="player_info_game-position player_info_game-position--mp">{BB || SB}</div>}
            </div>
        </div>
    )

};