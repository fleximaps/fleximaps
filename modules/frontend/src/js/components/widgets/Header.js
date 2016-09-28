import styles from './Header.css';
import Wrapper from './Wrapper';

import CSSModules from 'react-css-modules';
import { Link } from 'react-router'
import React from 'react';

export default CSSModules(class Header extends React.Component {
    render() {
        return (
            <header styleName='header'>
                <Wrapper>
                    <Link styleName='logoLink' to={'/'}>
                        <img src="/logo.png" width="45" height="39" alt="FlexiMaps"/>
                    </Link>
                </Wrapper>
            </header>
        );
    }
}, styles);