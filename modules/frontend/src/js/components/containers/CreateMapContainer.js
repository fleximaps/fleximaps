import React from 'react';
import { withRouter } from 'react-router'

import CreateMapOverlay from '../widgets/CreateMapOverlay';

export default withRouter(class CreateMapContainer extends React.Component {
    render() {
        const router = this.props.router;
        return (
            <CreateMapOverlay onClose={function(){
                router.push('/maps');
            }}/>
        );
    }
});