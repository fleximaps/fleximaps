import TileType from '../models/TileType';

export default class MongoDBTileTypeDao{
    constructor(mongoose){
        this._mongoose = mongoose;
    }
    create(tileType){
        return tileType.save();
    }
    save(tileType){
        return tileType.save();
    }
    deleteAll(){
        return TileType.find({}).remove().exec();
    }
    findById(id){
        return TileType.findOne({
            '_id': id
        });
    }
}