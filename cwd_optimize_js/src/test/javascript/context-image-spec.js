/***
 * Jasmine spec script (see http://jasmine.github.io/1.3/introduction.html)
 * Jasmine-jQuery plugin (see https://github.com/velesin/jasmine-jquery/tree/1.7.0)
 */
describe("Calling the optimize method", function () {

    beforeEach(function () {
        jasmine.getFixtures().fixturesPath = 'spec/fixtures';
        loadFixtures('context-image-fixture.html');
    });

    it("should rewrite the src attributes", function () {

        var transformLocation = "/t";
        Context.optimizeElementsByTagName('img');

        // We use getAttribute('src') in order to get the raw string, rather than a parsed URL
        expect(document.getElementById('imageTest1').getAttribute('src')).toBe(transformLocation +
            '/scale/320/source/my/image1.jpg');
        expect(document.getElementById('imageTest2').getAttribute('src')).toBe(transformLocation +
            '/fit/450/source/my/image2.jpg/to/my.gif');
        expect(document.getElementById('imageTest3').getAttribute('src')).toBe(transformLocation +
            '/trim/10/http//www.google.com/my/image3.jpg');
        expect(document.getElementById('imageTest4').getAttribute('src')).toBe('/my/image4.jpg');
    });

    it("should rewrite the src attributes with user settings", function () {

        var transformLocation = "/transform";

        Context.optimizeElementsByTagName('img', {root: transformLocation});

        expect(document.getElementById('imageTest1').getAttribute('src')).toBe(transformLocation +
            '/scale/320/source/my/image1.jpg');
        expect(document.getElementById('imageTest2').getAttribute('src')).toBe(transformLocation +
            '/fit/450/source/my/image2.jpg/to/my.gif');
        expect(document.getElementById('imageTest3').getAttribute('src')).toBe(transformLocation +
            '/trim/10/http//www.google.com/my/image3.jpg');
        expect(document.getElementById('imageTest4').getAttribute('src')).toBe('/my/image4.jpg');
    });

    it("should not set the visibility style by default", function () {

        Context.optimizeElementsByTagName('img');
        expect(document.getElementById('imageTest2').style.visibility).toBe('hidden');
    });

    it("should set the visibility style with user settings", function () {

        Context.optimizeElementsByTagName('img', {visibility: 'visible'});
        expect(document.getElementById('imageTest2').style.visibility).toBe('visible');
    });

    it("should rewrite the src attribute for other supported element types", function () {

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
        expect($('#imageTest3')).toHaveAttr('src', transformLocation + '/trim/10/http//www.google.com/my/image3.jpg');
        expect($('#imageTest4')).toHaveAttr('src', '/my/image4.jpg');
    });

    it("should rewrite the src attributes with user settings", function () {

        var transformLocation = "/transform";

        $('img').optimize({root: transformLocation});

        expect($('#imageTest1')).toHaveAttr('src', transformLocation + '/scale/320/source/my/image1.jpg');
        expect($('#imageTest2')).toHaveAttr('src', transformLocation + '/fit/450/source/my/image2.jpg/to/my.gif');
        expect($('#imageTest3')).toHaveAttr('src', transformLocation + '/trim/10/http//www.google.com/my/image3.jpg');
        expect($('#imageTest4')).toHaveAttr('src', '/my/image4.jpg');
    });

    it("should not set the visibility style by default", function () {

        $('img').optimize();
        expect($('#imageTest2').css('visibility')).toBe('hidden');
    });

    it("should set the visibility style with user settings", function () {

        $('img').optimize({visibility: 'visible'});
        expect($('#imageTest2').css('visibility')).toBe('visible');
    });

    it("should rewrite the src attribute for other supported element types", function () {

        $('iframe').optimize();
        expect($('#iframeTest1')).toHaveAttr('src', 'http://www.google.com/my/image5.jpg');
    });
});
