import styles from './PageContent.css';

import React from 'react';
import CSSModules from 'react-css-modules';

class PageContent extends React.Component {
    render() {
        return (
            <main styleName='pageContent'>
                {this.props.children}
            </main>
        );
    }
}

PageContent.propTypes = {
    children: React.PropTypes.node.isRequired
};

export default CSSModules(PageContent, styles);