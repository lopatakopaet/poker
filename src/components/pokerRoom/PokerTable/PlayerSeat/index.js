import React from 'react';

// {
//     id: 111,
//         name: 'Vasya',
//     bank: 110,
//     // cards:[15, 12],
//     // combo:'',
// },
//
// export const PlayerSeat = ({playerData}) => {
//     let {name, bank, position, cards} = playerData || {};
//     let cardImg1 = cards && `img/${cards[0]}.png` ;
//     let cardImg2 = cards && `img/${cards[1]}.png`;
//
//     return playerData ? (
//         <div className="player_block player_1">
//             <div className="player_block-cards">
//                 <img src={cardImg1} alt="card"></img>
//                 <img src={cardImg2} alt="card"></img>
//             </div>
//             <div className="player_info">
//                 <div className="player_info-name">{name}</div>
//                 <div className="player_info-chips">{bank}</div>
//                 {position && <div className="player_info_game-position player_info_game-position--mp">{position}</div>}
//             </div>
//         </div>
//     ) : null;
// };




    export const PlayerSeat = ({playerData, playerInGame}) => {
    let {userId, buyIn} = playerData;
    let {cards,BB,SB} = playerInGame  || {};
    // let {BB,SB} = playerInGame  || {};
    let cardImg1 = cards && `img/${cards[0]}.png` ;
    let cardImg2 = cards && `img/${cards[1]}.png`;

    return (
        <div className="player_block player_1">
            {cards && cards.length === 2  ?
                <div className="player_block-cards">
                    <img src={cardImg1} alt="card"/>
                    <img src={cardImg2} alt="card"/>
                </div> : <div className="test player_block-cards"></div>}
            <div className="player_info">
                <div className="player_info-name">{userId}</div>
                <div className="player_info-chips">{buyIn}</div>
                { (BB || SB) &&
                <div className="player_info_game-position player_info_game-position--mp">{BB || SB}</div>}
            </div>
        </div>
    )

};