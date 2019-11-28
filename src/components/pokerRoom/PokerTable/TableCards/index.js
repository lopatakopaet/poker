import React, {Component} from 'react';

class TableCards extends Component {
    render() {
        let {cards} = this.props;
        let flop1 = `img/${cards[0]}.png`;
        let flop2 = `img/${cards[1]}.png`;
        let flop3 = `img/${cards[2]}.png`;
        let turn = `img/${cards[3]}.png`;
        let river = `img/${cards[4]}.png`;
        return (
            <div className="cards-on-table">
                <div className="card">
                    <img src={flop1} alt="flop card"></img>
                </div>
                <div className="card">
                    <img src={flop2} alt="flop card"></img>
                </div>
                <div className="card">
                    <img src={flop3} alt="flop card"></img>
                </div>
                <div className="card">
                    <img src={turn} alt="turn card"></img>
                </div>
                <div className="card">
                    <img src={river} alt="river card"></img>
                </div>
            </div>
        );
    }
}

export default TableCards;