#  Event Platform

A full-stack web application that allows users to browse events, sign up using their Google accounts, and add events directly to their Google Calendar. Staff users can also create, manage, and delete events.

##  Video Walkthrough

Please watch the [video demo](#) for a full walkthrough of the platform’s features.

---

##  Live Demo

 [Visit the Live Site]
(https://frolicking-rabanadas-9ec607.netlify.app/events)

---

## ⚙️ Tech Stack

- **Frontend:** React (Vite) + Tailwind CSS  
- **Backend:** Node.js + Express  
- **Authentication:** JWT-based authentication (stored in `localStorage`)  
- **Database:** MongoDB Atlas with Mongoose  
- **Calendar Integration:** Google Calendar API  
- **External Events API:** Data Thistle  
- **Hosting:**  
  - Frontend: [Netlify](https://www.netlify.com)  
  - Backend: [Render](https://render.com)

---

## Test Accounts

###  User
- **Email:`m.mizamidou@hotmail.com`  
- **Password: `Coding2025`

###  Staff
- **Email: `m.mizamidou@gmail.com`  
- **Password: `Coding2025`

---

##  Local Setup Instructions

1. Clone the Repository
https://github.com/mizamidou/grad-post-programme-projects-standalone.git

2. Install Dependencies
npm install

3. Start the Development Server (Using Vite)
npm run dev

4. Tailwind CSS Configuration
Already configured in tailwind.config.js

PostCSS setup via postcss.config.js

Tailwind imported in index.css or App.css

5. Set Up Environment Variables
Create a .env file and configure the following:
MONGODB_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
DATA_THISTLE_API_KEY=your_api_key

 MVP Features
 Display list of upcoming events

User registration and login

 Sign up for events

 Add events to Google Calendar

 Staff login and event management (create, update, delete)

Fully responsive and accessible UI

User feedback with loading and error states

Publicly hosted frontend and backend
