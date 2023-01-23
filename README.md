# Dev Recruiter Site
An app that uses a MySQL database to keep track of developers that are looking for a job.

## Features
- Login and register system with email verification (sends an email with a code), and security against SQL injections. Also utilizes Regex to check for valid emails, passwords, and usernames.
- Developers can edit their accounts' properties such as a list of their skills, and upload their resume as a PDF file.
- Recruiters can sort developers by tagging specific skills, and search for certain developers by name.
- Recruiters can quickly contact developers by simply clicking a button next to their name on the database. Developers that have been contacted will receive a notification email. 

## Used Technologies
- ReactJS for frontend
- ExpressJS and NodeJS for building REST
- NodeMailer for sending emails
- Multer for uploading PDF files
- Novu for notifications
