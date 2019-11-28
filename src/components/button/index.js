import React, {Component} from 'react';
import './index.css'

class Button extends Component {
    render() {
        return (
            <div className={'button'} onClick={this.props.onClick}>
                <span >{this.props.name}</span>
            </div>
        );
    }
}

export default Button;

// this.props.params ? this.props.params : ''