import React from 'react';
import Relay from 'react-relay';
import { withRouter } from 'react-router'

import CreateMapOverlay from '../widgets/CreateMapOverlay';

import CreateTilesetMutation from '../../mutations/CreateTilesetMutation';

class CreateMapContainer extends React.Component {
    render() {
        return (
            <CreateMapOverlay onSubmit={this._onSubmit.bind(this)} onClose={this._onClose.bind(this)}/>
        );
    }
    _onClose(){
        const router = this.props.router;
        router.push('/maps');
    }
    _onSubmit(state){
        const router = this.props.router;

        this.props.relay.commitUpdate(
            new CreateTilesetMutation(state),
            {
                onSuccess: function(response){
                    router.push('/map/' + response.createTileset.tileset.id);
                }
            }
        );
    }
};

const CreateMapContainerRelay = Relay.createContainer(CreateMapContainer, {
    fragments: {
        viewer: () => Relay.QL`
            fragment on Viewer{
                id
            }
        `,
    }
});


export default withRouter(CreateMapContainerRelay);