import MapsList from '../widgets/MapsList';
import Panel from '../widgets/Panel';
import Wrapper from '../widgets/Wrapper';
import CreateTilesetButton from '../widgets/CreateTilesetButton';

import styles from './MapsListPage.css';

import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router'

class MapsListPage extends React.Component {
    render() {
        return (
            <Wrapper>
                <Panel>
                    <MapsList tilesets={this.props.viewer.tilesets}/>
                </Panel>
                <Panel className={styles.footerPanel}>
                    <CreateTilesetButton/>
                </Panel>
            </Wrapper>
        );
    }
};

export default Relay.createContainer(MapsListPage, {
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