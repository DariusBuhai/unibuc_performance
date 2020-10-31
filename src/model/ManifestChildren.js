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

  var ApiClient = require('../ApiClient'),
      Messages = require('./Messages');



  /**
   * The ManifestChildren model module.
   * @module model/ManifestChildren
   */

   /**
    * Constructs a <code>ManifestChildren</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:model/ManifestChildren} obj Optional instance to populate.
    * @return {module:model/ManifestChildren} The populated <code>ManifestChildren</code> instance.
    */
  var constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();
  
      if (data.hasOwnProperty('type')) {
        obj.type = ApiClient.convertToType(data.type, 'String');
      }
      if (data.hasOwnProperty('role')) {
        obj.role = ApiClient.convertToType(data.role, 'String');
      }
      if (data.hasOwnProperty('name')) {
        obj.name = ApiClient.convertToType(data.name, 'String');
      }
      if (data.hasOwnProperty('hasThumbnail')) {
        obj.hasThumbnail = ApiClient.convertToType(data.hasThumbnail, 'Boolean');
      }
      if (data.hasOwnProperty('mime')) {
        obj.mime = ApiClient.convertToType(data.mime, 'String');
      }
      if (data.hasOwnProperty('urn')) {
        obj.urn = ApiClient.convertToType(data.urn, 'String');
      }
      if (data.hasOwnProperty('progress')) {
        obj.progress = ApiClient.convertToType(data.progress, 'String');
      }
      if (data.hasOwnProperty('status')) {
        obj.status = ApiClient.convertToType(data.status, 'String');
      }
      if (data.hasOwnProperty('resolution')) {
        obj.resolution = ApiClient.convertToType(data.resolution, ['String']);
      }
      if (data.hasOwnProperty('modelGUID')) {
        obj.modelGUID = ApiClient.convertToType(data.modelGUID, 'String');
      }
      if (data.hasOwnProperty('objectIds')) {
        obj.objectIds = ApiClient.convertToType(data.objectIds, ['Integer']);
      }
      if (data.hasOwnProperty('messages')) {
        obj.messages = Messages.constructFromObject(data.messages);
      }
    }
    return obj;
  };

  /**
   * Constructs a new <code>ManifestChildren</code>.
   * Children Manifest
   * @alias module:model/ManifestChildren
   * @class
   * @param type {module:model/ManifestChildren.TypeEnum} Type of this JSON object
   * @param role {module:model/ManifestChildren.RoleEnum} Output file type
   * @param mime {String} MIME type of the generated file
   * @param {Object} theData The plain JavaScript object bearing properties of interest.
   * @param {module:model/ManifestChildren} obj Optional instance to populate.
   */
  var exports = function(type, role, mime, theData, obj) {
    var _this = this;

    _this.type = type;
    _this.role = role;


    _this.mime = mime;








    return constructFromObject(theData, obj);
  };

  /**
   * Constructs a <code>ManifestChildren</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ManifestChildren} obj Optional instance to populate.
   * @return {module:model/ManifestChildren} The populated <code>ManifestChildren</code> instance.
   */
  exports.constructFromObject = constructFromObject;

  /**
   * Type of this JSON object
   * @member {module:model/ManifestChildren.TypeEnum} type
   */
  exports.prototype.type = undefined;
  /**
   * Output file type
   * @member {module:model/ManifestChildren.RoleEnum} role
   */
  exports.prototype.role = undefined;
  /**
   * Output file type
   * @member {String} name
   */
  exports.prototype.name = undefined;
  /**
   * Indicates if a thumbnail has been generated 
   * @member {Boolean} hasThumbnail
   */
  exports.prototype.hasThumbnail = undefined;
  /**
   * MIME type of the generated file
   * @member {String} mime
   */
  exports.prototype.mime = undefined;
  /**
   * Output file URN; used as a file identifier
   * @member {String} urn
   */
  exports.prototype.urn = undefined;
  /**
   * Translation progress for requested entity
   * @member {String} progress
   */
  exports.prototype.progress = undefined;
  /**
   * Status of the requested entity; possible values are: `pending`, `success`, `inprogress`, `failed`, `timeout` and `partialsuccess` 
   * @member {module:model/ManifestChildren.StatusEnum} status
   */
  exports.prototype.status = undefined;
  /**
   * Available thumbnail resolution
   * @member {Array.<String>} resolution
   */
  exports.prototype.resolution = undefined;
  /**
   * @member {String} modelGUID
   */
  exports.prototype.modelGUID = undefined;
  /**
   * @member {Array.<Integer>} objectIds
   */
  exports.prototype.objectIds = undefined;
  /**
   * @member {module:model/Messages} messages
   */
  exports.prototype.messages = undefined;


  /**
   * Allowed values for the <code>type</code> property.
   * @enum {String}
   * @readonly
   */
  exports.TypeEnum = {
    /**
     * value: "resource"
     * @const
     */
    "resource": "resource",
    /**
     * value: "manifest"
     * @const
     */
    "manifest": "manifest",
    /**
     * value: "geometry"
     * @const
     */
    "geometry": "geometry",
    /**
     * value: "view"
     * @const
     */
    "view": "view"  };

  /**
   * Allowed values for the <code>role</code> property.
   * @enum {String}
   * @readonly
   */
  exports.RoleEnum = {
    /**
     * value: "2d"
     * @const
     */
    "2d": "2d",
    /**
     * value: "3d"
     * @const
     */
    "3d": "3d",
    /**
     * value: "graphics"
     * @const
     */
    "graphics": "graphics",
    /**
     * value: "manifest"
     * @const
     */
    "manifest": "manifest",
    /**
     * value: "thumbnail"
     * @const
     */
    "thumbnail": "thumbnail"  };

  /**
   * Allowed values for the <code>status</code> property.
   * @enum {String}
   * @readonly
   */
  exports.StatusEnum = {
    /**
     * value: "pending"
     * @const
     */
    "pending": "pending",
    /**
     * value: "inprogress"
     * @const
     */
    "inprogress": "inprogress",
    /**
     * value: "success"
     * @const
     */
    "success": "success",
    /**
     * value: "failed"
     * @const
     */
    "failed": "failed",
    /**
     * value: "timeout"
     * @const
     */
    "timeout": "timeout",
    /**
     * value: "partialsuccess"
     * @const
     */
    "partialsuccess": "partialsuccess"  };


  return exports;
}());


