import mongoose from 'mongoose';

export default mongoose.model(
    'Tileset',
    {
        tileTypes: Number,
        numCols: Number,
        numRows: Number,
        isReady: Boolean,
        isHexagonal: Boolean
    }
);