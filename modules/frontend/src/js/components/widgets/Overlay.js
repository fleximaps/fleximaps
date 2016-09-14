import styles from './Overlay.css';

import React from 'react';
import CSSModules from 'react-css-modules';

export default CSSModules(class Overlay extends React.Component {
    render() {
        return (
            <div>
                <div styleName='underlay' onClick={this._handleClose.bind(this)}></div>
                <div styleName='overlay'>
                    <div styleName='title'>{this.props.title}</div>
                    <div styleName='body'>{this.props.children}</div>
                </div>
            </div>
        );
    }
    _handleClose() {
        if(typeof this.props.onClose !== 'undefined'){
            this.props.onClose();
        }
    }
}, styles);