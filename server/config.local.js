var p = require('../package.json');
var version = p.version.split('.').shift();
module.exports = {
  restApiRoot: '/api' + (version > 0 ? '/v' + version : '')
};
