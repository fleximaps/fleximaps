import Tileset from '../models/Tileset';

export default class MongoDBTilesetDao{
    constructor(mongoose){
        this._mongoose = mongoose;
    }
    create(newTileset){
        return newTileset.save();
    }
    save(tileset){
        return tileset.save();
    }
    deleteAll(){
        return Tileset.find({}).remove().exec();
    }
    findById(id, isReady = true){
        return Tileset.findOne({
            '_id': id,
            isReady: isReady
        });
    }
    findAll(){
        return Tileset.find({}).exec();
    }
}