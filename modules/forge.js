var ForgeSDK = require('forge-apis');

async function get_credentials(){
    var oAuth2TwoLegged = new ForgeSDK.AuthClientTwoLegged(FORGE_CLIENT_ID, FORGE_CLIENT_SECRET, [
        'data:read',
        'data:write'
    ], autoRefresh);

    return await oAuth2TwoLegged.authenticate();
}

export default get_credentials();