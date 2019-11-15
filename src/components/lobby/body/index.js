import React, {Component} from 'react';
import './index.css'
import PokerRoom from "../../pokerRoom";

class Body extends Component {
    constructor(props){
        super(props);
        this.state = {
            date: new Date()
        }
    }
    componentDidMount() {
        this.timerId = setInterval(()=>{this.tick()},1000)
    }
    tick(){
        this.setState({
            date:new Date()
        })
    }
    render() {
        return (
            <div className={'body_wrap'}>
                {/*<div className={'body_content'}></div>*/}
                {/*<div className={'body_side-bar'}>*/}
                {/*    <p>{this.state.date.toLocaleTimeString()}</p>*/}
                {/*</div>*/}
                <PokerRoom></PokerRoom>
            </div>
        );
    }
}

export default Body;