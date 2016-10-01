import React from 'react';
import CSSModules from 'react-css-modules';

import BaseInput from './BaseInput';
import IdGenerator from '../../utils/IdGenerator';

import styles from './CheckboxInput.css';

const ID_PREFIX = 'CheckboxInput';

class CheckboxInput extends React.Component{
    componentWillMount() {
        this._id = ID_PREFIX + IdGenerator.generate();
    }
    render() {
        const onChangeListener = (this.props.onChange === undefined)?undefined:this._onChange.bind(this);
        const inputId = this._id;
        return <BaseInput labelId={inputId} label={this.props.label} reverse={true}>
            <input type="checkbox" styleName="inputElement" onChange={onChangeListener} id={inputId} checked={this.props.value}/>
        </BaseInput>
    }
    _onChange(event){
        const newValue = event.target.checked;
        this.props.onChange(newValue);
    }
}

CheckboxInput.propTypes = {
    label: React.PropTypes.string,
    value: React.PropTypes.bool.isRequired,
    onChange: React.PropTypes.func
};

export default CSSModules(CheckboxInput, styles);