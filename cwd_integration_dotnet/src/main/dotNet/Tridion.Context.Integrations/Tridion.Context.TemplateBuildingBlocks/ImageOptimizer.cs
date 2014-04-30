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

namespace Tridion.Context.TemplateBuildingBlocks
{
    [TcmTemplateTitle("Enable Contextual Image Optimizer")]
    [TcmTemplateParameterSchema("resource:Tridion.Context.TemplateBuildingBlocks.Resources.ImageOptimizerParameters.xsd")]
    public class ImageOptimizer : ITemplate, IDisposable
    {
        private readonly TemplatingLogger logger;

        public ImageOptimizer()
        {
            logger = TemplatingLogger.GetLogger(GetType());
        }

        public void Transform(Engine engine, Package package)
        {
            // get output item and its contents
            var outputItem = package.GetByName(Package.OutputName);
            if (outputItem == null)
            {
                logger.Error("Output is empty");
                return;
            }
            var parameterRoot = package.GetValue("cid-root");
            if (string.IsNullOrEmpty(parameterRoot))
            {
                logger.Warning("Root location is empty. Using default location of '/t'");
                parameterRoot = "/t";
            }
            var outputText = outputItem.GetAsString();

            var imageElementOptimizer = new ImageElementOptimizer();
            outputItem.SetAsString(imageElementOptimizer.OptimizeElements(outputText, parameterRoot));
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

