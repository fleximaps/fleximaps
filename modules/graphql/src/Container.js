import bluebird from 'bluebird';
import mongoose from 'mongoose';

import MongoDBTilesetDao from './dao/MongoDBTilesetDao';
import MongoDBTileDao from './dao/MongoDBTileDao';
import MongoDBTileTypeDao from './dao/MongoDBTileTypeDao';

import TilesetsService from './services/TilesetsService';
import TilesService from './services/TilesService';
import TileTypesService from './services/TileTypesService';

const URL = 'mongodb://localhost:27017/fleximaps';

export default class Container{
    constructor(){
        this._init();
    }
    _init(){
        this._initDatabase();
    }
    _initDatabase(){
        mongoose.Promise = require('bluebird');
        this._mongoose = mongoose.connect(URL);
        
        this._tilesetDao = new MongoDBTilesetDao(this._mongoose);
        this._tileDao = new MongoDBTileDao(this._mongoose);
        this._tileTypeDao = new MongoDBTileTypeDao(this._mongoose);

        this._tilesetsService = new TilesetsService(this._tilesetDao, this._tileDao);
        this._tilesService = new TilesService(this._tileDao, this._tilesetDao);
        this._tileTypesService = new TileTypesService(this._tileTypeDao);
    }
    getMongoose(){
        return this._mongoose;
    }
    getTilesetsService(){
        return this._tilesetsService;
    }
    getTilesService(){
        return this._tilesService;
    }
    getTileTypesService(){
        return this._tileTypesService;
    }
}