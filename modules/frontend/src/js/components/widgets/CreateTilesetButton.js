import styles from './CreateTilesetButton.css';

import CSSModules from 'react-css-modules';
import { Link } from 'react-router'
import React from 'react';

export default CSSModules(class CreateTilesetButton extends React.Component {
    render() {
        return (
            <Link styleName='button' to={`/create`}>Create tileset</Link>
        );
    }
}, styles);