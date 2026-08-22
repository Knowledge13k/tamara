# Tamara

**Tamara** is a custom dashboard concept for exploring representation, leadership pathways, public visibility, technical influence, and ecosystem reach among prominent women in technology.

## What this prototype includes

- Executive-style dashboard landing page
- Segment filter: Black women / other women / all women
- KPI cards and illustrative comparison visualizations
- Leader directory with search
- Representation comparison table
- Leadership-pipeline concept view
- Responsive, dependency-light front end

## Data ethics / prototype notice

The public-figure names in the sample dataset are real. The numeric scores, percentages, rankings, visibility measures, and trend-style metrics are **mock data created solely for interface prototyping**. They should not be presented as factual measures of an individual's success or capability.

The product is designed to compare representation patterns and career-path signals, not to imply that race determines achievement, aptitude, or potential.

## Run locally

Because the project is plain HTML/CSS/JavaScript, you can open `index.html` directly in a browser.

For a local server:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## Suggested next version

1. Convert to Next.js + TypeScript.
2. Add a sourced public-data ingestion layer.
3. Add profile detail pages with citations and source provenance.
4. Add an emerging-leaders pipeline and mentorship graph.
5. Add AI-assisted natural-language exploration, e.g. "Show Black women AI founders with research backgrounds."
6. Add an admin panel for taxonomy, scoring-model configuration, and source review.

## Files

- `index.html` — application shell
- `styles.css` — visual system and responsive layout
- `data.js` — illustrative cohort data
- `app.js` — filtering, rendering, charts, and interaction
