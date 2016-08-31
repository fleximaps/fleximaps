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
        } else {
            return null;
        }
    },
    (obj) => {
        if (obj instanceof Tile) {
            return TileType;
        } else if (obj instanceof Tileset) {
            return TilesetType;
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

/**
 * This is the type that will be the root of our query,
 * and the entry point into our schema.
 */
var queryType = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        node: nodeField,
        // Add your own root fields here
        tileset: {
            type: TilesetType,
            resolve: () => require('./database').getTilesetById(1)//TODO fake id
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

/**
 * This is the type that will be the root of our mutations,
 * and the entry point into performing writes in our schema.
 */
var mutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        changeTileType: ChangeTileTypeMutation
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