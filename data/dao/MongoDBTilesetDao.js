import Tileset from '../models/Tileset';

export default class MongoDBTilesetDao{
    constructor(mongoose){
        this._mongoose = mongoose;
    }
    create(newTileset){
        return newTileset.save();
    }
    deleteAll(){
        return Tileset.find({}).remove().exec();
    }
}