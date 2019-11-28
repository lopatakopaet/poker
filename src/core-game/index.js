const B_BLIND = 2;
const S_BLIND = 1;

const TABLE_ID = 101010;

let dillerId = 111;
let currentPlayerId = 111;

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
