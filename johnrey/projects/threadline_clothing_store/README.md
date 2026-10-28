# THREADLINE Clothing Store — Demo

A responsive clothing-store front end made with plain HTML, CSS, and JavaScript. Open `index.html` in Chrome to try it.

## Features
- Clothing catalog with search and category filters
- Product detail view, size selection, shopping bag and stock checks
- Demo customer registration/sign-in
- Detailed demo checkout with contact details, a structured delivery address, delivery options, and an itemized order total (including shipping)
- Demo checkout that creates order numbers (`TL-1001`, etc.)
- Customer order tracking card with status milestones, estimated delivery, and address/item details
- Customer reviews (only for delivered orders)
- Dark admin dashboard with recent sales, order activity, weekly sales chart, top products, customers, and management views for inventory, orders, and reviews
- Admin product-photo uploads for new products and existing inventory items; photos are resized and shown in the storefront
- Browser-local persistence with `localStorage`

## Try the admin panel
1. Open the site in Chrome.
2. Click **Sign in**.
3. Use email `admin@threadline.test` and password `admin123`.
4. Open **Admin Panel** from the account drawer to view the dashboard and manage products, orders, customers, and reviews.
5. In **Products**, choose **Add photo** to attach an image to an existing item, or upload an optional photo while adding a product. Photos are resized and appear in the storefront. Edit stock/price or change an order's status. To test ratings, create a customer account, place an order, and set its status to **Delivered** in the admin panel.

## Important limitations
This is a front-end prototype for demonstration and learning. It is **not ready for a real public store**:
- Data is stored only in the current browser. It is not shared between customers/admins or devices.
- Product photos are stored in that browser's local storage too, so uploads are not shared across devices and can run into browser storage limits.
- Demo authentication is not secure; sample account passwords are stored in browser storage.
- Checkout does not charge payments, send emails, or create shipping-label integrations. Payment methods are demo selections only; never enter payment credentials.
- Order tracking and estimated delivery dates are demo estimates based on status changes entered in the admin panel, not live courier tracking.

Before launching for real customers, build a backend API and database (for example Node.js/Express + MySQL or PostgreSQL), use hashed passwords and server-side role permissions, validate stock/order transactions on the server, and integrate a trusted payment provider and courier service. Never use the demo credentials on a production site.

Demo shipping is ₱99 for standard delivery (free for orders of ₱2,500 or more) and ₱149 for express delivery. The tracking card estimates delivery five days after order placement. These are prototype values and are not connected to a courier.

## Publish
You can test locally by opening `index.html`. To publish this static demo on GitHub Pages, upload `index.html`, `style.css`, `admin.css`, `script.js`, and `README.md` to a repository and enable GitHub Pages. A real multi-user store requires a backend hosted separately.
