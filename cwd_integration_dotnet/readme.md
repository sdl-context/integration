SDL Tridion Contextual Image Delivery Template Building Block
=============================================================


## Overview

This module provides a Template Building Block (TBB) to allow users of SDL Tridion to make use of the Contextual Image
Delivery transformation service.

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

bq. %TRIDION_HOME%\bin\client\TcmUploadAssembly.exe /targeturl:<Tridion_CME_URL> /username:<admin_user>
    /password:<admn_password> /verbose /folder:<id_of_folder> Tridion.Context.TemplateBuildingBlocks.dll

For example:

bq.  %TRIDION_HOME%\bin\client\TcmUploadAssembly.exe /targeturl:http://my.tridion.site /username:Administrator
    /password:password /verbose /folder:tcm:2-5-2 Tridion.Context.TemplateBuildingBlocks.dll


