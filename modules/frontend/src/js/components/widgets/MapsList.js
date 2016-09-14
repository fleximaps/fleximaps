import styles from './MapsList.css';

import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router'
import CSSModules from 'react-css-modules';

export default CSSModules(class MapsList extends React.Component {
    render() {
        return (
            <div styleName='mapsList'>
                {this.props.tilesets.edges.map(function(edge){
                    const map = edge.node;

                    return <div styleName='mapsListItem' key={map.id}>
                        Size: {map.numCols}x{map.numRows}<br/>
                        <Link to={`/map/${map.id}`}>View map</Link>
                    </div>
                })}
            </div>
        );
    }
}, styles);