import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Landing from "./Landing/Landing";
import AddFeedbackForm from "./forms/AddFeedbackForm";
import FeedbackDetail from "./FeedbackDetail/FeedbackDetail";
import EditFeedback from "./forms/EditFeedbackForm";
import Roadmap from "./Roadmap/Roadmap";

function AnimatedRoutes(): JSX.Element {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Landing />} />
        <Route path={"/addfeedback"} element={<AddFeedbackForm />} />
        <Route path="/:id" element={<FeedbackDetail />} />
        <Route path={"/:id/editfeedback"} element={<EditFeedback />} />
        <Route path={"/roadmap"} element={<Roadmap />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
