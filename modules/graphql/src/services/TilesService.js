import bluebird from 'bluebird';

export default class TilesService{
    constructor(tileDao, tilesetDao){
        this._tileDao = tileDao;
        this._tilesetDao = tilesetDao;
    }
    getById(id){
        return this._tileDao.findById(id);
    }
    getRows(tileset){
        return this._tileDao.findRowsByTilesetId(tileset._id);
    }
    setTileType(tileId, tileType){
        const tileDao = this._tileDao;
        const tilesetDao = this._tilesetDao;

        return tileDao
            .findById(tileId)
            .then(function(tile){
                if(tile === null){
                    return bluebird.Promise.reject('Invalid tile id.');
                }else{
                    return tile;
                }
            })
            .then(function(tile){
                return tilesetDao
                    .findById(tile._tileset)
                    .then(function(tileset){
                        return {
                            tileset: tileset,
                            tile: tile
                        };
                    })
                ;
            })
            .then(function({tileset, tile}){
                //Validate
                if(tileType >= 0 && tileType < tileset.tileTypes){
                    return tile;
                }else{
                    return bluebird.Promise.reject('Invalid tile type.');
                }
            })
            .then(function(tile){
                tile.type = tileType;

                return tileDao.save(tile);
            })
        ;
    }
}