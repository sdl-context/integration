SDL Tridion Contextual Image Delivery JavaScript
================================================


## Overview

This module provides supporting JavaScript to allow users of SDL Tridion to make use of the Contextual Image Delivery
transformation service.

It modifies HTML image elements that include a `data-cid-rule` attribute to be processed by a locally configured image
transformation service. For example, the following image element:

    <img src="http://www.mysite.com/my/image.jpg" data-cid-rule="/scale/200" />

would be modified to:

    <img src="/t/scale/200/http//www.mysite.com/my/image.jpg" />

The module is provided as both a regular JavaScript function, as well as a jQuery object extension.


## Installation and Configuration

To install the module, follow these steps:

1.  Copy the `context-image.min.js` file from the source distribution to a location within your web application.

2.  If you wish to use the jQuery extension, copy the `jquery.context-image.min.js` file from the source distribution to a
location within your web application.

To configure the module, follow these steps:

1.  Add the following script tag to the bottom of your existing script tags within your web page:

        <script type="text/javascript" src="js/context-image.min.js"></script>

2.  If you wish to use the jQuery extension, add the following script tag below the previous tag:

        <script type="text/javascript" src="js/jquery-1.11.0.min.js"></script>
        <script type="text/javascript" src="js/jquery.context-image.min.js"></script>

3.  For a regular JavaScript page, add the following script code below the previous tag:

    	<script type="text/javascript">
        window.onload = function () {
            Context.optimizeElementsByTagName('img');
    	}
        </script>

4.  Alternatively, if you are using jQuery, add the following script code:

	    <script type="text/javascript">
	    $( document ).ready(function() {
    		$('img').optimize();
    	});
        </script>

Once the web page has loaded, the module will rewrite the matching elements according to the following rules:

*   If the element matches an img tag, the src attribute will be resolved to its fully qualified domain name. For
example a src URL of `/my/image.jpg` will be resolved to `http://www.mysite.com/my/image.jpg`

*   The resolved src URL will have the `:` within the protocol removed. For example `http://www.mysite.com` will become
`http//www.mysite.com`

*   The content of the `data-cid-rule` attribute will be prepended to the beginning of the src URL. For example a
`data-cid-rule` of `/scale/100x200` and a src URL of `http//www.mysite.com/my/image.jpg` will become
`/scale/100x200/http//www.mysite.com/my/image.jpg`

*   The transformation handler location will be prepended to the beginning of the src URL. For example, the previous
example will become `/t/scale/100x200/http//www.mysite.com/my/image.jpg`. This location can be customised (see below).

*   The content of the `data-cid-to-rule` attribute will be appended to the end of the src URL. For example with a
`data-cid-to-rule` of `/to/image.gif`, the previous example will become
`/t/scale/100x200/http//www.mysite.com/my/image.jpg/to/image.gif`

*   If a custom visibility style has been specified during configuration, then the element visibility will be set
appropriately (see below).


## Custom configuration

The module supports the following custom configuration settings:

*   To change the location that the image transformation service is running, define the `root` setting when calling the
module. For example for a regular JavaScript page:

    	<script type="text/javascript">
        window.onload = function () {
            Context.optimizeElementsByTagName('img', {root : '/transform'});
    	}
        </script>

    If you are using jQuery, use the following script code:

	    <script type="text/javascript">
	    $( document ).ready(function() {
    		$('img').optimize({root : '/transform'});
    	});
        </script>

*   To force the module to set the visibility style after modifying the image src, define the `visibility` setting when
calling the module. This can be set to any of the CSS accepted values, including `visible`, `hidden`, `initial` and
`inherit`. For example for a regular JavaScript page:

    	<script type="text/javascript">
        window.onload = function () {
            Context.optimizeElementsByTagName('img', {visibility : 'visible'});
    	}
        </script>

    If you are using jQuery, use the following script code:

	    <script type="text/javascript">
	    $( document ).ready(function() {
    		$('img').optimize({visibility : 'visible'});
    	});
        </script>