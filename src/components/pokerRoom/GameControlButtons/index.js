import React, {Component} from 'react';
import './index.css'
import {switchCase} from "@babel/types";

const tabs = [
    {id: 'minRaise', text: 'Min'},
    {id: 'halfRaise', text: '1/2'},
    {id: 'twoThirdsRaise', text: '2/3'},
    {id: 'potBet', text: 'Pot'},
    {id: 'allIn', text: 'All-in'},
];

class GameControlButtons extends Component {
    state = {
        activeTab: 'minRaise',
        bank: this.props.bank,
        stack: this.props.stack,
        chooseToRaise: this.props.minRaise,
    };
    changeFixRaise = (id) => {
        this.setState({activeTab: id});
        let raiseValue = '';
        switch (id) {
            case 'minRaise':
                raiseValue = this.props.minRaise;
                break;
            case 'halfRaise':
                raiseValue = this.props.bank / 2;
                break;
            case 'twoThirdsRaise':
                raiseValue = Math.floor(this.props.bank * (2 / 3));
                break;
            case 'potBet':
                raiseValue = this.props.bank;
                break;
            case 'allIn':
                raiseValue = this.props.stack;
                break;
        }
        this.setState({chooseToRaise: raiseValue});
    };
    handleChangeRaise = (e) => {
        this.setState({chooseToRaise: e.target.value});
    };

    render() {
        return (
            <div className={"controls"}>

                <div className="fixed_raise_buttons">
                    {tabs.map(tab => <div key={tab.id} onClick={() => {
                        this.changeFixRaise(tab.id)
                    }} className={`fixed_raise_buttons-style ${this.state.activeTab === tab.id && 'active'}`}>
                        {tab.text}
                    </div>)}
                </div>
                <div className="select_bet_wrap">
                    <div className="minus plus-minus">-</div>
                    <div className="variable-choice_block">
                        <input onChange={this.handleChangeRaise} id='range' type="range" className="hidden_range_input"
                               min={this.props.minCall} max={this.state.stack} defaultValue="0"/>
                    </div>
                    <div className="plus plus-minus">+</div>
                    <input onChange={this.handleChangeRaise} className="bet_size" type="number" maxLength={6}
                           value={`${this.state.chooseToRaise}`}/>
                </div>
                <div className="decision_control_buttons">
                    <div className="button" onClick={this.props.onFold}>Fold</div>
                    <div className="button" onClick={this.props.onCall}>Call</div>
                    <div className="button" onClick={()=>this.props.onRaise(this.state.chooseToRaise)}>Raise to</div>
                </div>
            </div>
        );
    }
}

export default GameControlButtons;