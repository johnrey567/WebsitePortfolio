# JohnRey Barreda — Portfolio

A responsive personal portfolio built with plain HTML, CSS, and JavaScript. It includes a project showcase, an Excel food-delivery data analysis with a downloadable workbook, certificates, contact details, a resume preview, and the THREADLINE storefront demo. The site uses `portfolio.css` for its visual theme and supports a saved light/dark mode.

## Run locally

Open `index.html` in a browser. No build step or package installation is required. The Google Fonts used by the site need an internet connection; the rest of the site is served from these files.

## Before publishing

- Review the contact details in `index.html`. Anything shown here, including your email, phone number, and resume, will be public.
- Update the project descriptions and certificates so they accurately represent your work. Keep the certificate PNGs and food-delivery workbook alongside `index.html` so the portfolio links work.
- Replace `johnrey-barreda-resume.png` with your updated resume image to refresh the portfolio preview and download.
- The contact form opens the visitor's email application. It does not send or store messages itself.
- THREADLINE is a front-end demo. Its sample sign-in, admin access, checkout, and order tracking are not secure or connected to real services. Do not use real passwords, payment details, or customer information.

## Publish with GitHub Pages

1. Create a GitHub repository for this portfolio and upload the contents of this folder to the repository root.
2. Keep the filenames and folder structure unchanged, including `projects/threadline_clothing_store/`, the certificate PNGs, `food-delivery-data-analysis.xlsx`, `johnrey-barreda-resume.png`, and the CSS and JavaScript files. The site uses relative links so it works at a GitHub Pages project URL.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**, select the `main` branch and `/ (root)`, then save.
5. Wait for the Pages deployment to finish. Open the URL shown in **Settings → Pages** and verify the portfolio and THREADLINE demo links.

GitHub Pages hosts static files only. A real store with shared accounts, inventory, orders, or payments needs a separately hosted backend and secure payment integration.
