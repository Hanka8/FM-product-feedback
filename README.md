# Product feedback app

## Table of contents

- [Overview](#overview)
  - [Screenshot](#screenshot)
  - [Link](#link)
- [How to run the app](#how-to-run-the-app)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Useful resources](#useful-resources)
- [Author](#author)


## Overview

The Product Feedback App provides a platform for collecting, managing, and engaging with user feedback. It allows users to submit, edit, and vote on feedback, as well as comment on suggestions. With built-in filtering and sorting functionality, users can easily navigate through feedback items based on their preferences. The app's real-time updates and responsive design ensure a seamless experience across devices.

Key features:
- Submit & Edit Feedback: Users can contribute by adding new feedback or editing their previous submissions to refine their ideas.
- Upvote & Downvote System: Engage with feedback through a simple voting mechanism.
- Real-Time Data Sync: Powered by Firebase, the app ensures feedback and comments are instantly updated across all users.
- Interactive Filtering & Sorting: Quickly browse feedback by categories or sort by the number of votes or comments.
- Commenting System: Participate in discussions by leaving comments on feedback items to offer further insights or support (maximum 250 characters )
- Roadmap Display: Visualize the progress of various feedback items with a roadmap view that categorizes suggestions based on their status.
- Seamless Navigation: Smoothly navigate through the app using React Router and Framer Motion library with smooth transitions.

### Screenshot

![](./screenshot.png)

### Link

- Live Site URL: [feedback-dashboard.netlify.app](https://www.fm-feedback.netlify.app/)

## How to run the app

Follow these steps to set up and run the project locally on your machine:

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14.x or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**

   `git clone git@github.com:Hanka8/FM-product-feedback.git`

2. **Navigate into the project directory:**
   
   `cd FM-product-feedback`

3. **Install the dependencies:**
   
   using npm:
  `npm install`

   using yarn:
   `yarn install`

### Running the app

1. **Start the development server:**

   `npm run dev`

2. **Open the app in your browser:**

   The application should be running at http://localhost:5173 (or another port if specified by Vite). You can open this URL in your browser to view the app.

### Firebase configuration:

Make sure to set up your Firebase project and configure the app with your Firebase credentials. This can be done by adding your Firebase configuration in a .env file.

```
VITE_API_KEY
VITE_AUTH_DOMAIN
VITE_PROJECT_ID
VITE_STORAGE_BUCKET
VITE_MESSAGING_SENDER_ID
VITE_APP_ID
VITE_MEASUREMENT_ID
```

## My process

### Built with

- [React](https://reactjs.org/)
- [Firebase](https://firebase.google.com/) - for data storage and CRUD functionality
- [TypeScript](https://www.typescriptlang.org/) - for type safety, improving code quality and maintainability
- [React Router](https://reactrouter.com/en/main) - for handling navigation and routing within the application.
- [React Loading](https://www.npmjs.com/package/react-loading) - to improve the user experience by visually indicating that the application is in the process of fetching data
- [Framer Motion](https://www.framer.com/motion/) - for a more dynamic user interface by creating smooth transitions
- [react-swipeable](https://www.npmjs.com/package/react-swipeable) - for defining swipe handlers using useSwipeable hook
- [Vite](https://vitejs.dev/) - for the build
- Git and GitHub - for version control
- custom CSS and PostCSS - to convert px values to rem for better accesibility

### What I learned

- **General Skills**

  - React:
    - Functional Components: Practiced building the application using functional components, which promote cleaner and more maintainable code.
    - State Management: Gained experience in managing state within components using hooks like useState and useEffect.
    - Props and Data Flow: Enhanced understanding of how to pass data between components using props, ensuring effective communication between different parts of the application.
    - Handling asynchronous operations and implementing loading states.
  - TypeScript:
    - Static Typing: Learned to leverage TypeScript for static typing, which helps catch errors at compile time and improves code reliability.
    - Interfaces and Types: Defined and utilized interfaces and types to describe data structures and function signatures, enhancing code clarity and maintenance.

- **Specific Skills**

  - Firebase Integration:
    Realtime Database: Integrated the application with Firebase to enable real-time data fetching and synchronization, ensuring the UI stays up-to-date with the latest data.
  - Filtering and Sorting Logic:
    Data Manipulation: Implemented logic to filter and sort feedback items based on various criteria, improving the usability and functionality of the application.
    useMemo Hook: Learned to use the useMemo hook to memoize expensive calculations and avoid unnecessary recalculations, optimizing performance even though it might not be critical for an app of this size.
  - localStorage:
    In spite of my aim on frontend there is no user authentification logic, therefore I chose to use localStorage. Its just for learning purposes, because its easy for users to bypass it.
  - state management with useReducer:
    Refactored State Management: Replaced useState with useReducer to manage form state more effectively. This refactor centralizes state management and makes state transitions more predictable and easier to debug.
    Reducer Function: Implemented a formReducer function to handle state updates based on dispatched actions, improving the separation of concerns and making the state management more explicit.

### Useful resources

Next time, I would use these tools:

- [Tanstack Query](https://tanstack.com/) easier approach for handling loading states while fetching data etc.
- [class-names](https://github.com/JedWatson/classnames) for conditionally joining classNames together
- [React Hook Form](https://react-hook-form.com/) performant, flexible and extensible forms with easy-to-use validation

## Author

- This is a solution to the [Product feedback app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/product-feedback-app-wbvUYqjR6)
- Website - [Hana Maruškevičová](hanamarus.cz)
