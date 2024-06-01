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
- font size css refactoring ✓
- forms select relative/absolute parents height problem
- weird ico in edit feedback
- co ty utils
- css preprocessor ✓

dist/index.html 0.74 kB │ gzip: 0.40 kB
dist/assets/index-BC4ypS7N.css 17.07 kB │ gzip: 3.51 kB
dist/assets/index-Del0qbMt.js 647.74 kB │ gzip: 181.90 kB

(!) Some chunks are larger than 500 kB after minification. Consider:

- Using dynamic import() to code-split the application
- Use build.rollupOptions.output.manualChunks to improve chunking: https://rollupjs.org/configuration-options/#output-manualchunks
- Adjust chunk size limit for this warning via build.chunkSizeWarningLimit.
  ✓ built in 8.13s
