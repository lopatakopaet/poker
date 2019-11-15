import React, {Component} from 'react';
import './index.css'


class PokerTable extends Component {
    render() {
        return (
            <div className={'table_wrap'}>
                {/*<img src={'../PokerTable3.png'} alt=""/>*/}
                <div className={'table_img_wrap'}>
                    <img className={'table_img'} src={require('../PokerTable3.png')} alt=""/>
                </div>
            </div>
        );
    }
}

export default PokerTable;