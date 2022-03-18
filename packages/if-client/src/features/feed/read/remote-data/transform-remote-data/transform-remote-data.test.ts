import { transformRemoteData } from "./transform-remote-data";
import { describe, test, expect } from "vitest";

describe("transformRemoteData()", () => {
  test("should transform a valid remote data", () => {
    expect(
      transformRemoteData({
        rss: {
          channel: {
            title: "Notícias",
            description: "My Example Org",
            link: "https://example.org/articles",
            lastBuildDate: "Thu, 17 Mar 2022 19:35:35 -0400",
            generator: "Joomla! - Open Source Content Management",
            language: "pt-br",
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
      })
    ).toEqual({
      title: "Notícias",
      description: "My Example Org",
      link: "https://example.org/articles",
      lastBuildDate: 1647560135000,
      generator: "Joomla! - Open Source Content Management",
      language: "pt-br",
      items: [
        {
          title: "Some Sample Article",
          link: "https://example.org/articles/1",
          guid: "https://example.org/articles/1",
          description:
            '<p><img src="https://example.org/articles/1/cover.jpg" /></p><p><a class="jcepopup" dir="ltr" href="https://example.org/articles/1/cover.jpg" type="text/html" data-mediabox="1" data-mediabox-title="Some Sample Article">\n          <p>asdfasdfasdf <a href="https://jj.example.org/zzz">Link</a>.</p>',
          author: "hello@example.org (Example Org Authors)",
          category: ["Notícias - Ji-Paraná"],
          pubDate: 1647027209000,
        },
        {
          title: "Another Sample Article",
          link: "https://example.org/articles/2",
          guid: "https://example.org/articles/2",
          description:
            '<p><img src="https://example.org/articles/2/cover.jpg" /></p><p><a class="jcepopup" dir="ltr" href="https://example.org/articles/2/cover.jpg" type="text/html" data-mediabox="1" data-mediabox-title="Some Sample Article">\n          <p>asdfasdfasdf <a href="https://jj.example.org/zzz">Link</a>.</p>',
          author: "hello@example.org (Example Org Authors)",
          category: ["Notícias - Ji-Paraná"],
          pubDate: 1634321474000,
        },
      ],
    });
  });
});
