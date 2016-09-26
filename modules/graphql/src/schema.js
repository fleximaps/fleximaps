import {
    GraphQLBoolean,
    GraphQLFloat,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
} from 'graphql';

import {
    connectionArgs,
    connectionDefinitions,
    connectionFromArray,
    fromGlobalId,
    globalIdField,
    mutationWithClientMutationId,
    nodeDefinitions,
} from 'graphql-relay';

import {maskErrors} from 'graphql-errors';


import Tile from './models/Tile';
import Tileset from './models/Tileset';
import Viewer from './localmodels/Viewer';

/**
 * We get the node interface and field from the Relay library.
 *
 * The first method defines the way we resolve an ID to its object.
 * The second defines the way we resolve an object to its GraphQL type.
 */
var {nodeInterface, nodeField} = nodeDefinitions(
    (globalId) => {
        var {type, id} = fromGlobalId(globalId);
        if (type === 'Tile') {
            return require('./database').getTileById(id);
        } else if (type === 'Tileset') {
            return require('./database').getTilesetById(id);
        } else if (type === 'Viewer'){
            return require('./database').getViewer();
        }else{
            return null;
        }
    },
    (obj) => {
        if (obj instanceof Tile) {
            return TileType;
        } else if (obj instanceof Tileset) {
            return TilesetType;
        } else if(obj instanceof Viewer){
            return ViewerType;
        } else {
            return null;
        }
    }
);

/**
 * Define your own types here
 */

var TilesetType = new GraphQLObjectType({
    name: 'Tileset',
    description: 'A tileset',
    fields: () => ({
        id: globalIdField('Tileset'),
        tiles: {
            type: new GraphQLList(TileType),
            description: 'Tiles in a tileset',
            resolve: (tileset) => require('./database').getRows(tileset)
        },
        availableTileTypes: {
            type: GraphQLInt,
            description: 'Tile types available for this tileset',
            resolve: (tileset) => tileset.tileTypes
        },
        numCols: {
            type: GraphQLInt,
            description: 'Number of columns in the tileset',
            resolve: (tileset) => tileset.numCols
        },
        numRows: {
            type: GraphQLInt,
            description: 'Number of rows in the tileset',
            resolve: (tileset) => tileset.numRows
        }
    }),
    interfaces: [nodeInterface]
});

var TileType = new GraphQLObjectType({
    name: 'Tile',
    description: 'A tile',
    fields: () => ({
        id: globalIdField('Tile'),
        type: {
            type: GraphQLInt,
            description: 'The type of a tile'
        },
        col: {
            type: GraphQLInt,
            description: 'The column of a tile'
        },
        row: {
            type: GraphQLInt,
            description: 'The row of a tile'
        }
    }),
    interfaces: [nodeInterface]
});

const {connectionType: tilesetsConnectionType} =
    connectionDefinitions({name: 'Tileset', nodeType: TilesetType});

var ViewerType = new GraphQLObjectType({
    name: 'Viewer',
    fields: () => ({
        id: globalIdField('ViewerType'),
        node: nodeField,
        tilesets: {
            type: tilesetsConnectionType,
            args: connectionArgs,
            resolve: function(_, args){
                return require('./database')
                    .getTilesets()
                    .then(function(tilesets){
                        return connectionFromArray(tilesets, args);
                    });
            }
        }
    })
});

/**
 * This is the type that will be the root of our query,
 * and the entry point into our schema.
 */
var queryType = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        node: nodeField,
        viewer: {
            type: ViewerType,
            resolve: (_, args) => require('./database').getViewer()
        },
        tileset: {
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID)
                }
            },
            type: TilesetType,
            resolve: function(_, args){
                const localKey = fromGlobalId(args.id);
                const localId = localKey.id;

                return require('./database').getTilesetById(localId);
            }
        }
    })
});

var ChangeTileTypeMutation = mutationWithClientMutationId({
    name: 'ChangeTileTypeMutation',
    inputFields: {
        id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        tileType: {
            type: new GraphQLNonNull(GraphQLInt)
        }
    },
    outputFields: {
        tile: {
            type: TileType,
            resolve: (result) => result
        }
    },
    mutateAndGetPayload: ({id, tileType}) => {
        const localKey = fromGlobalId(id);
        const localId = localKey.id;

        return require('./database')
            .setTileType(localId, tileType);
    }
});

var CreateTilesetMutation = mutationWithClientMutationId({
    name: 'CreateTilesetMutation',
    inputFields: {
        numCols: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        numRows: {
            type: new GraphQLNonNull(GraphQLInt)
        }
    },
    outputFields: {
        tileset: {
            type: new GraphQLNonNull(TilesetType),
            resolve: function(result){
                return result.tileset;
            }
        }
    },
    mutateAndGetPayload: ({numCols, numRows}) => {
        return require('./database').createTileset(numCols, numRows);
    }
});

/**
 * This is the type that will be the root of our mutations,
 * and the entry point into performing writes in our schema.
 */
var mutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        changeTileType: ChangeTileTypeMutation,
        createTileset: CreateTilesetMutation
    })
});

/**
 * Finally, we construct our schema (whose starting query type is the query
 * type we defined above) and export it.
 */
var Schema = new GraphQLSchema({
    query: queryType,
    mutation: mutationType
});

maskErrors(Schema);

export {Schema as Schema};