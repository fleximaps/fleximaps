import React from 'react';
import CSSModules from 'react-css-modules';

import styles from './BaseInput.css';

class BaseInput extends React.Component{
    render(){
        return <div styleName="input">
            {this._renderLabel()}
            <div styleName="inputWidget">
                {this.props.children}
            </div>
        </div>;
    }
    _renderLabel(){
        if(typeof this.props.label !== 'undefined'){
            return <label styleName="label" htmlFor={this.props.labelId}>{this.props.label}</label>
        }else{
            return null;
        }
    }
};

BaseInput.propTypes = {
    labelId: React.PropTypes.string.isRequired,
    label: React.PropTypes.string,
    children: React.PropTypes.node.isRequired
};

export default CSSModules(BaseInput, styles);