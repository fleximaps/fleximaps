import MapsList from '../widgets/MapsList';
import Wrapper from '../widgets/Wrapper';
import React from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router'

const MapsListPage = class MapsListPage extends React.Component {
    render() {
        return (
            <Wrapper>
                <MapsList tilesets={this.props.viewer.tilesets}/>
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