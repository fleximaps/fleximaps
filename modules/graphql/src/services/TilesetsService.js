import Tileset from '../models/Tileset';
import Tile from '../models/Tile';

export default class TilesetsService{
    constructor(tilesetsDao, tileDao){
        this._tilesetsDao = tilesetsDao;
        this._tileDao = tileDao;
    }
    create(numCols, numRows, numTileTypes){
        const tilesetDao = this._tilesetsDao;
        const tileDao = this._tileDao;

        const newTileset = new Tileset({
            numCols: numCols,
            numRows: numRows,
            tileTypes: numTileTypes,
            isReady: false
        });

        return this._tilesetsDao
            .create(newTileset)
            .then(function(tileset){
                var tiles = [];

                for(let rowNum = 0; rowNum < tileset.numRows; rowNum++){
                    for(let colNum = 0; colNum < tileset.numCols; colNum++){
                        tiles.push(new Tile({
                            type: Math.floor((Math.random() * tileset.tileTypes)),
                            col: colNum,
                            row: rowNum,
                            _tileset: tileset._id
                        }));
                    }
                }

                return tileDao
                    .createMany(tiles)
                    .then(function(createdTiles){
                        return {
                            tileset: tileset,
                            tiles: createdTiles
                        };
                    });
            })
            .then(function(createdObjs){
                createdObjs.tileset.isReady = true;

                return tilesetDao
                    .save(createdObjs.tileset)
                    .then(function(tileset){
                        return {
                            tileset: tileset,
                            tiles: createdObjs.tiles
                        };
                    });
            });
    }
    deleteAll(){
        const tileDao = this._tileDao;

        return this._tilesetsDao.deleteAll()
            .then(function(){
                return tileDao.deleteAll();
            });
    }
    getById(id){
        return this._tilesetsDao.findById(id);
    }
}