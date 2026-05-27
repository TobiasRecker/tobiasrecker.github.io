# Tobias Recker research profile

Quarto + GitHub Pages website for a minimal, academic research profile.

## Local preview

Install Quarto: https://quarto.org/docs/get-started/

```bash
quarto preview
```

## Render locally

```bash
quarto render
```

The rendered website is written to `docs/`.

## Deploy on GitHub Pages

1. Create a repository named `tobiasrecker.github.io` under the GitHub account `TobiasRecker`.
2. Upload or push the contents of this folder.
3. Render the site locally with `quarto render`.
4. Commit and push the updated source files and rendered `docs/` directory.
5. In the repository settings, set GitHub Pages to deploy from a branch:
   - Branch: `main`
   - Folder: `/docs`

## Privacy-oriented choices

- No analytics.
- No cookies.
- Local images and local PDF.
- YouTube videos are only linked through local thumbnails and load after click.
- No external fonts.

## Main files

- `_quarto.yml` - Quarto website configuration
- `index.qmd` - homepage
- `research.qmd` - research profile
- `projects.qmd` - project demonstrators
- `publications.qmd` - selected publications
- `dissertation.qmd` - dissertation page and PDF download
- `styles.css` - custom styling
- `assets/` - images, PDF, BibTeX
