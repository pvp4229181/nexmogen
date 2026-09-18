# Lottie sources

Pristine, as-downloaded stock animations. They are light-theme artwork (white
panels, blue accents) and are **not** served — `public/animations/` holds the
brand-recoloured builds that the site actually loads.

The recolour pass is not idempotent, so always rebuild from the files here:

    npm run animations
