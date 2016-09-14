import styles from './Panel.css';

import React from 'react';

export default class Panel extends React.Component {
    render() {
        return (
            <div className={styles.panel}>{this.props.children}</div>
        );
    }
}