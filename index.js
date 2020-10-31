var ForgeSDK = require('forge-apis');
var FORGE_CLIENT_ID = 'UGtHbq5PBjPXdicgpOWQtM1hHgL4yaDU' , FORGE_CLIENT_SECRET = 'ftck1wYAwbsFFSr7';

var autoRefresh = true; // or false

async function get_credentials(){
    var oAuth2TwoLegged = new ForgeSDK.AuthClientTwoLegged(FORGE_CLIENT_ID, FORGE_CLIENT_SECRET, [
        'data:read',
        'data:write'
    ], autoRefresh);

    return await oAuth2TwoLegged.authenticate();
}

const http = require('http');

const requestListener = async function (req, res) {
    let credentials = await get_credentials();
    res.writeHead(200);
    res.end(credentials.access_token);
}

const server = http.createServer(requestListener);
server.listen(8080);
