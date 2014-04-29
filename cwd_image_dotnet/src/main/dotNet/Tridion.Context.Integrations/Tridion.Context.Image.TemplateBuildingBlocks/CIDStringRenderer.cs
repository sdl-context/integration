using System;
using System.Linq;
using System.Text.RegularExpressions;

namespace Tridion.Context.Image.TemplateBuildingBlocks
{
    public class CidStringRenderer
    {
        private string CombineStringBits(string rule, string imageSource, string dataCidRule, string dataToRule,
            string otherHtmlParts1, string otherHtmlParts2, string otherHtmlParts3, string otherHtmlParts4)
        {
            return "<img src=\"" + rule + dataCidRule + Regex.Replace(imageSource, "^(?i:(https?)):/", "/$1") +
                   dataToRule + "\"" +
                   otherHtmlParts1 + otherHtmlParts2 + otherHtmlParts3 + otherHtmlParts4 + "/>";
        }

        public string RenderInput(string content, string rule)
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
                                CombineStringBits(rule, match.Groups[2].ToString(), match.Groups[4].ToString(),
                                    match.Groups[6].ToString(), match.Groups[1].ToString(), match.Groups[3].ToString(),
                                    match.Groups[5].ToString(), match.Groups[7].ToString())));
        }
    }
}