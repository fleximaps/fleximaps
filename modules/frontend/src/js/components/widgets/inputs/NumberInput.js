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
        const inputId = this._id;
        return <BaseInput labelId={inputId} label={this.props.label}>
            <input styleName="inputElement" type="number" id={inputId}/>
        </BaseInput>
    }
}

NumberInput.propTypes = {
    label: React.PropTypes.string
};

export default CSSModules(NumberInput, styles);