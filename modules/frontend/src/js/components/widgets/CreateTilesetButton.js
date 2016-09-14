import styles from './CreateTilesetButton.css';

import { Link } from 'react-router'
import React from 'react';

export default class CreateTilesetButton extends React.Component {
    render() {
        return (
            <Link className={styles.button} to={`/create`}>Create tileset</Link>
        );
    }
}