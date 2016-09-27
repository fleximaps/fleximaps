import styles from './Paginator.css';

import React from 'react';
import CSSModules from 'react-css-modules';

class Paginator extends React.Component {
    render() {
        return (
            <div styleName='paginator'>
                <ol styleName='paginatorList'>
                    {this._getNumbers()}
                </ol>
            </div>
        );
    }
    _getNumbers(){
        const elms = [];

        const pagesNum = this._getPagesNum();
        for(let i=1; i<=pagesNum; i++){
            const elm = this.props.createNumberCb(i, this.props.page);
            elms.push(<li key={i} styleName='paginatorListItem'>{elm}</li>);
        }

        return elms;
    }
    _getPagesNum(){
        return Math.ceil(this.props.totalCount / this.props.pageSize);
    }
}

Paginator.propTypes = {
    pageSize: React.PropTypes.number.isRequired,
    totalCount: React.PropTypes.number.isRequired,
    page: React.PropTypes.number.isRequired,
    createNumberCb: React.PropTypes.func.isRequired
};

export default CSSModules(Paginator, styles);