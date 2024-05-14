import { Route, Routes } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Landing from './Landing';
import AddFeedbackForm from './AddFeedbackForm';
import FeedbackDetail from './FeedbackDetail';
 
 function AnimatedRoutes():JSX.Element {

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
          <Route 
            path='/' 
            element={<Landing />} />
          <Route 
            path={'/addfeedback'} 
            element={<AddFeedbackForm />} />
          <Route
            path={'/:id'}
            element={<FeedbackDetail />} 
            />
      </Routes>
    </AnimatePresence>
  )
}

export default AnimatedRoutes;