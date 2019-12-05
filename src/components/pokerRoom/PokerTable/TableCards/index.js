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
                    {typeof cards[0] !== 'undefined' && <img src={flop1} alt="flop card"/>}
                </div>
                <div className="card">
                    {typeof cards[1] !== 'undefined' && <img src={flop2} alt="flop card"/>}
                </div>
                <div className="card">
                    {typeof cards[2] !== 'undefined' && <img src={flop3} alt="flop card"/>}
                </div>
                <div className="card">
                    {typeof cards[3] !== 'undefined' && <img src={turn} alt="turn card"/>}
                </div>
                <div className="card">
                    {typeof cards[4] !== 'undefined' && <img src={river} alt="river card"/>}
                </div>
            </div>
        );
    }
}

export default TableCards;