import Container from './Container';
import Viewer from './localmodels/Viewer';

const container = new Container();
const tilesetsService = container.getTilesetsService();
const tilesService = container.getTilesService();

const viewer = new Viewer();

module.exports = {
    getTilesets: function(page, limit){
        return tilesetsService.getTilesets(page, limit);
    },
    getTilesetById: function(id){
        return tilesetsService.getById(id);
    },
    getTileById: function(id){
        return tilesService.getById(id);
    },
    getTile: null,
    setTileType: function(tileId, tileType){
        return tilesService.setTileType(tileId, tileType);
    },
    getRows: function(tileset){
        return tilesService.getRows(tileset);
    },
    getViewer: function(){
        return viewer;
    },
    createTileset: function (numCols, numRows) {
        return tilesetsService.create(numCols, numRows, 29);
    },
    getTilesetsCount: function(){
        return tilesetsService.getTilesetsCount();
    }
};