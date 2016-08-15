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

import Tile from './models/Tile';
import Tileset from './models/Tileset';
import TilesRow from './models/TilesRow';

import {
  // Import methods that your schema can use to interact with your database
  getTile,
  getTilesRows,
  getTileset,
  getTilesInRow
} from './database';

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
      const splittedId = id.split('-');

      if(splittedId.length !== 2){
        return null;
      }

      const x = splittedId[0];
      const y = splittedId[1];

      return getTile(x, y);
    } else if(type === 'Tileset'){
      return getTileset(id);
    } else {
      return null;
    }
  },
  (obj) => {
    if (obj instanceof Tile) {
      return TileType;
    } else if (obj instanceof Tileset)  {
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
    rows: {
      type: new GraphQLList(TilesRowType),
      description: 'Tile rows in a tileset',
      resolve: () => getTilesRows()
    }
  }),
  interfaces: [nodeInterface]
});

var TilesRowType = new GraphQLObjectType({
  name: 'TilesRow',
  description: 'A tiles row',
  fields: () => ({
    id: globalIdField('TilesRow'),
    tiles: {
      type: new GraphQLList(TileType),
      description: 'Tiles in a row',
      resolve: function(tilesRow){
        return getTilesInRow(tilesRow.id);
      }
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
      resolve: () => getTileset()
    }
  })
});

/**
 * This is the type that will be the root of our mutations,
 * and the entry point into performing writes in our schema.
 */
var mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    // Add your own mutations here
  })
});

/**
 * Finally, we construct our schema (whose starting query type is the query
 * type we defined above) and export it.
 */
export var Schema = new GraphQLSchema({
  query: queryType,
  // Uncomment the following after adding some mutation fields:
  // mutation: mutationType
});
