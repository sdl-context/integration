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
using System.Linq;
using System.Text.RegularExpressions;

namespace Tridion.Context.TemplateBuildingBlocks
{
    public class ImageElementOptimizer
    {
        private static string CombineStringBits(string root, string imageSource, string dataRule, string dataToRule,
            string otherHtmlParts1, string otherHtmlParts2, string otherHtmlParts3, string otherHtmlParts4)
        {
            return "<img src=\"" + root + dataRule + Regex.Replace(imageSource, "^(?i:(https?)):/", "/$1") +
                   dataToRule + "\"" + otherHtmlParts1 + otherHtmlParts2 + otherHtmlParts3 + otherHtmlParts4 + "/>";
        }

        /// <summary>
        /// Optimizes image elements, replacing the src attribute with an appropriately formed image transformation rule 
        /// </summary>
        /// <param name="content">The HTML content to optimize</param>
        /// <param name="root">The image optimzer root location</param>
        /// <returns></returns>
        public string OptimizeElements(string content, string root)
        {
            var regex =
                new Regex(
                    "(?<=)<img([^>]+)src=\"([^\"]*)\"(?:([^>]*?)data-cid-rule=\"([^\"]*)\")?(?:([^>]*?)data-cid-to-rule=\"([^\"]*)\")?(?:([^>]*?))/>");
            var matchCollection = regex.Matches(content);
            if (matchCollection.Count <= 0) return content;
            return
                matchCollection.Cast<Match>()
                    .Where(
                        match =>
                            !String.IsNullOrEmpty(match.Groups[4].ToString()) ||
                            !String.IsNullOrEmpty(match.Groups[6].ToString()))
                    .Aggregate(content,
                        (current, match) =>
                            current.Replace(match.Groups[0].ToString(),
                                CombineStringBits(root, match.Groups[2].ToString(), match.Groups[4].ToString(),
                                    match.Groups[6].ToString(), match.Groups[1].ToString(), match.Groups[3].ToString(),
                                    match.Groups[5].ToString(), match.Groups[7].ToString())));
        }
    }
}