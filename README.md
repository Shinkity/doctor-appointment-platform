# Doctor Appointment Platform (Group 19)

Phase 1: frontend (React + JavaScript + Vite). Phase 2: backend (Node, Express, PostgreSQL, Socket.io, Cloudinary, Nodemailer). The frontend still uses sample data until it is connected to the API.

## Run the frontend
    cd frontend
    npm install
    npm run dev

## Run the backend
    cd backend
    npm install
    (create a database named doctor_app, then fill in backend/.env)
    psql -U postgres -d doctor_app -f models/schema.sql
    npm run seed
    npm run dev

## Project rules (checked in every phase)
1. No emoji anywhere.
2. Responsive on phone, tablet, laptop and desktop (media query in src/index.css and the Navbar menu).
3. Clean blue and white design (colour variables at the top of src/index.css).
4. Google font: Nunito Sans (imported in src/index.css).
5. Placeholder images where needed (src/components/Avatar.jsx and the Home hero image). Put real doctor photos in frontend/public/images/doctors and set the photo field in src/data/doctors.js.
6. Icons from react-icons only.
7. JavaScript, not TypeScript.
