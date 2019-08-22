import React, { Component } from 'react';
import './header.less';

class Header extends Component {
    render() {
        return (
            <header className="flights-search-header">
                <div className="flights-search-header-title">
                    Flight Search Engine
                </div>
            </header>
        )
    }
}

export { Header };
