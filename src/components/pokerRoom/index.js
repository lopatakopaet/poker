import React, {Component} from 'react';
import PokerTable from "./pokerTable";

class PokerRoom extends Component {
    render() {
        return (
            <div>
                <PokerTable></PokerTable>
            </div>
        );
    }
}

export default PokerRoom;