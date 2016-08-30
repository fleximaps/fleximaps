import Tileset from '../models/Tileset';

export default class TilesetsService{
    constructor(tilesetsDao){
        this._tilesetsDao = tilesetsDao;
    }
    create(numCols, numRows){
        const newTileset = new Tileset();

        return this._tilesetsDao.create(newTileset);
    }
    deleteAll(){
        return this._tilesetsDao.deleteAll();
    }
}