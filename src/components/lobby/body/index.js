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
                <PokerRoom></PokerRoom>
                <div className={'body_side-bar'}>
                    <p>{this.state.date.toLocaleTimeString()}</p>
                </div>
            </div>
        );
    }
}

export default Body;