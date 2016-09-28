import styles from './Application.css';

import Header from '../widgets/Header';

import CSSModules from 'react-css-modules';
import React from 'react';

export default CSSModules(class Application extends React.Component {
    render() {
        return (
            <div styleName='application'>
                <Header/>
                {this.props.children}
            </div>
        );
    }
}, styles);