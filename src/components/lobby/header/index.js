import React, {Component} from 'react';
import './index.css'
///////test button////
import Button from "../../button";


class Header extends Component {
    render() {
        return (
            <div>
                <div className={'headerWrap'}>
                    <Button></Button>
                </div>
                <Button></Button>

            </div>
        );
    }
}

export default Header;