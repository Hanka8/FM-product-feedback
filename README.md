** test mode of database, update security seetings, otherwise 30 days left to testing mode
** key to .env file

* Using URL Parameters and a Custom Hook

For simpler applications or when the data sharing is not very complex, using URL parameters along with a custom hook can be an efficient solution. This approach avoids additional libraries and keeps the code straightforward.
Why Use It:

    Simplicity: Less boilerplate and no additional dependencies.
    Direct Access: Data can be passed directly through the URL and hooks.

    other options: Context API, Redux (state management library)

** with deleting feedback delete also comments!

** rerendering constatntly after adding functions directly to html return code

The useEffect in your useFeedbackDetail hook might indeed be causing re-renders. Specifically, the issue is with feedback being included in the dependency array of useEffect. This causes the effect to run whenever feedback changes, which will set state again, causing a re-render, and potentially leading to an infinite loop.

You should only include dependencies that directly affect the effect. In this case, id is sufficient because you only want to fetch the feedback when the id changes.

Real-time Updates for Comments:
Modify the useComments hook to listen for real-time updates to the comments collection in Firebase. You can achieve this by using Firebase's onSnapshot method instead of getDocs.

? custom hooks encapsulation
