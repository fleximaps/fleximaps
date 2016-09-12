import styles from './Application.css';

import React from 'react';

export default class Application extends React.Component {
    render() {
        return (
            <div className={styles.application} ref="mapRef">{this.props.children}</div>
        );
    }
}