import Tile from '../models/Tile';

export default class MongoDBTileDao{
    constructor(mongoose){
        this._mongoose = mongoose;
    }
    create(newTile){
        return newTile.save();
    }
    createMany(newTiles){
        return Tile.insertMany(newTiles);
    }
    save(tile){
        return tile.save();
    }
    deleteAll(){
        return Tile.find({}).remove().exec();
    }
    findRowsByTilesetId(tilesetId){
        return Tile.find({
            _tileset: tilesetId
        }).exec();
    }
    findById(id, isReady = true){
        return Tile.findOne({
            '_id': id
        });
    }
}