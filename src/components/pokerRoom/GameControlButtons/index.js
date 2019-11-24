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
        minCall:this.props.minCall,
        chooseToRaise: this.props.minCall,

    };
    handleClick = (e) =>{
        this.setState({activeTab:this.state.activeTab = e.target.id});
        let raiseValue = '';
        switch(e.target.id){
            case 'minRaise':
                raiseValue = this.state.minCall;
                break;
            case 'halfRaise':
                raiseValue = this.props.bank / 2;
                break;
            case 'twoThirdsRaise':
                raiseValue = Math.floor(this.props.bank * (2/3));
                break;
            case 'potBet':
                raiseValue = this.props.bank;
                break;
            case 'allIn':
                raiseValue = this.props.stack;
                break;
        }
        this.setState({chooseToRaise:this.state.chooseToRaise = raiseValue});

        console.log(this.state.chooseToRaise)
    };
    handleChangeRaise = (e) =>{
        this.setState({chooseToRaise:this.state.chooseToRaise = e.target.value});
    };
    render() {
        return (
            <div className="controls">

                <div className="fixed_raise_buttons">
                    {tabs.map(tab => <div key = {tab.id} id={tab.id} onClick={this.handleClick} className={`fixed_raise_buttons-style ${this.state.activeTab === tab.id && 'active' }`}>{tab.text}</div>)}
                    {/*<div className={`fixed_raise_buttons-style ${this.state.activeTab === 'minRaise' && 'active' }`}>Min</div>*/}
                    {/*<div className={`fixed_raise_buttons-style ${this.state.activeTab === 'halfRaise' && 'active' }`} >1/2</div>*/}
                    {/*<div className="two-thirds_raise fixed_raise_buttons-style">2/3</div>*/}
                    {/*<div className="three-quarters_raise fixed_raise_buttons-style">3/4</div>*/}
                    {/*<div className="all-in_raise fixed_raise_buttons-style">All-in</div>*/}
                </div>
                <div className="select_bet_wrap">
                    <div className="minus plus-minus">-</div>
                    <div className="variable-choice_block">
                        <input onChange={this.handleChangeRaise} id = 'range' type="range" className="hidden_range_input" min={this.state.minCall} max={this.state.stack} defaultValue="0"/>
                    </div>
                    <div className="plus plus-minus">+</div>
                    <input onChange={this.handleChangeRaise} className="bet_size" type="number" maxLength="6" value={`${this.state.chooseToRaise}`}/>
                </div>
                <div className="decision_control_buttons">
                    <div className="button">Fold</div>
                    <div className="button">Call</div>
                    <div className="button">Raise to</div>
                </div>
            </div>
        );
    }
}

export default GameControlButtons;