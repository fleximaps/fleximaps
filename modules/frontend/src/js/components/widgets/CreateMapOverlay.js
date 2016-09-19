import React from 'react';

import Overlay from './Overlay';

import NumberInput from './inputs/NumberInput';

export default class CreateMapOverlay extends React.Component {
    render() {
        const props = this.props;
        return (
            <Overlay title='Create a new map' onClose={this.props.onClose}>
                <form>
                    <NumberInput label="Number of columns"/>
                    <NumberInput label="Number of rows"/>
                </form>
            </Overlay>
        );
    }
};