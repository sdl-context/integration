SDL Tridion Contextual Image Delivery Template Building Block
=============================================================


## Overview

This module provides a Template Building Block (TBB) to allow users of SDL Tridion to make use of the Contextual Image
Delivery transformation service.

It modifies HTML image elements that include a `data-cid-rule` attribute to be processed by a locally configured image
transformation service. For example, the following image element:

    <img src="http://www.mysite.com/my/image.jpg" data-cid-rule="/scale/200" />

would be modified to:

    <img src="/t/scale/200/http/www.mysite.com/my/image.jpg" />

The module is provided as a .NET assembly which can be uploaded into SDL Tridion.

## Installation and Configuration

To install the Template Building Block, follow these steps:

1.  Copy the `Tridion.Context.Image.TemplateBuildingBlocks.dll` file from the XXX folder within the distribution to a
location on your computer.

2.  Upload the assembly into SDL Tridion using the following command:

bq. C:\Tridion\bin\client\TcmUploadAssembly.exe /targeturl:http://my.tridion.site /username:Administrator
    /password:xxxxx /verbose /uploadpdb:true /folder:<id_of_folder> Tridion.Context.Image.TemplateBuildingBlocks.dll

