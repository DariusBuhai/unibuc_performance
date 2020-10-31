var ForgeSDK = require('forge-apis');
var FORGE_CLIENT_ID = 'UGtHbq5PBjPXdicgpOWQtM1hHgL4yaDU' , FORGE_CLIENT_SECRET = 'ftck1wYAwbsFFSr7';

// Initialize the 2-legged OAuth2 client, set specific scopes and optionally set the `autoRefresh` parameter to true
// if you want the token to auto refresh
var autoRefresh = true; // or false

var oAuth2TwoLegged = new ForgeSDK.AuthClientTwoLegged(FORGE_CLIENT_ID, FORGE_CLIENT_SECRET, [
    'data:read',
    'data:write'
], autoRefresh);

oAuth2TwoLegged.authenticate().then(function(credentials){
    // The `credentials` object contains an access_token that is being used to call the endpoints.
    // In addition, this object is applied globally on the oAuth2TwoLegged client that you should use when calling secure endpoints.
}, function(err){
    console.error(err);
});

// Stefan a fost aici
