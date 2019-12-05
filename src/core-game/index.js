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
    // class MoneyInGame {
    //     constructor(sb) {
    //         this.sb = sb;
    //         this.bb = sb + sb;
    //         this.minCall = this.bb;
    //         this.bank = sb + this.bb;
    //     }
    //
    //     setMinCall(value) {
    //         return this.minCall += value;
    //     }
    //
    //     setBank(value) {
    //         return this.bank += value
    //     }
    // }

    let playersOnTable = [];
    let playersInGame = [];
    const reservedSeats = [];
    let deck = [];
    let cardsOnTable = [];
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


    const getBBId = (players) => players.findIndex(elem => elem.BB === "BB");

    const setNextActivePlayerByCurrentSeatId = (players, id) => {
        players.sort((elem1, elem2) => elem1.seatId - elem2.seatId);
        if (typeof id !== "undefined") {
            if (id >= players.length - 1) {
                players[0].activePlayer = true;
            } else players[id + 1].activePlayer = true;
        }
    };

    const setActivePlayerInGame = (players) => {
        let activePlayers = players.filter(player => player.inHand);
        activePlayers.sort((elem1, elem2) => elem1.seatId - elem2.seatId);
        let currentActiveSeatId = '';
        activePlayers.find((elem, id) => {
            if (elem.activePlayer === true) {
                elem.activePlayer = false;
                currentActiveSeatId = id;
            }
        });
        if (currentActiveSeatId) {
            if (currentActiveSeatId >= activePlayers.length - 1) {
                let currentActivePlayerId = activePlayers[0].userId;
                let newActivePlayer = players.find(player => player.userId === currentActivePlayerId);
                newActivePlayer.activePlayer = true;
            } else {
                let currentActivePlayerId = activePlayers[currentActiveSeatId + 1].userId;
                players[currentActiveSeatId + 1].activePlayer = true;
                let newActivePlayer = players.find(player => player.userId === currentActivePlayerId);
                newActivePlayer.activePlayer = true;
            }
        } else {
            let bbId = getBBId(activePlayers);
            let sbId = getSBId(activePlayers);
            let dealerId = getDealerId(activePlayers);
            if (bbId !== -1) {
                setNextActivePlayerByCurrentSeatId(activePlayers, bbId);
                return;
            }
            if (sbId) {
                setNextActivePlayerByCurrentSeatId(players, sbId);
                return;
            }
            if (dealerId) {
                setNextActivePlayerByCurrentSeatId(players, dealerId);
            } else {
                players.sort((elem1, elem2) => elem1.seatId - elem2.seatId);
                players[0].activePlayer = true;
            }
        }
    };

    const getActivePlayer = (players) => players.find(elem => elem.activePlayer === true);

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
        rand += '';
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
                bet: 0
            };
            playersOnTable.push(playerInfo);
        }
    };

    const getGlobalPlayersInfo = () => {
        return {
            reservedSeats,
            playersOnTable,
            cardsOnTable,
        }
    };

    const setHands = () => {
        deck = createDeck();
        playersInGame = playersOnTable.map(elem => {
            return {...elem, inHand: true, cards: [...getCard(deck), ...getCard(deck)]}
        });
        return playersInGame;
    };

    const isGameAllow = () => !playersInGame.length && playersOnTable.length >= 3;

    const getPlayersOnTable = () => playersOnTable;
    const getPlayersInGame = () => playersInGame;
    const getReservedSeats = () => reservedSeats;
    const playerLost = ({userId}) => {
        let index = playersInGame.findIndex(elem => elem.userId == userId);
        playersInGame[index].cards = [];
        playersInGame[index].inHand = false;
    };

    const newHand = () => {
        if (isGameAllow()) {
            let playersInGame = setHands();
            setPlayersPosition(playersInGame);
            setActivePlayerInGame(playersInGame);
            let moneyInGame = new MoneyInGame(1);
        }
    };
    const isPlayerInHand = (players, userId) => {
        let index = players.find(user => user.userId === userId);
        return players[index].inHand
    };
    const reducePlayerChips = (players, userId, value) => {
        let index = players.findIndex(elem => elem.userId === userId);
        players[index].buyIn -= value;
        playersOnTable[index].buyIn -= value;
    };
    const increasePlayerChips = (players, userId, value) => {
        let index = players.findIndex(elem => elem.userId === userId);
        players[index].buyIn += value;
        playersOnTable[index].buyIn += value;
    }
    const setPlayerBet = (players, userId, value) => {
        let index = players.findIndex(elem => elem.userId === userId);
        players[index].bet += +value;
    }

    const bbDoBet = (players, bb) => {
        let playerOnBB = players.findIndex(elem => elem.BB === 'BB');
        playersOnTable.sort((elem1, elem2) => elem1.seatId - elem2.seatId);
        players[playerOnBB].buyIn -= bb;
        playersOnTable[playerOnBB].buyIn -= bb;
        players[playerOnBB].bet = bb;
    };
    const sbDoBet = (players, sb) => {
        let playerOnSB = players.findIndex(elem => elem.SB === 'SB');
        players[playerOnSB].buyIn -= sb;
        playersOnTable[playerOnSB].buyIn -= sb;
        players[playerOnSB].bet = sb;
    };
    const getPlayerBet = (players, userId) => {
        let index = players.find(elem => elem.userId === userId);
        return players[index].bet;
    }


    const setFlopCards = () => {
        return cardsOnTable = [...getCard(deck), ...getCard(deck), ...getCard(deck)];
    };
    const setTernCards = () => {
        return cardsOnTable = [...cardsOnTable, ...getCard(deck)];
    };
    const setRiverCards = () => {
        return cardsOnTable = [...cardsOnTable, ...getCard(deck)];
    };

    const isContinueRound = (players) => {
        let playersInGame = players.filter(elem => elem.inHand);
        let bets = playersInGame.map(elem => elem.bet);
        bets = Array.from(new Set(bets));
        return bets.length === 1 ? false : bets;
    };


    module.exports.sbDoBet = sbDoBet;// на основе playersOnTable создает playersInGame с картами
    module.exports.bbDoBet = bbDoBet;// на основе playersOnTable создает playersInGame с картами
    module.exports.reducePlayerChips = reducePlayerChips;// на основе playersOnTable создает playersInGame с картами
    module.exports.increasePlayerChips = increasePlayerChips;// на основе playersOnTable создает playersInGame с картами
    module.exports.setHands = setHands;// на основе playersOnTable создает playersInGame с картами
    module.exports.setPlayersPosition = setPlayersPosition;//
    module.exports.setActivePlayerInGame = setActivePlayerInGame;//
    module.exports.removeUserFromInGame = removeUserFromInGame;// удаляет игрока с playersInGame
    module.exports.playerLost = playerLost;// обнуляет cards по userId
    module.exports.getActivePlayer = getActivePlayer;//
    module.exports.getPlayersOnTable = getPlayersOnTable;//
    module.exports.getPlayersInGame = getPlayersInGame;//
    module.exports.getReservedSeats = getReservedSeats;//
    module.exports.getPlayerBet = getPlayerBet;//
    module.exports.isGameAllow = isGameAllow;//
    module.exports.newHand = newHand;//
    module.exports.setFlopCards = setFlopCards;//
    module.exports.setTernCards = setTernCards;//
    module.exports.setRiverCards = setRiverCards;//
    module.exports.isContinueRound = isContinueRound;//
    module.exports.setPlayerBet = setPlayerBet;//
    module.exports.addPlayerOnTable = addPlayerOnTable;//
    module.exports.reserveSeat = reserveSeat;//
    module.exports.getGlobalPlayersInfo = getGlobalPlayersInfo;
    module.exports.disconnectUser = disconnectUser;



