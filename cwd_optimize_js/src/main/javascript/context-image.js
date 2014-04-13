/*
 * Copyright (c) 2013-2014 SDL Tridion Development Lab B.V.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 *   Context namespace
 *
 *   Implemented as a self-executing anonymous function. Note the deliberate use of the undefined parameter:
 *   See http://enterprisejquery.com/2010/10/how-good-c-habits-can-encourage-bad-javascript-habits-part-1
 */

(function (Context, undefined) {

    /**
     * Optimizes the supplied element
     *
     * @param {string} element the element to optimize
     * @param {Object} configuration the configuration
     */
    Context.optimizeElement = function (element, configuration) {
        var rule = element.getAttribute('data-cid-rule');
        if (!rule || element.nodeName !== 'IMG') {
            return;
        }
        if (configuration.visibility) {
            // Register onload event to set visibility only once image has loaded
            var setVisibility = function () {
                this.style.visibility = configuration.visibility;
            };
            element.addEventListener ?
                element.addEventListener("load", setVisibility, false) :
                element.attachEvent && element.attachEvent("onload", setVisibility);
        }
        var source = element.getAttribute('src').replace(/^(https?):\//, '/$1');
        var toRule = element.getAttribute('data-cid-to-rule');
        element.src = configuration.root + rule + source + (toRule ? toRule : '');
        element.removeAttribute('data-cid-rule');
        if (toRule) {
            element.removeAttribute('data-cid-to-rule');
        }
    };

    /**
     * Optimize elements that match the tag name
     *
     * @param {string} tagName the tag name
     * @param {Object} settings the custom user settings
     */
    Context.optimizeElementsByTagName = function (tagName, settings) {
        var configuration = {
            'root': '/t'
        };
        if (settings) {
            configuration = merge(configuration, settings);
        }
        var elements = document.getElementsByTagName(tagName);

        for (var i = 0, length = elements.length; i < length; i++) {
            this.optimizeElement(elements[i], configuration);
        }
    };


    /**
     * Optimize elements
     *
     * @param {Object} settings the custom user settings
     */
    Context.optimize = function (settings) {
        return Context.optimizeElementsByTagName('img', settings);
    };


    /**
     * Merge two sets of object properties
     *
     * @param {Object} obj1 the master set of object properties
     * @param {Object} obj2 the additional object properties to augment the master set
     * @return {Object} the merged properties
     */
    function merge(obj1, obj2) {
        var obj3 = {};
        for (var prop in obj1) {
            if (obj1.hasOwnProperty(prop)) {
                obj3[prop] = obj1[prop];
            }
        }
        for (var prop in obj2) {
            if (obj2.hasOwnProperty(prop)) {
                obj3[prop] = obj2[prop];
            }
        }
        return obj3;
    }
}
    (window.Context = window.Context || {}, null)
    )
;