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

module.export = (function () {
	'use strict';

	var expect = require('expect.js'),
		sinon = require('sinon'),
		ForgeSdk = require('../../src'),
		instance,
		oauth2client,
		credentials,
		mockedApiClientRequest,
		ApiClient = require('../../src/ApiClient'),
		UserProfile = require('../../src/model/UserProfile');

	var sampleStrParam = 'test_string';
	var sampleIntParam = 10;
	var FORGE_CLIENT_ID = process.env.FORGE_CLIENT_ID || '<your forge client ID>';
	var FORGE_CLIENT_SECRET = process.env.FORGE_CLIENT_SECRET || '<your forge client secret>';

	var apiClient = new ApiClient();

	before(function () {
		oauth2client = new ForgeSdk.AuthClientTwoLegged(FORGE_CLIENT_ID, FORGE_CLIENT_SECRET, ['data:read', 'data:write']);
		credentials = {
			access_token: 'abce'
		};
		instance = new ForgeSdk.UserProfileApi(apiClient);
		mockedApiClientRequest = sinon.stub(instance.apiClient, 'callApi');
	});

	after(function () {
		apiClient.callApi.restore();
	});


	describe('UserProfileApi', function () {
		describe('getUserProfile', function () {
			it('should call getUserProfile successfully', function (done) {

				var postBody = null;

				var pathParams = {};
				var queryParams = {};
				var headerParams = {};
				var formParams = {};

				var contentTypes = ['application/json'];
				var accepts = ['application/vnd.api+json', 'application/json'];
				var returnType = UserProfile;

				mockedApiClientRequest.withArgs('/userprofile/v1/users/@me', 'GET',
					pathParams, queryParams, headerParams, formParams, postBody,
					contentTypes, accepts, returnType, oauth2client, credentials).returns(Promise.resolve('Success result'));

				instance.getUserProfile(oauth2client, credentials).then(function (response) {
					expect(response).to.be.ok();
					done();
				}, function (err) {
					done(err);
				});
			});
		});
	});

}());