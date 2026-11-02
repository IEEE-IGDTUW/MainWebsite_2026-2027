# IEEE main Website

## GitHub Pages deployment

1. In the repository, open **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Push to `main` to run `.github/workflows/deploy.yml`. The workflow builds the
   site using the repository name as its Pages base path and deploys `dist`.
4. Check the **Actions** tab for the deployment result and the Pages settings
   page for the published URL.
