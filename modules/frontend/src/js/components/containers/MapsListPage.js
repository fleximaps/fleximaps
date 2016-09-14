import MapsList from '../widgets/MapsList';
import Panel from '../widgets/Panel';
import Wrapper from '../widgets/Wrapper';
import CreateTilesetButton from '../widgets/CreateTilesetButton';

import footerPanelStyles from './FooterPanel.css';

import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router'

class MapsListPage extends React.Component {
    render() {
        return (
            <div>
                <Wrapper>
                    <Panel>
                        <MapsList tilesets={this.props.viewer.tilesets}/>
                    </Panel>
                    <Panel styles={footerPanelStyles}>
                        <CreateTilesetButton/>
                    </Panel>
                </Wrapper>
                {this.props.children}
            </div>
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