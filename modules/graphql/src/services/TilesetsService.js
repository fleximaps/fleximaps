import Tileset from '../models/Tileset';
import Tile from '../models/Tile';
import Promise from 'bluebird';


export default class TilesetsService{
    constructor(tilesetsDao, tileDao){
        this._tilesetsDao = tilesetsDao;
        this._tileDao = tileDao;
    }
    create(isHexagonal, numCols, numRows, numTileTypes){
        const tileTypes = [];
        for(let i = 0; i < numCols*numRows; i++) {
            const tileType = Math.floor((Math.random() * numTileTypes));
            tileTypes.push(tileType);
        }

        return this.importTileset(isHexagonal, numCols, numRows, numTileTypes, tileTypes);
    }
    importTileset(isHexagonal, numCols, numRows, numTileTypes, tileTypes){
        //Validate
        if(tileTypes.length !== numCols* numRows){
            return Promise.reject("Validation failed: TileTypes count isn't numColsXnumRows");
        } 
        
        const tilesetDao = this._tilesetsDao;
        const tileDao = this._tileDao;

        const newTileset = new Tileset({
            numCols: numCols,
            numRows: numRows,
            tileTypes: numTileTypes,
            isReady: false,
            isHexagonal: isHexagonal
        });

        return this._tilesetsDao
            .create(newTileset)
            .then(function(tileset){
                const tiles = tileTypes.map(function(tileType, index){
                    const colNum = index % numCols;
                    const rowNum = (index - colNum) / numCols;

                    return new Tile({
                        type: tileType,
                        col: colNum,
                        row: rowNum,
                        _tileset: tileset._id
                    })
                });

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
    getTilesets(page, limit){
        return this._tilesetsDao.findAll(page, limit);
    }
    getTilesetsCount(){
        return this._tilesetsDao.findTilesetsCount();
    }
}