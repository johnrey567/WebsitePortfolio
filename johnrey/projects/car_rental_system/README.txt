DriveRent Car Rental Website (Front-end demo)

HOW TO OPEN
1. Extract driverent_website.zip.
2. Open the extracted folder.
3. Double-click index.html. It should open in Chrome.
   If your browser blocks anything, right-click index.html > Open with > Google Chrome.

ADMIN ACCESS
Use the same sign-in form as renters. Sign in with the administrator account below and the site will open the admin dashboard automatically. The admin.html shortcut opens this same sign-in page.
Email: admin@driverent.ph
Password: admin123
Renters use the same sign-in form; choose Sign up to create a renter account.

FEATURES
- Responsive landing page and car catalog
- Customer sign-up and sign-in
- Renter profile editing for contact details, home address, and profile picture
- Admin dashboard
- Car rental booking with pickup/return date and time
- Automatic price estimate based on rental days
- Payment method selection: GCash, Bank Transfer, Cash on Delivery (COD)
- Admin can accept, reject, or complete bookings
- Admin can open a renter record to review the renter-submitted profile photo and contact/address details
- Customer booking history and notifications
- Demo data stored in the browser's localStorage

IMPORTANT LIMITATIONS
This is a front-end prototype for learning/demo use, not a production-ready rental system.
- Accounts and bookings are stored only in the current browser. This is not secure authentication.
- Renter-submitted profile photos and details are not identity-verified; do not rely on this demo alone for vehicle-theft prevention.
- Do not use real or sensitive passwords.
- GCash and bank transfer are selection options only; there is no real payment gateway or payment confirmation.
- To deploy for real customers, add a backend (e.g. Flask + database), secure password hashing, server-side authorization, booking availability checks, and an approved payment provider.
- Car photos use remote Unsplash images and need an internet connection.
