import { Route, Routes } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Landing from './Landing';
import AddFeedbackForm from './AddFeedbackForm';
 
 function AnimatedRoutes():JSX.Element {

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
          <Route 
            path='/' 
            element={<Landing />} />
          <Route 
            path={'/:addfeedback'} 
            element={<AddFeedbackForm />} />
      </Routes>
    </AnimatePresence>
  )
}

export default AnimatedRoutes;