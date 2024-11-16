# LearnLingo

## About the Project
**LearnLingo** is an online platform for finding and connecting with language tutors. The app allows users to browse through a variety of language teachers, filter them based on language, student knowledge level, and lesson price, and save favorite teachers for easy access. This project aims to provide a user-friendly interface and functionality for users to explore and select language teachers according to their preferences.

The application consists of three main pages:
- **Home Page** - Highlights the benefits of using LearnLingo and includes a call-to-action link that redirects users to the Teachers page.
- **Teachers Page** - Displays a list of available language teachers with options to filter by language, student level, and price per hour.
- **Favorites Page** - A private page accessible to logged-in users, showcasing a list of teachers the user has marked as favorites.

## Technologies Used
- **React** - For building the user interface
- **Redux** - For managing global state
- **Firebase** - Used for authentication and Realtime Database
- **React Router** - For client-side routing
- **React Hook Form & Yup** - For form handling and validation
- **CSS Modules** - For styling components

## Features

1. **User Authentication**  
   Implemented with Firebase for user registration, login, and logout functionality. Users can access private features, such as the Favorites page, only after logging in.

2. **Teacher Management**  
   The Teachers page displays a list of language teachers, each with detailed information such as name, languages spoken, knowledge levels, ratings, and hourly price. Users can load more teacher profiles dynamically.

3. **Filtering Options**  
   Users can filter teachers based on:
   - **Language** - Select the language(s) the teacher speaks.
   - **Knowledge Level** - Choose the student level(s) the teacher works with.
   - **Price per Hour** - Filter teachers based on their hourly rates.

4. **Favorites Functionality**  
   - Logged-in users can add teachers to their favorites by clicking on a heart icon. The favorites are stored in the Firebase database.
   - When a teacher is added to favorites, the heart icon changes color, indicating it has been saved.
   - Users can remove teachers from favorites by clicking on the heart icon again, which reverts it to its original state.

5. **Persistent State**  
   - Both filters and favorites are stored in the Firebase database, ensuring that selections are retained even after a page refresh.

6. **Teacher Card Details**  
   - Each teacher's card includes their experience, lesson info, and conditions.
   - Users can click "Read more" to view extended details and student reviews.

7. **Trial Lesson Booking**  
   - Users can book a trial lesson with a teacher by clicking the "Book trial lesson" button, which opens a modal form.
   - The booking form includes required fields validated with `react-hook-form` and `yup`.

8. **Favorites Page**  
   - A private page where users can view all the teachers they have marked as favorites.
   - The layout and styling are consistent with the Teachers page, providing a familiar user experience.

9. **Real-time Feedback and Error Handling**  
   - Error messages and success notifications are displayed using `react-hot-toast`.
   - Unauthorized actions, such as attempting to add to favorites without logging in, prompt users to log in.

## Getting Started

### Prerequisites
- Node.js
- Firebase account (for setting up Firebase Authentication and Realtime Database)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/MaksymMykhailets/LearnLingo.git
