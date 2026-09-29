# School Progress Project Site Builder
This is the codebase that builds the School Progress Project static website.

## Dependencies
* [Eleventy](https://www.11ty.dev/)
    * Page templates are built with [Nunjucks](https://mozilla.github.io/nunjucks/).
    * Page content is stored in Markdown files.
* [Decap CMS](https://decapcms.org/)
    * Allows editing of content in browser.
* [Plotly](https://plotly.com/javascript/)
    * Builds the interactive data visualization.
* [GitHub Pages](https://docs.github.com/en/pages)
    * GitHub automatically builds the site when changes are pushed to the codebase.
    * The new site files are published to GitHub Pages.

## Build Process
* Authenticate into Decap via GitHub.
* Changes are pushed to GitHub repo.
* GitHub automatically builds the site again.
* The new sites files are published to GitHub Pages.

## Tasks
- [ ] Add circle and triangle traces
- [ ] Make input elements active during tour
- [ ] Style top input section
- [ ] Push repo to GitHub