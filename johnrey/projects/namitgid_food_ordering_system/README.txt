# Namit Gid Food Delivery Website

## Run it
1. Download and extract `Namit_Gid_Food_Delivery.zip`.
2. Open the extracted folder.
3. Double-click `index.html` to open it in Google Chrome.

You can also open the folder in VS Code and use the Live Server extension.

## Included demo features
- Official Namit Gid logo in the site header, footer, admin portal, and browser tab
- Refreshed responsive storefront styling with featured food photography
- Responsive food delivery landing page and sample menu
- Search and category filters
- Add/remove quantities in a cart
- Checkout with delivery details and payment-method selection
- Order ID generation and customer order tracking
- Sign-up and sign-in demo
- Admin dashboard with order totals and status updates
- Admin demo sign-in: `admin@namitgid.com` / `NamitAdmin2026!`
- Admin menu editor to add foods, edit details, and upload food photos
- Order statuses: Order received, Preparing, Out for delivery, Delivered

## Important
This is a front-end prototype. Demo accounts, menu edits/photos, and orders are stored in the browser's localStorage/sessionStorage. Menu changes are visible only in that browser and do not sync to customer devices. The admin demo credentials are visible in the client-side code and are not secure authentication. It does NOT yet have secure authentication, a real database, live GPS tracking, actual payments, or multi-device notifications. Before launching for real customers, connect a backend (for example Flask + SQLite/PostgreSQL), hash passwords, add server-side role permissions, and integrate a real maps/delivery service. Never store real passwords in browser storage.
