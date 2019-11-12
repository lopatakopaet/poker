import React, {Component} from 'react';
import './index.css'
///////test button////
import Button from "../../button";


class Header extends Component {
    render() {
        return (
                <div className={'header_wrap'}>
                    <div className={'logo_wrap'}></div>
                    <div className={'header-buttons_wrap'}>
                        <Button></Button>
                        <Button></Button>
                        <Button></Button>
                    </div>
                </div>
        );
    }
}

export default Header;