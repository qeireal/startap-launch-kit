# Launch audit checks

The same checks and thresholds as StarTap's free SEO and AI-search checkers. Weight is how much a check matters: 4 is critical, 1 is minor.

## Search snippet

| Check | Weight | Pass | Warn | Fail |
| - | - | - | - | - |
| Title tag | 3 | 30–60 characters | Under 30 or over 60 | Missing |
| Title includes the brand | 1 | Brand name appears, such as "Page topic \| Brand" | Brand missing | – |
| Meta description | 2 | 70–160 characters | Under 70 or over 160 | Missing |
| Indexable | 4 | No `noindex` in the robots meta tag or `X-Robots-Tag` header | – | `noindex` on a page meant to rank |
| Canonical URL | 1 | Points to the page itself | Missing, or points to another URL | – |

Check that each important page gets its own title and description, not one copied across the site.

## Content

| Check | Weight | Pass | Warn | Fail |
| - | - | - | - | - |
| One H1 heading | 3 | Exactly one | More than one | None |
| Headings in order | 1 | Starts at H1 and never skips a level going down (H2 → H4 skips H3) | Skips a level | – |
| Subheadings | 1 | At least one H2 | None | – |
| Amount of text in the HTML | 2 | 300+ words | 100–299 | Under 100, or copy rendered only by JavaScript |
| Image alt text | 1 | Every `<img>` has an `alt` attribute (empty `alt=""` is right for decoration) | Some missing | – |
| Internal links | 1 | 3+ links to other pages on the site | Fewer | – |

## Social sharing

| Check | Weight | Pass | Warn | Fail |
| - | - | - | - | - |
| Open Graph | 2 | `og:title`, `og:description` and `og:image` all set | Some missing | All missing |
| `og:image` | – | Absolute `https://` URL, 1200×630, file exists | Relative URL or wrong size | Points to a missing file |
| X card | 1 | `twitter:card` set, usually `summary_large_image` | Missing | – |
| Structured data | 2 | Valid JSON-LD, such as `Organization` and `WebSite` on the homepage, `SoftwareApplication` or `Product` for the product | None | A JSON-LD block that doesn't parse |

## Technical

| Check | Weight | Pass | Warn | Fail |
| - | - | - | - | - |
| HTTPS | 3 | Canonical and `og:url` use `https://` | – | `http://` |
| Mobile viewport | 3 | `<meta name="viewport" content="width=device-width, initial-scale=1">` | – | Missing |
| robots.txt | 1 | Served at `/robots.txt` and doesn't block pages meant to rank | Missing | Blocks the whole site (`Disallow: /` for `*`) |
| XML sitemap | 1 | Listed in robots.txt or at `/sitemap.xml`, with only live, indexable, canonical URLs | Missing, or misses important pages | – |
| Language | 1 | `<html lang="…">` | Missing | – |
| Favicon | 1 | `<link rel="icon">`, plus an `apple-touch-icon` | Missing | – |
| 404 page | – | Custom page that returns HTTP 404 | Missing, or returns 200 | – |

## AI search (GEO)

| Check | Weight | Pass | Warn | Fail |
| - | - | - | - | - |
| AI search bots allowed | 4 | robots.txt allows every "Search" bot in StarTap's AI crawler list (see the skill) | – | Any search bot blocked |
| AI training bots | info | Report which are blocked. This is a licensing choice, not an error. | – | – |
| Readable without JavaScript | 4 | Main copy is in the server-rendered or prerendered HTML | – | Empty shell until JavaScript runs |
| AI answers may quote the page | 2 | No `nosnippet` and no low `max-snippet` | – | `nosnippet` set |
| Organization or product schema | 3 | `Organization` plus `SoftwareApplication` or `Product` JSON-LD | Only one | None |
| Profiles linked | 2 | `Organization.sameAs` lists the official social and company profiles, also linked in the footer | Missing | – |
| Opening text | 3 | The first sentences say what it is, who it's for and the main benefit | Vague or only a slogan | – |
| Answers real questions | 2 | An FAQ section with real customer questions as headings, plus `FAQPage` schema | – | – |
| Citable facts | 2 | Pricing on the page or a linked `/pricing`, concrete numbers, a visible "Updated" date | – | – |
| llms.txt | 0.5 | `/llms.txt` with a `#` title, a `>` one-line summary and links to key pages | Missing (low impact) | – |
