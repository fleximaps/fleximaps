import React from 'react';

import Overlay from './Overlay';

import NumberInput from './inputs/NumberInput';
import CheckboxInput from './inputs/CheckboxInput';
import Button from './inputs/Button';

class CreateMapOverlay extends React.Component {
    constructor(){
        super();

        this.state= {
            numCols: 10,
            numRows: 10,
            isHexagonal: true
        };
    }
    render() {
        const props = this.props;
        return (
            <Overlay title='Create a new map' onClose={this.props.onClose}>
                <form>
                    <NumberInput onChange={this._onNumColsChange.bind(this)} label="Number of columns" value={this.state.numCols}/>
                    <NumberInput onChange={this._onNumRowsChange.bind(this)} label="Number of rows" value={this.state.numRows}/>
                    <CheckboxInput onChange={this._onIsHexagonalChange.bind(this)} label="Is it an hexagonal map?" value={this.state.isHexagonal}/>
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
    _onIsHexagonalChange(value){
        this.setState({
            isHexagonal: value
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