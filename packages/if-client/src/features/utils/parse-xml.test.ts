import { describe, test, expect } from "vitest";
import { parseXML } from "./parse-xml";

describe("parseXML()", () => {
  test("should parse a valid XML", async () => {
    const sampleXML = `<?xml version="1.0" encoding="utf-8"?>
    <!-- generator="Joomla! - Open Source Content Management" -->
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <title>Notícias</title>
        <description><![CDATA[My Example Org]]></description>
        <link>https://example.org/articles</link>
        <lastBuildDate>Thu, 17 Mar 2022 19:35:35 -0400</lastBuildDate>
        <generator>Joomla! - Open Source Content Management</generator>
        <atom:link rel="self" type="application/rss+xml" href="https://example.org/articles?format=feed&amp;type=rss"/>
        <language>pt-br</language>
        <managingEditor>suporte.site@ifro.edu.br (IFRO)</managingEditor>
        <item>
          <title>Some Sample Article</title>
          <link>https://example.org/articles/1</link>
          <guid isPermaLink="true">https://example.org/articles/1</guid>
          <description><![CDATA[<p><img src="https://example.org/articles/1/cover.jpg" /></p><p><a class="jcepopup" dir="ltr" href="https://example.org/articles/1/cover.jpg" type="text/html" data-mediabox="1" data-mediabox-title="Some Sample Article">
          <p>asdfasdfasdf <a href="https://jj.example.org/zzz">Link</a>.</p>]]></description>
          <author>hello@example.org (Example Org Authors)</author>
          <category>Notícias - Ji-Paraná</category>
          <pubDate>Fri, 11 Mar 2022 15:33:29 -0400</pubDate>
        </item>
        <item>
          <title>Another Sample Article</title>
          <link>https://example.org/articles/2</link>
          <guid isPermaLink="true">https://example.org/articles/2</guid>
          <description><![CDATA[<p><img src="https://example.org/articles/2/cover.jpg" /></p><p><a class="jcepopup" dir="ltr" href="https://example.org/articles/2/cover.jpg" type="text/html" data-mediabox="1" data-mediabox-title="Some Sample Article">
          <p>asdfasdfasdf <a href="https://jj.example.org/zzz">Link</a>.</p>]]></description>
          <author>hello@example.org (Example Org Authors)</author>
          <category>Notícias - Ji-Paraná</category>
          <pubDate>Fri, 15 Oct 2021 14:11:14 -0400</pubDate>
        </item>
      </channel>
    </rss>
    `;

    const parsed = await parseXML(sampleXML, { explicitCharkey: true });

    expect(parsed).toEqual({
      rss: {
        $: {
          version: "2.0",
          "xmlns:atom": "http://www.w3.org/2005/Atom",
        },
        channel: {
          title: {
            _: "Notícias",
          },
          description: {
            _: "My Example Org",
          },
          link: {
            _: "https://example.org/articles",
          },
          lastBuildDate: {
            _: "Thu, 17 Mar 2022 19:35:35 -0400",
          },
          generator: {
            _: "Joomla! - Open Source Content Management",
          },
          "atom:link": {
            $: {
              rel: "self",
              type: "application/rss+xml",
              href: "https://example.org/articles?format=feed&type=rss",
            },
          },
          language: {
            _: "pt-br",
          },
          managingEditor: {
            _: "suporte.site@ifro.edu.br (IFRO)",
          },
          item: [
            {
              title: {
                _: "Some Sample Article",
              },
              link: {
                _: "https://example.org/articles/1",
              },
              guid: {
                _: "https://example.org/articles/1",
                $: {
                  isPermaLink: "true",
                },
              },
              description: {
                _: '<p><img src="https://example.org/articles/1/cover.jpg" /></p><p><a class="jcepopup" dir="ltr" href="https://example.org/articles/1/cover.jpg" type="text/html" data-mediabox="1" data-mediabox-title="Some Sample Article">\n          <p>asdfasdfasdf <a href="https://jj.example.org/zzz">Link</a>.</p>',
              },
              author: {
                _: "hello@example.org (Example Org Authors)",
              },
              category: {
                _: "Notícias - Ji-Paraná",
              },
              pubDate: {
                _: "Fri, 11 Mar 2022 15:33:29 -0400",
              },
            },
            {
              title: {
                _: "Another Sample Article",
              },
              link: {
                _: "https://example.org/articles/2",
              },
              guid: {
                _: "https://example.org/articles/2",
                $: {
                  isPermaLink: "true",
                },
              },
              description: {
                _: '<p><img src="https://example.org/articles/2/cover.jpg" /></p><p><a class="jcepopup" dir="ltr" href="https://example.org/articles/2/cover.jpg" type="text/html" data-mediabox="1" data-mediabox-title="Some Sample Article">\n          <p>asdfasdfasdf <a href="https://jj.example.org/zzz">Link</a>.</p>',
              },
              author: {
                _: "hello@example.org (Example Org Authors)",
              },
              category: {
                _: "Notícias - Ji-Paraná",
              },
              pubDate: {
                _: "Fri, 15 Oct 2021 14:11:14 -0400",
              },
            },
          ],
        },
      },
    });
  });

  test("should parse a valid XML", async () => {
    const sampleXML = `<?xml version="1.0" encoding="utf-8"?>
    <!-- generator="Joomla! - Open Source Content Management" -->
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <title>Notícias</title>
        <description><![CDATA[My Example Org]]></description>
        <link>https://example.org/articles</link>
        <lastBuildDate>Thu, 17 Mar 2022 19:35:35 -0400</lastBuildDate>
        <generator>Joomla! - Open Source Content Management</generator>
        <atom:link rel="self" type="application/rss+xml" href="https://example.org/articles?format=feed&amp;type=rss"/>
        <language>pt-br</language>
        <managingEditor>suporte.site@ifro.edu.br (IFRO)</managingEditor>
        <item>
          <title>Some Sample Article</title>
          <link>https://example.org/articles/1</link>
          <guid isPermaLink="true">https://example.org/articles/1</guid>
          <description><![CDATA[<p><img src="https://example.org/articles/1/cover.jpg" /></p><p><a class="jcepopup" dir="ltr" href="https://example.org/articles/1/cover.jpg" type="text/html" data-mediabox="1" data-mediabox-title="Some Sample Article">
          <p>asdfasdfasdf <a href="https://jj.example.org/zzz">Link</a>.</p>]]></description>
          <author>hello@example.org (Example Org Authors)</author>
          <category>Notícias - Ji-Paraná</category>
          <pubDate>Fri, 11 Mar 2022 15:33:29 -0400</pubDate>
        </item>
        <item>
          <title>Another Sample Article</title>
          <link>https://example.org/articles/2</link>
          <guid isPermaLink="true">https://example.org/articles/2</guid>
          <description><![CDATA[<p><img src="https://example.org/articles/2/cover.jpg" /></p><p><a class="jcepopup" dir="ltr" href="https://example.org/articles/2/cover.jpg" type="text/html" data-mediabox="1" data-mediabox-title="Some Sample Article">
          <p>asdfasdfasdf <a href="https://jj.example.org/zzz">Link</a>.</p>]]></description>
          <author>hello@example.org (Example Org Authors)</author>
          <category>Notícias - Ji-Paraná</category>
          <pubDate>Fri, 15 Oct 2021 14:11:14 -0400</pubDate>
        </item>
      </channel>
    </rss>
    `;

    expect(await parseXML(sampleXML, { ignoreAttrs: true })).toEqual({
      rss: {
        channel: {
          title: "Notícias",
          description: "My Example Org",
          link: "https://example.org/articles",
          lastBuildDate: "Thu, 17 Mar 2022 19:35:35 -0400",
          generator: "Joomla! - Open Source Content Management",
          "atom:link": "",
          language: "pt-br",
          managingEditor: "suporte.site@ifro.edu.br (IFRO)",
          item: [
            {
              title: "Some Sample Article",
              link: "https://example.org/articles/1",
              guid: "https://example.org/articles/1",
              description:
                '<p><img src="https://example.org/articles/1/cover.jpg" /></p><p><a class="jcepopup" dir="ltr" href="https://example.org/articles/1/cover.jpg" type="text/html" data-mediabox="1" data-mediabox-title="Some Sample Article">\n          <p>asdfasdfasdf <a href="https://jj.example.org/zzz">Link</a>.</p>',
              author: "hello@example.org (Example Org Authors)",
              category: "Notícias - Ji-Paraná",
              pubDate: "Fri, 11 Mar 2022 15:33:29 -0400",
            },
            {
              title: "Another Sample Article",
              link: "https://example.org/articles/2",
              guid: "https://example.org/articles/2",
              description:
                '<p><img src="https://example.org/articles/2/cover.jpg" /></p><p><a class="jcepopup" dir="ltr" href="https://example.org/articles/2/cover.jpg" type="text/html" data-mediabox="1" data-mediabox-title="Some Sample Article">\n          <p>asdfasdfasdf <a href="https://jj.example.org/zzz">Link</a>.</p>',
              author: "hello@example.org (Example Org Authors)",
              category: "Notícias - Ji-Paraná",
              pubDate: "Fri, 15 Oct 2021 14:11:14 -0400",
            },
          ],
        },
      },
    });
  });
});
