/***
 * Contextual Image Delivery JavaScript test suite
 *
 * This script uses Jasmine to perform behaviour driven development testing. See:
 * Jasmine spec script (see http://jasmine.github.io/1.3/introduction.html)
 * Jasmine-jQuery plugin (see https://github.com/velesin/jasmine-jquery/tree/1.7.0)
 *
 * Note that it is not possible to test onload events directly as they will only be fired once
 * the test script has finished running.
 */
describe("Calling the optimize method", function () {

    beforeEach(function () {
        jasmine.getFixtures().fixturesPath = 'spec/fixtures';
        loadFixtures('context-image-fixture.html');
    });

    it("should rewrite the src attributes", function () {

        var transformLocation = "/t";
        Context.optimize();

        // We use getAttribute('src') in order to get the raw string, rather than a parsed URL
        expect(document.getElementById('imageTest1').getAttribute('src')).toBe(transformLocation +
            '/scale/320/source/my/image1.jpg');
        expect(document.getElementById('imageTest2').getAttribute('src')).toBe(transformLocation +
            '/fit/450/source/my/image2.jpg/to/my.gif');
        expect(document.getElementById('imageTest3').getAttribute('src')).toBe(transformLocation +
            '/trim/10/http/www.google.com/my/image3.jpg');
        expect(document.getElementById('imageTest4').getAttribute('src')).toBe('/my/image4.jpg');
    });

    it("should rewrite the src attributes with user settings", function () {

        var transformLocation = "/transform";
        Context.optimize({root: transformLocation});

        expect(document.getElementById('imageTest1').getAttribute('src')).toBe(transformLocation +
            '/scale/320/source/my/image1.jpg');
        expect(document.getElementById('imageTest2').getAttribute('src')).toBe(transformLocation +
            '/fit/450/source/my/image2.jpg/to/my.gif');
        expect(document.getElementById('imageTest3').getAttribute('src')).toBe(transformLocation +
            '/trim/10/http/www.google.com/my/image3.jpg');
        expect(document.getElementById('imageTest4').getAttribute('src')).toBe('/my/image4.jpg');
    });

    it("should not rewrite the src attribute for unsupported element types", function () {

        Context.optimizeElementsByTagName('iframe');
        expect(document.getElementById('iframeTest1').getAttribute('src')).toBe('http://www.google.com/my/image5.jpg');
    });
});

describe("Calling the optimize jQuery function", function () {

    beforeEach(function () {
        jasmine.getFixtures().fixturesPath = 'spec/fixtures';
        loadFixtures('context-image-fixture.html');
    });

    it("should rewrite the src attributes", function () {

        var transformLocation = "/t";
        $('img').optimize();

        expect($('#imageTest1')).toHaveAttr('src', transformLocation + '/scale/320/source/my/image1.jpg');
        expect($('#imageTest2')).toHaveAttr('src', transformLocation + '/fit/450/source/my/image2.jpg/to/my.gif');
        expect($('#imageTest3')).toHaveAttr('src', transformLocation + '/trim/10/http/www.google.com/my/image3.jpg');
        expect($('#imageTest4')).toHaveAttr('src', '/my/image4.jpg');
    });

    it("should rewrite the src attributes with user settings", function () {

        var transformLocation = "/transform";
        $('img').optimize({root: transformLocation});

        expect($('#imageTest1')).toHaveAttr('src', transformLocation + '/scale/320/source/my/image1.jpg');
        expect($('#imageTest2')).toHaveAttr('src', transformLocation + '/fit/450/source/my/image2.jpg/to/my.gif');
        expect($('#imageTest3')).toHaveAttr('src', transformLocation + '/trim/10/http/www.google.com/my/image3.jpg');
        expect($('#imageTest4')).toHaveAttr('src', '/my/image4.jpg');
    });

    it("should not rewrite the src attribute for unsupported element types", function () {

        $('iframe').optimize();
        expect($('#iframeTest1')).toHaveAttr('src', 'http://www.google.com/my/image5.jpg');
    });
});
