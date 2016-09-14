import styles from './Panel.css';

import React from 'react';
import CSSModules from 'react-css-modules';

export default CSSModules(class Panel extends React.Component {
    render() {
        return (
            <div styleName='panel'>{this.props.children}</div>
        );
    }
}, styles);