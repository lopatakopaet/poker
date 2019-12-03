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
//     activePlayer: false,
//     inHand: true,
//     isLost: false
// }
//]
class MoneyInGame {
    constructor(sb) {
        this.sb = sb;
        this.bb = sb + sb;
        this.minCall = this.bb;
        this.bank = sb + this.bb;
    }

    setMinCall(value) {
        return this.minCall += value;
    }

    setBank(value) {
        return this.bank += value
    }
}

// let bank = new moneyInGame(1,2);
// console.log(bank.bank);
// bank.setBank(10);
// console.log(bank.bank);

// let moneyInGame = {
//     bank:0,
//     sb: 1,
//     bb: 2,
//     minCall: 2,
//
//
// }

let playersOnTable = [];
let playersInGame = [];
const reservedSeats = [];
let deck = [];
// let moneyInGame = '';
///// методы определяющие позицию игрока (диллер,SB,BB)
const setDealer = (players) => {
    players.sort((elem1, elem2) => elem1.seatId - elem2.seatId);
    let lastDealer = 0;

    players.find((elem, id) => {
        if (elem.dealer === true) {
            elem.dealer = false;
            lastDealer = id;
        }
    });
    if (lastDealer >= players.length - 1) {
        players[0].dealer = true;
    } else {
        players[lastDealer + 1].dealer = true;
    }
};

// const getDealer = (players) => {
//     let dealer = '';
//     players.find((elem, id) => {
//         if (elem.dealer === true) {
//             dealer = id;
//         }
//     });
//     return dealer;
// };
const getDealerId = (players) => players.findIndex(elem => elem.dealer === true);

const setSB = (players) => {
    let dealerId = getDealerId(playersInGame);
    players.find((elem) => {
        if (elem.SB === 'SB') {
            elem.SB = false;
        }
    });
    if (dealerId >= players.length - 1) {
        players[0].SB = 'SB';
    } else {
        players[dealerId + 1].SB = 'SB';
    }
};

// const getSB = (players) => players.find(elem => elem.SB === "SB");
const getSBId = (players) => players.findIndex(elem => elem.SB === "SB");

const setBB = (players) => {
    let sbId = getSBId(playersInGame);
    players.find((elem) => {
        if (elem.BB === 'BB') {
            elem.BB = false;
        }
    });
    if (sbId >= players.length - 1) {
        players[0].BB = 'BB';
    } else {
        players[sbId + 1].BB = 'BB';
    }
};

// const getBB = (players) => players.find(elem => elem.BB === 'SB');

const getBBId = (players) => players.findIndex(elem => elem.BB === "BB");

//разбить на 2 функции,учитывающие в  раздаче игрок или нет
const setActivePlayerInGame = (players) => {
    players.sort((elem1, elem2) => elem1.seatId - elem2.seatId);
    let lastActivePlayerID = '';
    players.find((elem, id) => {
        if (elem.activePlayer === true) {
            elem.activePlayer = false;
            lastActivePlayerID = id;
        }
    });
    if (lastActivePlayerID) {
        if (lastActivePlayerID >= players.length - 1) {
            players[0].activePlayer = true;
        } else players[lastActivePlayerID + 1].activePlayer = true;
    } else {
        let bbId = getBBId(players);
        if (bbId >= players.length - 1) players[0].activePlayer = true;
        else
            players[bbId + 1].activePlayer = true;
    }


}

const getActivePlayer = (players) => players.find(elem => elem.activePlayer === true);

const setPlayersPosition = (players) => {
    setDealer(players);
    setSB(players);
    setBB(players);
};

/////////

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

const removeUserFromInGame = ({userId}) => {
    let index = playersInGame.findIndex(elem => elem && elem.userId === userId);
    if (index !== -1) {
        playersInGame.splice(index, 1);
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
    removeUserFromInGame({userId: userId});

};

const addPlayerOnTable = ({seatId, userId, buyIn}) => {
    if (!playersOnTable.find(elem => elem.userId == userId)) {
        let playerInfo = {
            seatId: seatId,
            userId: userId,
            buyIn: buyIn,
            dealer: false,
            BB: false,
            SB: false,
            activePlayer: false,
            inHand: false,
        };
        playersOnTable.push(playerInfo);
    }
};

const infoForViewer = () => {
    playersInGame.forEach(elem => {
        io.to(elem.userId).emit('game-info', {
            type: 'players_info', info: {
                playersInGame: playersInGame.map(player => {
                    return elem.userId === player.userId ? elem : {...player, cards: [52, 52]};
                })
            }
        });
    })
}

const getGlobalPlayersInfo = () => {
    return {
        reservedSeats,
        playersOnTable,
        // playersInGame,
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
        return {...elem, inHand: true, cards: [...getCard(deck), ...getCard(deck)]}
    });
    return playersInGame;
};

const isGameAllow = () => !playersInGame.length && playersOnTable.length >= 3;

// const startGame = (userId) => {
//     if (isGameAllow()) {
//         playersInGame = setHands();
//         playersInGame.forEach(elem => {
//             io.to(elem.userId).emit('game-info', {
//                 type: 'players_info', info: {
//                     playersOnTable: playersInGame.map(player => {
//                         return elem.userId === player.userId ? elem : {...player, cards: [52, 52]};
//                     })
//                 }
//             });
//         })
//
//     }
// };
const getPlayersOnTable = () => playersOnTable;
const getPlayersInGame = () => playersInGame;
const getReservedSeats = () => reservedSeats;
const playerLost = ({userId}) => {
    let index = playersInGame.findIndex(elem => elem.userId == userId);
    playersInGame[index].cards = [];
    playersInGame[index].inHand = false;
};

// const createBank = (sb) =>{
//     moneyInGame = new Bank(sb)
// };
// const getMoneyInGame =()=> moneyInGame;

const newHand = () => {
    if (isGameAllow()) {
        let playersInGame = setHands();
        setPlayersPosition(playersInGame);
        setActivePlayerInGame(playersInGame);
        let moneyInGame = new MoneyInGame(1);

    }
}

const bbDoBet = (players,bb )=>{
    let playerOnBB = players.findIndex(elem => elem.BB === 'BB');
    playersOnTable.sort((elem1, elem2) => elem1.seatId - elem2.seatId);
    players[playerOnBB].buyIn -= bb;
    playersOnTable[playerOnBB].buyIn -= bb;


}
const sbDoBet = (players,sb )=>{
    let playerOnSB = players.findIndex(elem => elem.SB === 'SB');
    players[playerOnSB].buyIn -= sb;
    playersOnTable[playerOnSB].buyIn -= sb;
}


module.exports.sbDoBet = sbDoBet;// на основе playersOnTable создает playersInGame с картами
module.exports.bbDoBet = bbDoBet;// на основе playersOnTable создает playersInGame с картами
module.exports.setHands = setHands;// на основе playersOnTable создает playersInGame с картами
module.exports.setPlayersPosition = setPlayersPosition;//
module.exports.setActivePlayerInGame = setActivePlayerInGame;//
module.exports.removeUserFromInGame = removeUserFromInGame;// удаляет игрока с playersInGame
module.exports.playerLost = playerLost;// обнуляет cards по userId
module.exports.getActivePlayer = getActivePlayer;//
module.exports.getPlayersOnTable = getPlayersOnTable;//
module.exports.getPlayersInGame = getPlayersInGame;//
module.exports.getReservedSeats = getReservedSeats;//
module.exports.isGameAllow = isGameAllow;//
module.exports.newHand = newHand;//
// module.exports.getMoneyInGame = getMoneyInGame;//
// module.exports.createBank = createBank;//

module.exports.addPlayerOnTable = addPlayerOnTable;//
module.exports.reserveSeat = reserveSeat;//

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


