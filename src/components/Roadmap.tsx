import "../styles/feedbackBoard.css";
import "../styles/roadmap.css";
import "../styles/feedbacks.css";
import GoBack from "./utils/GoBack";
import Feedback from "./Feedback";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useFeedbacks from "../hooks/useFeedbacks";

function Roadmap(): JSX.Element {
  //udělat Feedback jako komponentu a použít ji zde

  const { feedbacks } = useFeedbacks();

  const planned = feedbacks
    .filter((feedback) => feedback.status === "planned")
    .sort((a, b) => b.upvotes - a.upvotes);
  const inProgress = feedbacks
    .filter((feedback) => feedback.status === "in-progress")
    .sort((a, b) => b.upvotes - a.upvotes);
  const live = feedbacks
    .filter((feedback) => feedback.status === "live")
    .sort((a, b) => b.upvotes - a.upvotes);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.15 } }}
    >
      <main className="roadmap">
        <header className="roadmap-header">
          <div className="header-container">
            <GoBack />
            <h1>Roadmap</h1>
          </div>
          <Link className="btn btn-primary" to="/addfeedback">
            + Add Feedback
          </Link>
        </header>
        <section className="roadmap-content">
          <div className="content-container">
            <div className="content-header">
              <h2 className="header-h2">Planned ({planned.length})</h2>
              <p className="header-descp">Ideas prioritized for research</p>
            </div>
            {planned.map((feedback) => (
              <Feedback
                key={feedback.id}
                feedback={feedback}
                status="planned"
              />
            ))}
          </div>
          <div className="content-container">
            <div className="content-header">
              <h2 className="header-h2">In-Progress ({inProgress.length})</h2>
              <p className="header-descp">Currently being developed</p>
            </div>
            {inProgress.map((feedback) => (
              <Feedback
                key={feedback.id}
                feedback={feedback}
                status="inProgress"
              />
            ))}
          </div>
          <div className="content-container">
            <div className="content-header">
              <h2 className="header-h2">Live ({live.length})</h2>
              <p className="header-descp">Released features</p>
            </div>
            {live.map((feedback) => (
              <Feedback key={feedback.id} feedback={feedback} status="live" />
            ))}
          </div>
        </section>
      </main>
    </motion.div>
  );
}

export default Roadmap;
