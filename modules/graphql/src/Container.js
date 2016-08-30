import mongoose from 'mongoose';

import MongoDBTilesetDao from './dao/MongoDBTilesetDao';
import TilesetsService from './services/TilesetsService';

const URL = 'mongodb://localhost:27017/fleximaps';

export default class Container{
    constructor(){
        this._init();
    }
    _init(){
        this._initDatabase();
    }
    _initDatabase(){
        this._mongoose = mongoose.connect(URL);
        
        this._tilesetDao = new MongoDBTilesetDao(this._mongoose);
        this._tilesetsService = new TilesetsService(this._tilesetDao);
    }
    getMongoose(){
        return this._mongoose;
    }
    getTilesetsService(){
        return this._tilesetsService;
    }
}