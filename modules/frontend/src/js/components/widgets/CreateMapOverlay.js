import React from 'react';

import Overlay from './Overlay';

export default class CreateMapOverlay extends React.Component {
    render() {
        const props = this.props;
        return (
            <Overlay title='Create a new map' onClose={this.props.onClose}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ornare tellus eros, tempor luctus neque tempus pulvinar. Morbi magna lacus, laoreet eget ultricies at, efficitur euismod lectus. Morbi tincidunt sem ante, quis congue libero dictum non. Phasellus a viverra lectus. Sed placerat tempor hendrerit. Proin varius vestibulum ante a tristique.
            </Overlay>
        );
    }
};