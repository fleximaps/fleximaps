var getbabelRelayPlugin = require('babel-relay-plugin');
var schema = require('../../graphql/data/schema.json');

module.exports = getbabelRelayPlugin(schema.data);