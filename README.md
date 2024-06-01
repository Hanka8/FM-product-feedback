# custom hooks useComments, useFeedbackDetail, useFeedbacks vs handleUpvote function

- custom hooks encapsulates state and side effect logic, making it reusable and keeping the code clean
- can be easily reused across different components

# error handling

# loading components

- easy to use React animations for loading [react-loading](https://www.npmjs.com/package/react-loading)

# CRUD functionality

# localStorage for limiting upvotes

- in spite of my aim on frontend there is no user authentification logic, therefore I chose to use localStorage
- easy to implement, but users can easily bypass it by clearing it
- to prevent multiple uploads I would need to implement server-side logic and possibly more infrastructure

# swipable mobile menu

- [react-swipeable](https://www.npmjs.com/package/react-swipeable)
- simply define swipe handlers using useSwipeable hook 
- then spread the handlers onto the div that needs to be swipeable

//TODOS

- eslint info ✓
- padding over clickable elements ✓
- font size css refactoring
- css preprocessors - change units
- forms select relative/absolute parents height problem
- weird ico in edit feedback
- readme
