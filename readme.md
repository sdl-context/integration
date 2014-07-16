SDL Tridion Contextual Web Delivery Integrations
================================================


## Overview

This project contains integration modules which build upon functionality provided by the SDL Tridion Contextual Web
Delivery modules. The following modules are provided:

*   Contextual Image Delivery JavaScript

This module provides supporting JavaScript to allow users of SDL Tridion to make use of the Contextual Image Delivery
transformation service.

*   Contextual Image Optimizer Template Building Block

This module provides a Contextual Image Optimizer Template Building Block (TBB) that allow users of SDL Tridion to make
use of the Contextual Image Delivery transformation service.

## Building from source

### Pre-requisites

Ensure that you have a copy of Maven 3 and Java 1.7 or above on your build machine.

If you wish to build the Tridion TBB:

1.  Ensure you have .NET 4.0 or above installed on your build machine
2.  Ensure that you have a Tridion CME installation on your local machine. This will set the 
    TRIDION_HOME environment variable.

### Build

Run the following command from the top of the context-integrations distribution:

    mvn clean install

If you are on windows, but do not want to build the TBB then build with:

    mvn clean install -P'!dotnet'
    
The build system will create the distribution files within the following folder:

    cwd_integration_distribution\target\cwd_integration_distribution

## Installation and Configuration

Please refer to the individual readme.md files within each module folder for details of installing and configuring the
supplied modules from these distribution artifacts.

# License & Copyright

SDL Tridion Contextual Web Delivery Integrations is released under version 2.0 of the Apache License.
Copyright (c) 2013-2014 SDL Tridion Development Lab B.V.
