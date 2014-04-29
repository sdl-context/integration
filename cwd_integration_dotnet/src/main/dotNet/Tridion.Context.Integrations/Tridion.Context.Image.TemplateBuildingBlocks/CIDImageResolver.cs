/**
 * Copyright (c) 2013-2014 SDL Tridion Development Lab B.V.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
﻿using System;
using Tridion.ContentManager.Templating;
using Tridion.ContentManager.Templating.Assembly;

namespace Tridion.Context.Image.TemplateBuildingBlocks
{
    [TcmTemplateTitle("CID Image Resolver TBB")]
    [TcmTemplateParameterSchema("resource:Tridion.Context.Image.TemplateBuildingBlocks.Resources.CIDImageResolverParameters.xsd")]
    public class CidImageResolver : ITemplate, IDisposable
    {
        private readonly TemplatingLogger logger;

        public CidImageResolver()
        {
            logger = TemplatingLogger.GetLogger(GetType());
        }

        public void Transform(Engine engine, Package package)
        {
            // get output item and its contents
            var outputItem = package.GetByName(Package.OutputName);
            if (outputItem == null)
            {
                logger.Error("Output is Null. Exiting!");
                return;
            }
            var parameterRule = package.GetValue("cid-rule");
            if (string.IsNullOrEmpty(parameterRule))
            {
                logger.Warning("CID Root is Null. Using default transformer path '/t'");
                parameterRule = "/t";
            }
            var outputText = outputItem.GetAsString();

            // replace html entities with their original characters
            var cidStringRenderer = new CidStringRenderer();
            outputItem.SetAsString(cidStringRenderer.RenderInput(outputText, parameterRule));
        }

        public void Dispose()
        {
            {
                lock (this)
                {
                    GC.SuppressFinalize(this);
                }
            }
        }
    }
}

