import React from 'react';
import Relay from 'react-relay';
import { withRouter } from 'react-router'

import ImportMapOverlay from '../widgets/ImportMapOverlay';

import ImportTilesetMutation from '../../mutations/ImportTilesetMutation';

class ImportMapContainer extends React.Component {
    render() {
        return (
            <ImportMapOverlay onSubmit={this._onSubmit.bind(this)} onClose={this._onClose.bind(this)}/>
        );
    }
    _onClose(){
        const router = this.props.router;
        router.push('/maps');
    }
    _onSubmit(state){
        const router = this.props.router;

        this.props.relay.commitUpdate(
            new ImportTilesetMutation(state),
            {
                onSuccess: function(response){
                    router.push('/map/' + response.importTileset.tileset.id);
                }
            }
        );
    }
};

const ImportMapContainerRelay = Relay.createContainer(ImportMapContainer, {
    fragments: {
        viewer: () => Relay.QL`
            fragment on Viewer{
                id
            }
        `,
    }
});


export default withRouter(ImportMapContainerRelay);