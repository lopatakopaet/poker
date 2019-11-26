const B_BLIND = 2;
const S_BLIND = 1;

const TABLE_ID = 101010;

let dillerId = 111;
let currentPlayerId = 111;

const players = [
    {
        id: 111,
        name: 'Vasya',
        bank: 110,
        // cards:[15, 12],
        // combo:'',
    },
    {
        id: 222,
        name: 'Petya',
        bank: 220,
    },
    {
        id: 333,
        name: 'Pisun',
        bank: 330,
    }
];

export const Handlers = {

};

export const start = () => {
    Handlers.setPlayersInfo(players);

    // generate desk

    Handlers.setCards()
};


