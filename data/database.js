import Tileset from './models/Tileset';
import Tile from './models/Tile';
import TilesRow from './models/TilesRow';

const TILES_X = 10;
const TILES_Y = 10;
const TILE_TYPES = 10;

// Mock data
const tileset = new Tileset();
tileset.id = '0';

const tilesRows = [];
for(let y = 0; y < TILES_Y; y++){

  const tilesInTheRow = [];
  for(let x = 0; x < TILES_X; x++){
    const tile = new Tile();
    tile.id = `${x}-${y}`;
    tile.type = Math.floor((Math.random() * TILE_TYPES));

    tilesInTheRow.push(tile);
  }

  const tilesRow = new TilesRow();
  tilesRow.id = `${y}`;
  tilesRow.tiles = tilesInTheRow;

  tilesRows.push(tilesRow);
}

const getTileset = function(){
  return tileset;
};

const getTilesRows = function () {
  return tilesRows;
};

const getTilesInRow = function (y) {
  const tilesRow = tilesRows[y];

  if(typeof tilesRow === 'undefined'){
    return null;
  }

  return tilesRow.tiles;
};

const getTile = function(x, y){
  const tilesRow = getTilesInRow(y);

  if(typeof tilesRow === 'undefined'){
    return null;
  }

  const tile = tilesRow[x];
  if(typeof tile === 'undefined'){
    return null;
  }else{
    return tile;
  }
};

module.exports = {
  getTileset: getTileset,
  getTilesRows: getTilesRows,
  getTilesInRow: getTilesInRow,
  getTile: getTile
};
