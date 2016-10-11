import React from 'react';
import CSSModules from 'react-css-modules';

import BaseInput from './BaseInput';
import IdGenerator from '../../utils/IdGenerator';

import styles from './FileInput.css';

const ID_PREFIX = 'FileInput';

class FileInput extends React.Component{
    componentWillMount() {
        this._id = ID_PREFIX + IdGenerator.generate();
    }
    render() {
        const inputId = this._id;
        const onChangeListener = (this.props.onChange === undefined)?undefined:this._onChange.bind(this);

        return <BaseInput labelId={inputId} label={this.props.label}>
            <input ref='input' styleName="inputElement" onChange={onChangeListener} type="file" id={inputId}/>
            {this._renderErrors()}
        </BaseInput>
    }
    _renderErrors(){
        const errors = this.props.errors;

        let errorsHtml = null;
        if(errors.length !== 0){
            errorsHtml = <div>
                <ul>
                    {errors.map(function(error, index){
                        return <li key={index}>{error}</li>
                    })}
                </ul>
            </div>
        }

        return errorsHtml;
    }
    _onChange(){
        const files = this.refs.input.files;
        this.props.onChange(files);
    }
}

FileInput.propTypes = {
    label: React.PropTypes.string,
    onChange: React.PropTypes.func,
    errors: React.PropTypes.array
};

FileInput.defaultProps  = {
    errors: []
};

export default CSSModules(FileInput, styles);