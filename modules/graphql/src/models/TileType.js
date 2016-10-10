import mongoose from 'mongoose';

export default mongoose.model(
    'TileType',
    {
        name: String
    }
);