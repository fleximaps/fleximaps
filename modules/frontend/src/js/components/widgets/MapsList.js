import styles from './MapsList.css';

import React from 'react';
import { Link } from 'react-router'
import CSSModules from 'react-css-modules';

export default CSSModules(class MapsList extends React.Component {
    render() {
        return (
            <div styleName='mapsList'>
                {this.props.tilesets.map(function(map){
                    const styleName = 'mapsListItem ' + (map.isHexagonal?'hexagonal':'quadratic');
                    return <div styleName={styleName} key={map.id}>
                        Size: {map.numCols}x{map.numRows}<br/>
                        <Link to={`/map/${map.id}`}>View map</Link>
                    </div>
                })}
            </div>
        );
    }
}, styles, {allowMultiple: true});