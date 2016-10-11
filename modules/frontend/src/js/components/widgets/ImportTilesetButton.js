import styles from './ImportTilesetButton.css';

import CSSModules from 'react-css-modules';
import { Link } from 'react-router'
import React from 'react';

export default CSSModules(class ImportTilesetButton extends React.Component {
    render() {
        return (
            <Link styleName='button' to={`/maps/import`}>Import map</Link>
        );
    }
}, styles);