const B_BLIND = 2;
const S_BLIND = 1;
const TABLE_ID = 101010;
let dillerId = 111;
let currentPlayerId = 111;

// playersOnTable[
//    {
//      buyIn:12,
//      seatId:23423,
//      userId:3,
//  }
// ]


// playersInGame[
// {
//     buyIn:12,
//     seatId:23423,
//     userId:3,
//     cards:[23,1],
//     dealer:true,
//     BB:false,
//     SB:false,

// }
//]

const playersOnTable = [];
let playersInGame = [];
const reservedSeats = [];
let deck = [];


const setDealer = (arr) => {
    arr.sort((elem1, elem2) => elem1.seatId - elem2.seatId);
    let lastDealer = 0;

    arr.find((elem, id) => {
        if (elem.dealer === true) {
            elem.dealer = false;
            lastDealer = id;
        }
    });
    if (lastDealer >= arr.length - 1) {
        arr[0].dealer = true;
    } else {
        arr[lastDealer + 1].dealer = true;
    }
};

const getDealer = (players) => {
    let dealer = '';
    players.find((elem, id) => {
        if (elem.dealer === true) {
            dealer = id;
        }
    });
    return dealer;
};

const setSB = (players) => {
    let dealer = getDealer(playersInGame);
    players.find((elem) => {
        if (elem.SB === true) {
            elem.SB = false;
        }
    });
    if (dealer >= players.length - 1) {
        players[0].SB = true;
    } else {
        players[dealer + 1].SB = true;
    }
};

const getSB = (players) => {
    let sb = '';
    players.find((elem, id) => {
        if (elem.SB === true) {
            sb = id;
        }
    });
    return sb;
};

const setBB = (players) => {
    let sb = getSB(playersInGame);
    players.find((elem) => {
        if (elem.BB === true) {
            elem.BB = false;
        }
    });
    if (sb >= players.length - 1) {
        players[0].BB = true;
    } else {
        players[sb + 1].BB = true;
    }
};

const getBB = (players) => {
    let bb = '';
    players.find((elem, id) => {
        if (elem.BB === true) {
            bb = id;
        }
    });
    return bb;
};

const setPlayersPosition = (players) => {
    setDealer(players);
    setSB(players);
    setBB(players);
};

function createDeck() {
    let arr = [];
    for (let i = 0; i <= 51; i++) {
        arr.push(i);
    }
    return arr;
}

function getCard(deck) {
    let min = 0;
    let max = deck.length - 1;
    let rand = Math.floor(Math.random() * (max + 1 - min)) + min;
    return deck.splice(rand, 1);

}

// let deck = createDeck();

const removeUserFromTable = ({userId}) => {
    let index = playersOnTable.findIndex((elem) => elem && elem.userId === userId);
    if (index !== -1) {
        playersOnTable.splice(index, 1);
    }
};

const removeUserFromSeat = ({userId}) => {
    let seatIndex = reservedSeats.findIndex(elem => elem && elem.userId === userId);
    if (seatIndex !== -1) {
        reservedSeats.splice(seatIndex, 1);
    }
};

const reserveSeat = ({seatId, userId}) => {
    if (!reservedSeats.find(elem => elem.seatId == seatId)) {
        reservedSeats.push({seatId, userId});
    }
    return reservedSeats;
};

const disconnectUser = ({userId}) => {
    removeUserFromTable({userId: userId});
    removeUserFromSeat({userId: userId});
};

const addPlayerOnTable = ({seatId, userId, buyIn}) => {
    if (!playersOnTable.find(elem => elem.userId == userId)) {
        let playerInfo = {
            seatId: seatId,
            userId: userId,
            buyIn: buyIn,
        };
        playersOnTable.push(playerInfo);
    }
};

const getGlobalPlayersInfo = (userId) => {
    // if (id) {
    //     return playersInGame
    // }
    return {
        reservedSeats,
        // playersOnTable: playersOnTable.map()
    }
};

// if (coreGame.isGameAllow()){
//     let playersInGame = coreGame.setHands();
//     playersInGame.forEach(elem => {
//         io.to(elem.userId).emit('game-info', {type: 'players_info', info: {
//                 playersOnTable: playersInGame.map(player => {
//                     return elem.userId === player.userId ? elem : {...player, cards: [52, 52]};
//                 })
//         }});
//     })
// }


const setHands = () => {
    deck = createDeck();
    playersInGame = playersOnTable.map(elem => {
        return {...elem, cards: [...getCard(deck), ...getCard(deck)]}
    });
    return playersInGame;

}
const isGameAllow = () => !playersInGame.length && playersOnTable.length >= 2;

const startGame = (userId) => {
    if (isGameAllow()) {
        playersInGame = setHands();
        playersInGame.forEach(elem => {
            io.to(elem.userId).emit('game-info', {
                type: 'players_info', info: {
                    playersOnTable: playersInGame.map(player => {
                        return elem.userId === player.userId ? elem : {...player, cards: [52, 52]};
                    })
                }
            });
        })

    }
}


module.exports.setHands = setHands;
module.exports.isGameAllow = isGameAllow;

module.exports.addPlayerOnTable = addPlayerOnTable;
module.exports.reserveSeat = reserveSeat;

module.exports.getGlobalPlayersInfo = getGlobalPlayersInfo;

module.exports.disconnectUser = disconnectUser;

module.exports.players = [
    // {
    //     id: 111,
    //     name: 'Vasya',
    //     bank: 110,
    //     // cards:[15, 12],
    //     // combo:'',
    // },
    // {
    //     id: 222,
    //     name: 'Petya',
    //     bank: 220,
    // },
    // {
    //     id: 333,
    //     name: 'Pisun',
    //     bank: 330,
    // }
];

module.exports.start = (player) => {
    // this.addPlayer =  () => {
    //     players.push(player);
    //     return players;
    // }
    players.push(player);
    return players
    // return 'test'
}


// function createDeck(){
//     let arr = [];
//     for( let i = 0; i <= 51; i++){
//         arr.push(i);
//     }
//     return arr;
// }
// let deck = createDeck();
//
// function getCard (deck){
//     let min = 0;
//     let max = deck.length -1;
//     let rand = Math.floor(Math.random() * (max +1 - min)) + min;
//     return deck.splice(rand,1);
//
// }
