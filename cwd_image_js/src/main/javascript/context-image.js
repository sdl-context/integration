/*
 * Copyright (c) 2013-2014 SDL Tridion Development Lab B.V.
 * All rights reserved.
 *
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 2 as published
 * by the Free Software Foundation.
 *
 * If the program is linked with libraries which are licensed under one of
 * the following licenses, the combination of the program with the linked
 * library is not considered a "derivative work" of the program:
 *
 *     - Apache License, version 2.0
 *     - Apache Software License, version 1.0
 *     - GNU Lesser General Public License, version 3
 *     - Mozilla Public License, versions 1.0, 1.1 and 2.0
 *     - Common Development and Distribution License (CDDL), version 1.0
 *
 * Therefore the distribution of the program linked with libraries licensed
 * under the aforementioned licenses, is permitted by the copyright holders
 * if the distribution is compliant with both the GNU General Public
 * License version 2 and the aforementioned licenses.
 *
 * This program is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General
 * Public License for more details.
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
        var rule = element.getAttribute('data-rule');
        if (rule) {
            /* For img elements, this will return the FQDN stripped of the : */
            var source = element.src.replace(/^(https?):/, '/$1');
            var toRule = element.getAttribute('data-to-rule');
            var transform = configuration.root + rule + source + (toRule ? toRule : '');
            element.setAttribute('src', transform);
            element.removeAttribute('data-rule');
            if (toRule) {
                element.removeAttribute('data-to-rule');
            }
            if (configuration.visibility) {
                element.style.visibility = configuration.visibility;
            }
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
}(window.Context = window.Context || {}, null));