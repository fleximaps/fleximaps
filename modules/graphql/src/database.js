import Container from './Container';

const container = new Container();
const tilesetsService = container.getTilesetsService();
const tilesService = container.getTilesService();

//TODO remove in production
tilesetsService.deleteAll();
tilesetsService.create(10, 10, 29);

module.exports = {
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
    }
};