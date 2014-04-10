/**
 *   jQuery object extensions to support image optimization
 */
(function ($) {

    /**
     * Optimize elements
     * @param settings custom user settings
     * @returns {*}
     */
    $.fn.optimize = function (settings) {
        var configuration = {
            'root': '/t'
        };
        if (settings) {
            $.extend(configuration, settings);
        }
        return this.each(function () {
            Context.optimizeElement(this, configuration);
        });
    };
})(jQuery);