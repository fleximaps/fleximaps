import React from 'react';

import Overlay from './Overlay';

import NumberInput from './inputs/NumberInput';
import Button from './inputs/Button';

class CreateMapOverlay extends React.Component {
    constructor(){
        super();

        this.state= {
            numCols: 10,
            numRows: 10
        };
    }
    render() {
        const props = this.props;
        return (
            <Overlay title='Create a new map' onClose={this.props.onClose}>
                <form>
                    <NumberInput onChange={this._onNumColsChange.bind(this)} label="Number of columns" value={this.state.numCols}/>
                    <NumberInput onChange={this._onNumRowsChange.bind(this)} label="Number of rows" value={this.state.numRows}/>
                    <Button onClick={this._onSubmit.bind(this)}>Create</Button>
                </form>
            </Overlay>
        );
    }
    _onNumColsChange(value){
        this.setState({
            numCols: value
        });
    }
    _onNumRowsChange(value){
        this.setState({
            numRows: value
        });
    }
    _onSubmit(){
        this.props.onSubmit(this.state);
    }
};

CreateMapOverlay.propTypes = {
    onSubmit: React.PropTypes.func.isRequired
};

export default CreateMapOverlay;