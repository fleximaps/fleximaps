import styles from './Wrapper.css';

import React from 'react';
import CSSModules from 'react-css-modules';

export default CSSModules(class Wrapper extends React.Component {
    render() {
        return (
            <div styleName='wrapper'>{this.props.children}</div>
        );
    }
}, styles);