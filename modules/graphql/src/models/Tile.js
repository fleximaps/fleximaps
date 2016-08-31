import mongoose from 'mongoose';

export default mongoose.model(
    'Tile',
    {
        type: Number,
        col: Number,
        row: Number,
        _tileset: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tileset' }]
    }
);