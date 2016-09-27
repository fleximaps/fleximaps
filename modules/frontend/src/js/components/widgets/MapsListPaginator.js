import Paginator from './Paginator';

import React from 'react';
import { Link } from 'react-router'

export default class MapsListPaginator extends React.Component{
    render(){
        return <Paginator
            page={this.props.page}
            totalCount={this.props.totalCount}
            createNumberCb={function(pageNum, currentPage){
                let elm = null;
                if(pageNum === currentPage){
                    elm = <li key={pageNum}>{pageNum}</li>;
                }else{
                    elm = <li key={pageNum}><Link to={'/maps/?page=' + pageNum}>{pageNum}</Link></li>;
                }
                return elm;
            }}
            pageSize={this.props.pageSize}
        />;
    }
}

Paginator.propTypes = {
    pageSize: React.PropTypes.number.isRequired,
    totalCount: React.PropTypes.number.isRequired,
    page: React.PropTypes.number.isRequired
};