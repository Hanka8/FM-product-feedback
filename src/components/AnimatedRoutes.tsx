import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Landing from "./Landing/Landing";
import AddFeedbackForm from "./forms/AddFeedbackForm";
import FeedbackDetail from "./FeedbackDetail/FeedbackDetail";
import EditFeedback from "./forms/EditFeedbackForm";
import Roadmap from "./Roadmap/Roadmap";
import NotFound from "./NotFound/NotFound";

function AnimatedRoutes(): JSX.Element {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Landing />} />
        <Route path={"/addfeedback"} element={<AddFeedbackForm />} />
        <Route path={"/roadmap"} element={<Roadmap />} />
        <Route path="/:id" element={<FeedbackDetail />} />
        <Route path={"/:id/editfeedback"} element={<EditFeedback />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
