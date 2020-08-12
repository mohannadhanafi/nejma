const { override, useBabelRc } = require('customize-cra');
const { addReactRefresh } = require('customize-cra-react-refresh');

module.exports = override(useBabelRc(), addReactRefresh({}));
