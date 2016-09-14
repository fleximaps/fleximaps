import styles from './Application.css';

import CSSModules from 'react-css-modules';
import React from 'react';

export default CSSModules(class Application extends React.Component {
    render() {
        return (
            <div styleName='application'>{this.props.children}</div>
        );
    }
}, styles);