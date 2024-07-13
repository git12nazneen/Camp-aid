CampAid - Medical Camp Management System (MCMS)
Welcome to CampAid, a comprehensive Medical Camp Management System developed using the MERN stack. This system assists Organizers and Participants in managing and coordinating medical camps efficiently.

Website Information
Website Name: CampAid
Organizer Username: Jesmin
Password: 123456
Live Site URL: [CampAid Live Site](https://camp-aid.web.app)


Features

1.Responsive Design: Fully responsive for mobile, tablet, and desktop, including the dashboard.

2.Authentication and Authorization: Secure login and registration with JWT authentication and social login options.

3.User Dashboard: Separate dashboards for organizers and participants with specific functionalities.

4.Camp Management: Organizers can add, update, and delete camps. Participants can join and manage their registered camps.

5.Search and Sort: Advanced search and sort functionality for available camps based on various criteria.

6.Participant Registration: Easy registration for camps with a modal form capturing necessary details.

7.Feedback and Ratings: Participants can provide feedback and ratings after attending camps.

8.Analytics: Visual representation of participant data using charts.

9.Payment Integration: Secure payment processing with Stripe integration.



Usage:


**Home Page: 
Features a navbar with logo, home, available camps, and join us buttons. Displays a banner slider, popular camps, and a section to see all camps.

**Camp Details: 

Provides detailed information about each camp, including an option to join the camp.

**Organizer Dashboard: 
Allows organizers to manage their profile, add camps, and manage existing camps and registered participants.

**Participant Dashboard:
 Allows participants to view their profile, registered camps, payment history, and analytics.
Development


Client-Side: 

--  React: Frontend framework.
--  React Router: For handling routing.
--  TanStack Query: For data fetching.
--  React Hook Form: For form management.
--  SweetAlert2: For notifications.
--  Recharts: For data visualization in the analytics section.
--  Tailwind Css
--  Daisy ui
--  Meraki ui



Server-Side:

--  Node.js: Runtime environment.
--  Express.js: Backend framework.
--  MongoDB: Database.
--  JWT: For authentication.



****Client-Side

Initial setup and project structure.
Implemented authentication pages (login and registration).
Added navbar and homepage layout.
Integrated Firebase for authentication.
Implemented TanStack Query for data fetching.
Created camp details page.
Added participant registration modal.
Implemented feedback and ratings feature.
Developed organizer dashboard with profile management.
Implemented add, update, and delete camp functionalities.
Created participant dashboard with analytics.
Integrated Stripe for payment processing.
Implemented search and sort on available camps page.
Added responsive design for mobile, tablet, and desktop.



******Server-Side


Initial setup and project structure.
Configured MongoDB connection.
Implemented user authentication with JWT.
Created camp management endpoints.
Added participant registration logic.
Implemented feedback and ratings API.
Integrated payment processing with Stripe.
Developed organizer profile management.
Implemented camp search and sort endpoints.
Added participant analytics API.
Secured endpoints with JWT middleware.
