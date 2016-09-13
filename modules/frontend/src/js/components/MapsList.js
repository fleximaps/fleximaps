import styles from './MapsList.css';

import Wrapper from './Wrapper';
import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router'

const MapList = class MapsList extends React.Component {
    render() {
        return (
            <Wrapper>
                <div className={styles.mapsList}>
                    {this.props.viewer.tilesets.edges.map(function(edge){
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

export default Relay.createContainer(MapList, {
    fragments: {
        viewer: () => Relay.QL`            
            fragment on Viewer{
                tilesets(first: 10){
                    edges{
                        node{
                            id,
                            numCols,
                            numRows,
                            availableTileTypes
                        }
                    }
                }
            }
        `
    }
});