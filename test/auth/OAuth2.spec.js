/**
 * Forge SDK
 * The Forge Platform contains an expanding collection of web service components that can be used with Autodesk cloud-based products or your own technologies. Take advantage of Autodesk’s expertise in design and engineering.
 *
 * OpenAPI spec version: 0.1.0
 * Contact: forge.help@autodesk.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

module.exports = (function() {
    'use strict';

    var expect = require('expect.js'),
        sinon = require('sinon'),
        request = require('request'),
        OAuth2 = require('../../src/auth/OAuth2'),
        OAuth2TwoLegged = require('../../src/auth/OAuth2TwoLegged'),
        OAuth2ThreeLegged = require('../../src/auth/OAuth2ThreeLegged'),
        mockedPostRequest,
        nock = require('nock');

    var oauth2, oauth2client2legged, oauth2client3legged;

    before(function(){
        var FORGE_CLIENT_ID = process.env.FORGE_CLIENT_ID || '<your forge client ID>';
        var FORGE_CLIENT_SECRET = process.env.FORGE_CLIENT_SECRET || '<your forge client secret>';
        var FORGE_CALLBACK = process.env.FORGE_CALLBACK || '<your forge callback url>';

        oauth2client2legged = new OAuth2TwoLegged(FORGE_CLIENT_ID, FORGE_CLIENT_SECRET, ['data:read', 'data:write']);
        oauth2client3legged = new OAuth2ThreeLegged(FORGE_CLIENT_ID, FORGE_CLIENT_SECRET, FORGE_CALLBACK, ['data:read', 'data:write']);
    });

    describe('OAuth2', function() {
        describe('OAuth2 interface', function(){
            it('should be an interface only (can\'t create instance)', function() {
                try {
                    oauth2 = new OAuth2(FORGE_CLIENT_ID, FORGE_CLIENT_SECRET, ['data:read', 'data:write']);
                } catch(e) {
                    expect(e).to.eql(new Error('Your OAuth2 object is missing the "authentication" property'));
                }
            });
        });

        describe('OAuth2 clients common', function() {
            it('should have shared properties', function() {

                // 2-legged client
                expect(oauth2client2legged).to.have.property('clientId');
                expect(oauth2client2legged).to.have.property('authName');
                expect(oauth2client2legged).to.have.property('clientSecret');
                expect(oauth2client2legged).to.have.property('authentication');
                expect(oauth2client2legged.authentication).to.have.property('tokenUrl');
                expect(oauth2client2legged.authentication).to.have.property('scopes');
                expect(oauth2client2legged).to.have.property('scope');
                expect(oauth2client2legged).to.have.property('basePath');
                expect(oauth2client2legged).to.have.property('credentials');
                expect(oauth2client2legged).to.have.property('autoRefresh');

                // 3-legged client
                expect(oauth2client3legged).to.have.property('clientId');
                expect(oauth2client3legged).to.have.property('authName');
                expect(oauth2client3legged).to.have.property('clientSecret');
                expect(oauth2client3legged).to.have.property('authentication');
                expect(oauth2client3legged.authentication).to.have.property('tokenUrl');
                expect(oauth2client3legged.authentication).to.have.property('scopes');
                expect(oauth2client3legged).to.have.property('scope');
                expect(oauth2client3legged).to.have.property('basePath');
                expect(oauth2client3legged).to.have.property('credentials');
                expect(oauth2client3legged).to.have.property('autoRefresh');
            });

            it('should be able to call doPostRequest', function(done) {
                expect(oauth2client2legged.doPostRequest).to.be.a(Function);
                expect(oauth2client3legged.doPostRequest).to.be.a(Function);

                var host = 'localtest.com',
                    urlBasePath = 'http://' + host;

                nock(urlBasePath)
                    .post('/foo', {})
                    .reply(200, function(uri, respBody){
                        expect(this.req.headers).to.have.property('content-type');
                        expect(this.req.headers.host).to.equal(host);
                        return respBody;
                    });

                oauth2client2legged.doPostRequest(urlBasePath + '/foo', {}, function(response){
                    expect(response).to.be.equal('');
                    done();
                }, function(err){
                    done(err);
                });
            });
        });

        describe('OAuth2 two-legged client', function() {
            it('setCredentials and getCredentials should work as expected', function () {
                expect(oauth2client2legged.setCredentials).to.be.a(Function);
                oauth2client2legged.setCredentials({access_token:'abcd'});
                expect(oauth2client2legged.getCredentials()).to.eql({access_token:'abcd'});
            });

            it('isAuthorized should work as expected', function () {
                var futureTime = new Date(Date.now() + 300 * 1000);
                oauth2client2legged.setCredentials({access_token:'abcd',expires_at: futureTime});
                expect(oauth2client2legged.isAuthorized()).to.equal(true);
            });

            it('authenticate should work', function (done) {

                mockedPostRequest = sinon.stub(oauth2client2legged, 'doPostRequest');
                var credentials = {
                    access_token: 'abcdef',
                    expires_in: 1800
                };
                mockedPostRequest.yields(credentials);
                oauth2client2legged.authenticate().then(function(response){
                    expect(response).to.be.ok();
                    expect(response).to.have.property('expires_at');
                    mockedPostRequest.restore();
                    done();
                }, function(err){
                    done(err);
                });
            });
        });

        describe('OAuth2 three-legged client', function() {
            it('should have redirectUri property', function () {
                expect(oauth2client3legged).to.have.property('redirectUri');
            });

            it('generateAuthUrl should work as expected', function () {
                expect(oauth2client3legged.generateAuthUrl).to.be.a(Function);
                expect(oauth2client3legged.generateAuthUrl()).to.contain('authentication/v1/authorize');
                expect(oauth2client3legged.generateAuthUrl()).to.contain('response_type=code');
                expect(oauth2client3legged.generateAuthUrl('state-test')).to.contain('state=state-test');
            });

            it('getToken should work', function (done) {

                mockedPostRequest = sinon.stub(oauth2client3legged, 'doPostRequest');
                var credentials = {
                    access_token: 'abcdef',
                    expires_in: 1800
                };
                mockedPostRequest.yields(credentials);

                oauth2client3legged.getToken('some_code').then(function(response){
                    expect(response).to.be.ok();
                    expect(response).to.have.property('expires_at');
                    mockedPostRequest.restore();
                    done();
                }, function(err){
                    done(err);
                });
            });

            it('refreshToken should work', function (done) {

                mockedPostRequest = sinon.stub(oauth2client3legged, 'doPostRequest');
                var credentials = {
                    access_token: 'abcdef',
                    refresh_token: 'foobar',
                    expires_in: 1800
                };
                mockedPostRequest.yields(credentials);

                oauth2client3legged.refreshToken(credentials).then(function(response){
                    expect(response).to.be.ok();
                    expect(response).to.have.property('expires_at');
                    mockedPostRequest.restore();
                    done();
                }, function(err){
                    done(err);
                });
            });
        });

    });
}());
