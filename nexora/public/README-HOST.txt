NEXORA on a normal host (cPanel / DirectAdmin) — PHP 7.4+ and MySQL
1) In the hosting panel create a MySQL database + user, give the user full access.
2) Edit api/config.php: DB name/user/password, and JWT_SECRET (any long random text).
3) Upload everything in this folder to public_html (or a sub-folder like public_html/nexora).
4) Open yourdomain.com/index.html — tables are created automatically on the first visit.
