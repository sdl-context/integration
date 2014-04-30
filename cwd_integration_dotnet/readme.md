SDL Tridion Contextual Image Optimizer Template Building Block
==============================================================


## Overview

This module provides a Contextual Image Optimizer Template Building Block (TBB) that allow users of SDL Tridion to make
use of the Contextual Image Delivery transformation service.

It modifies HTML image elements that include a `data-cid-rule` attribute to be processed by a locally configured image
transformation service. For example, the following image element:

    <img src="http://www.mysite.com/my/image.jpg" data-cid-rule="/scale/<tcdl:eval expression='browser.displayWidth'/>" />

would be modified to:

    <img src="/t/scale/<tcdl:eval expression='browser.displayWidth'/>/http/www.mysite.com/my/image.jpg" />

The module is provided as a .NET assembly which can be uploaded into SDL Tridion.


## Installation and Configuration

To install the Template Building Block, follow these steps:

1.  Copy the `Tridion.Context.TemplateBuildingBlocks.dll` file from the `context-integration-dotnet` folder within
the distribution to a location on your computer.

2.  Upload the assembly into SDL Tridion using the following command:

        %TRIDION_HOME%\bin\client\TcmUploadAssembly.exe /targeturl:<Tridion_CME_URL> /username:<admin_user>
        /password:<admn_password> /verbose /folder:<TCM_ID_folder> Tridion.Context.TemplateBuildingBlocks.dll

    For example:

        %TRIDION_HOME%\bin\client\TcmUploadAssembly.exe /targeturl:http://my.tridion.site /username:Administrator
        /password:password /verbose /folder:tcm:2-5-2 Tridion.Context.TemplateBuildingBlocks.dll

This will create a new Template Building Block and associated Schema named `Enable Contextual Image Optimizer` within
the folder specified above.


## Using the image optimizer

You can use the image optimizer within any compound template. To use the image optimizer, follow these steps:

1.  Open the SDL Tridion Template Builder.

2.  Open an existing compound template.

3.  Drag the `Enable Contextual Image Optimizer` template building block into your template at the desired position
(typically after the `Default Finish Actions` block).

4.  Define the root location of the Contextual Image Delivery image transformation service (by default `/t`).

5.  Save your template.

The Contextual Image Optimizer will rewrite the matching elements according to the following rules:

*   The optimizer checks that it is working against an `img` element and that a `data-cid-rule` attribute and/or a
`data-cid-to-rule` attribute have been specified. The current version does not support optimization of any other
elements.

*   If the src URL is absolute, it will have the `:/` within the URL removed. For example `http://www.mysite.com` will
become `http/www.mysite.com`.

*   The content of the `data-cid-rule` attribute will be prepended to the beginning of the src URL. For example a
`data-cid-rule` of `/scale/100x200` and a src URL of `http://www.mysite.com/my/image.jpg` will become
`/scale/100x200/http/www.mysite.com/my/image.jpg`.

*   The root location will be prepended to the beginning of the src URL. For example, the previous
example will become `/t/scale/100x200/http/www.mysite.com/my/image.jpg`. This location can be customised by modifying
the Image Optimizer Root Location parameter - this includes passing in a remote server address. For example, if the
location is set to `http://my.transform.server/transform` then the example will become
`http://my.transform.server/transform/scale/100x200/http/www.mysite.com/my/image.jpg`.

*   The content of the `data-cid-to-rule` attribute will be appended to the end of the src URL. For example with a
`data-cid-to-rule` of `/to/image.gif`, the previous example will become
`/t/scale/100x200/http/www.mysite.com/my/image.jpg/to/image.gif`. Note that, when used, the `data-cid-to-rule` must
appear after the `data-cid-rule` attribute.

If you are using relative URLs for your images, it is necessary to include a Contextual Image Delivery source mapping
at the end of your `data-cid-rule`, together with an appropriate configuration within the Contextual Image Delivery
module. For example:

    <img src="/multimedia/image2.jpg" data-cid-rule="/scale/<tcdl:eval expression='ui.bannerImageWidth'/>/source"/>


## Building from source

To build the Contextual Web Delivery Integrations from source, follow these steps:

1.  Ensure you have .NET 4.0 or above installed on your build machine
2.  Ensure that you have a Tridion CME installation on your local machine. This will set the TRIDION_HOME environment
variable.
3.  Ensure that you have a copy of Maven 3 and Java 1.7 or above on your build machine
4.  Run the following command from the top of the context-integrations distribution:

        mvn clean install

The build system will create the distribution files within the following folder:

    cwd_integration_distribution\target\cwd_integration_distribution



