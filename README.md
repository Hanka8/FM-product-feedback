# custom hooks useComments, useFeedbackDetail, useFeedbacks vs handleUpvote function
- custom hooks encapsulates state and side effect logic, making it reusable and keeping the code clean
- can be easily reused across different components

# loading components
- easy to use React animations for loading [react-loading](https://www.npmjs.com/package/react-loading)

# CRUD functionality

# localStorage for limiting upvotes
- in spite of my aim on frontend there is no user authentification logic, therefore I chose to use localStorage
- easy to implement, but users can easily bypass it by clearing it
- to prevent multiple uploads I would need to implement server-side logic and possibly more infrastructure