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
            var source = element.getAttribute('src');
            if (source.lastIndexOf('/', 0) != 0) {
                source = '/' + source;
            }
            var toRule = element.getAttribute('data-to-rule');
            var transform = configuration.root + rule + source + (toRule ? toRule : '');
            element.setAttribute('src', transform);
            element.removeAttribute('data-rule');
            if (toRule) {
                element.removeAttribute('data-to-rule');
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
            configuration = settings;
        }
        var elements = document.getElementsByTagName(tagName);

        for (var i = 0, length = elements.length; i < length; i++) {
            this.optimizeElement(elements[i], configuration);
        }
    };

}(window.Context = window.Context || {}, null));