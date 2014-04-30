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
﻿using NUnit.Framework;

namespace Tridion.Context.TemplateBuildingBlocks.Tests
{
    [TestFixture]
    public class ImageElementOptimizerTest
    {
        private ImageElementOptimizer imageElementOptimizer;

        private const string LongHtmlString =
            "<span><tcdl:eval expression=\"browser.displayWidth\"/></span><br/>" +
            "<span><tcdl:eval expression=\"ui.bannerImageWidth\"/></span><br/>" + "This String is Modified by TBB" +
            " <img src=\"/Preview/besttech/multimedia/Electronics%20Store%201.jpg\" " +
            "usemap=\"#bannerlink\" style=\"display:block; visibility:visible;\" data-cid-rule=\"/scale/<tcdl:eval expression='ui.bannerImageWidth'/>/source\"/> This String is Modified by TBB"
            + "<span><tcdl:eval expression=\"ui.bannerImageWidth\"/></span>";

        private const string TwoImageHtmlString =
            "<img src=\"/multimedia/image.jpg\" data-id=\"1\" data-cid-rule=\"/scale/<tcdl:eval expression='ui.bannerImageWidth'/>/source\" class=\"test\" />"
            + " Someother Stuff here" +
            " <img src=\"/multimedia/image2.jpg\" data-cid-rule=\"/scale/<tcdl:eval expression='ui.bannerImageWidth'/>/source\"/>";

        private const string TwoRuleHtmlString =
            "<img src=\"/multimedia/image.jpg\" data-cid-rule=\"/scale/<tcdl:eval expression='ui.bannerImageWidth'/>/source\" data-cid-to-rule=\"/to/myimage.gif\" class=\"test\" />";

        private const string NoRuleHtmlString =
            "<img src=\"tcm:4-139\" tridion:href=\"tcm:4-139\" tridion:type=\"Multimedia\" tridion:targetattribute=\"src\" tridion:type=\"Multimedia\" alt=\"Untitled\"/>";

        private const string OnlyDataToRuleString =
           "<img src=\"/Images/a5f5ec.jpg\"  alt=\"a5f5ec\" data-cid-to-rule=\"/to/png\" />";

        private const string AbsoluteUrlRuleString =
            "<img src=\"http://www.mysite.com/Images/a5f5ec.jpg\" data-cid-rule=\"/scale/<tcdl:eval expression='ui.bannerImageWidth'/>\" />";

        [TestFixtureSetUp]
        public void TestFixtureSetup()
        {
            imageElementOptimizer = new ImageElementOptimizer();
        }

        [Test]
        public void LongHtmlTest()
        {
            StringAssert.Contains(
                "<img src=\"/t/scale/<tcdl:eval expression='ui.bannerImageWidth'/>/source/Preview/besttech/multimedia/Electronics%20Store%201.jpg\"  usemap",
                imageElementOptimizer.OptimizeElements(LongHtmlString, "/t"));
        }

        [Test]
        public void MultipleImageTest()
        {
            StringAssert.Contains(
                "<img src=\"/t/scale/<tcdl:eval expression='ui.bannerImageWidth'/>/source/multimedia/image.jpg\"  data-id=\"1\"  class=\"test\"",
                imageElementOptimizer.OptimizeElements(TwoImageHtmlString, "/t"));

            StringAssert.Contains(
                "<img src=\"/t/scale/<tcdl:eval expression='ui.bannerImageWidth'/>/source/multimedia/image2.jpg\"  />",
                imageElementOptimizer.OptimizeElements(TwoImageHtmlString, "/t"));
        }

        [Test]
        public void MultipleRuleTest()
        {
            StringAssert.Contains(
                "<img src=\"/t/scale/<tcdl:eval expression='ui.bannerImageWidth'/>/source/multimedia/image.jpg/to/myimage.gif\"    class=\"test\"",
                imageElementOptimizer.OptimizeElements(TwoRuleHtmlString, "/t"));
        }

        [Test]
        public void AlternateRootTest()
        {
            StringAssert.Contains(
                "<img src=\"http://my.site.com/transform/scale/<tcdl:eval expression='ui.bannerImageWidth'/>/source/multimedia/image.jpg/to/myimage.gif\"    class=\"test\"",
                imageElementOptimizer.OptimizeElements(TwoRuleHtmlString, "http://my.site.com/transform"));
        }

        [Test]
        public void NoRuleTest()
        {
            StringAssert.Contains("<img src=\"tcm:4-139\" tridion:href=\"tcm:4-139\" ",
                imageElementOptimizer.OptimizeElements(NoRuleHtmlString, "K"));
        }

        [Test]
        public void OnlyDataToRuleTest()
        {
            StringAssert.Contains("<img src=\"/t/Images/a5f5ec.jpg/to/png\"",
                imageElementOptimizer.OptimizeElements(OnlyDataToRuleString, "/t"));
        }

        [Test]
        public void AbsoluteUrlRuleTest()
        {
            StringAssert.Contains("<img src=\"/t/scale/<tcdl:eval expression='ui.bannerImageWidth'/>/http/www.mysite.com/Images/a5f5ec.jpg\"",
                imageElementOptimizer.OptimizeElements(AbsoluteUrlRuleString, "/t"));
        }
    }
}