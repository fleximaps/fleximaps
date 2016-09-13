import styles from './MapsList.css';

import Wrapper from './Wrapper';
import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router'

export default class MapsList extends React.Component {
    render() {
        return (
            <Wrapper>
                <div className={styles.mapsList}>
                    {this.props.tilesets.edges.map(function(edge){
                        const map = edge.node;

                        return <div className ={styles.mapsListItem} key={map.id}>
                            Size: {map.numCols}x{map.numRows}<br/>
                            <Link to={`/map/${map.id}`}>View map</Link>
                        </div>
                    })}
                </div>
            </Wrapper>
        );
    }
};