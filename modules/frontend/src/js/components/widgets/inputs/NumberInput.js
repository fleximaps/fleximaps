import React from 'react';
import CSSModules from 'react-css-modules';

import BaseInput from './BaseInput';
import IdGenerator from '../../utils/IdGenerator';

import styles from './NumberInput.css';

const ID_PREFIX = 'NumberInput';

class NumberInput extends React.Component{
    componentWillMount() {
        this._id = ID_PREFIX + IdGenerator.generate();
    }
    render() {
        const onChangeListener = (this.props.onChange === undefined)?undefined:this._onChange.bind(this);
        const inputId = this._id;
        return <BaseInput labelId={inputId} label={this.props.label}>
            <input styleName="inputElement" onChange={onChangeListener} type="number" id={inputId} value={this.props.value}/>
        </BaseInput>
    }
    _onChange(event){
        const newValue = parseInt(event.target.value);
        this.props.onChange(newValue);
    }
}

NumberInput.propTypes = {
    label: React.PropTypes.string,
    value: React.PropTypes.any.isRequired,
    onChange: React.PropTypes.func
};

export default CSSModules(NumberInput, styles);