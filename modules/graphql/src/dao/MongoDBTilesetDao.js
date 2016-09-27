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
    findAll(page = undefined, limit = undefined){
        let query = Tileset.find({});

        if(limit !== undefined && page !== undefined){
            query = query.sort('_id').limit(limit).skip(limit * (page - 1));
        }
        return query.exec();
    }
    findTilesetsCount(){
        return Tileset.find({}).count();
    }
}