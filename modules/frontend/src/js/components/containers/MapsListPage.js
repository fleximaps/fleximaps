import MapsList from '../widgets/MapsList';
import Panel from '../widgets/Panel';
import Wrapper from '../widgets/Wrapper';
import CreateTilesetButton from '../widgets/CreateTilesetButton';
import MapsListPaginator from '../widgets/MapsListPaginator';

import styles from './MapsListPage.css';
import footerPanelStyles from './FooterPanel.css';

import React from 'react';
import Relay from 'react-relay';
import CSSModules from 'react-css-modules';
import { Link, withRouter } from 'react-router'

const PAGE_SIZE = 10;

class MapsListPage extends React.Component {
    render() {
        const viewer = this.props.viewer;
        const tilesets = viewer.tilesets;
        const pageInfo = tilesets.pageInfo;

        return (
            <div>
                <Wrapper>
                    <Panel>
                        <MapsList tilesets={viewer.tilesets}/>
                    </Panel>
                    <Panel styles={footerPanelStyles}>
                        <CreateTilesetButton/>
                        <div styleName='paginator'>
                            <MapsListPaginator
                                pageSize={PAGE_SIZE}
                                totalCount={viewer.tilesetsCount}
                                page={this.props.page}
                            />
                        </div>
                    </Panel>
                </Wrapper>
                {this.props.children}
            </div>
        );
    }
};

const MapsListPageCss = CSSModules(MapsListPage, styles);

export default Relay.createContainer(MapsListPageCss, {
    fragments: {
        viewer: () => Relay.QL`
            fragment on Viewer{
                tilesets(limit: $pageSize, page: $page){
                    id,
                    numCols,
                    numRows,
                    availableTileTypes
                },
                tilesetsCount
            }
        `
    },
    initialVariables: {
        page: 1,
        pageSize: PAGE_SIZE
    }
});