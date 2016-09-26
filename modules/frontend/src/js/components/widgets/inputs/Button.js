import React from 'react';

class Button extends React.Component{
    render(){
        return <button type="button" onClick={this.props.onClick}>
            {this.props.children}
        </button>
    }
}

Button.propTypes = {
    onClick: React.PropTypes.func,
    children: React.PropTypes.node.isRequired
};

Button.defaultProps = {
    onClick:  function(){}
};

export default Button;