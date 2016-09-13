import styles from './Wrapper.css';

import React from 'react';

export default class Wrapper extends React.Component {
    render() {
        return (
            <div className={styles.wrapper}>{this.props.children}</div>
        );
    }
}