import "../styles/filteringPanel.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FilteringPanelProps } from "../types";
import { useSwipeable } from "react-swipeable";
import useFeedbacks from "../hooks/useFeedbacks";

function FilteringPanel({
  filters,
  changeFilter,
}: FilteringPanelProps): JSX.Element {
  const { feedbacks, error } = useFeedbacks();
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [screenSizeM, isScreenSizeM] = useState(window.innerWidth < 730);

  useEffect(() => {
    function handleResize() {
      isScreenSizeM(window.innerWidth < 730);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const planned = feedbacks.filter((feedback) => feedback.status === "planned");
  const inProgress = feedbacks.filter(
    (feedback) => feedback.status === "in-progress"
  );
  const live = feedbacks.filter((feedback) => feedback.status === "live");

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => setIsMenuOpened(true),
    onSwipedRight: () => setIsMenuOpened(false),
  });

  return (
    <section className="panel">
      <div className="panel-header">
        <h1>Frontend Mentor</h1>
        <h2>Feedback Board</h2>
        <button
          className={`hamburger-btn ${isMenuOpened && "opened"}`}
          aria-label="menu"
          onClick={() => setIsMenuOpened(!isMenuOpened)}
        ></button>
      </div>
      {screenSizeM && (
        <>
          <div
            className={`panel-overlay ${isMenuOpened && "opened"}`}
            onClick={() => setIsMenuOpened(!isMenuOpened)}
          ></div>
          <div
            className={`panel-box ${isMenuOpened && "opened"}`}
            {...swipeHandlers}
          ></div>
        </>
      )}
      <div className={`panel-filtering ${isMenuOpened && "opened"}`}>
        <button
          className={`filter-button ${filters.all ? "active" : ""}`}
          onClick={() => {
            changeFilter("all");
          }}
        >
          All
        </button>
        <button
          className={`filter-button ${filters.ui ? "active" : ""}`}
          onClick={() => changeFilter("ui")}
        >
          UI
        </button>
        <button
          className={`filter-button ${filters.ux ? "active" : ""}`}
          onClick={() => changeFilter("ux")}
        >
          UX
        </button>
        <button
          className={`filter-button ${filters.enhancement ? "active" : ""}`}
          onClick={() => changeFilter("enhancement")}
        >
          Enhancement
        </button>
        <button
          className={`filter-button ${filters.bug ? "active" : ""}`}
          onClick={() => changeFilter("bug")}
        >
          Bug
        </button>
        <button
          className={`filter-button ${filters.feature ? "active" : ""}`}
          onClick={() => changeFilter("feature")}
        >
          Feature
        </button>
      </div>
      <div className={`panel-roadmap ${isMenuOpened && "opened"}`}>
        <div className="panel-roadmap-header roadmap-flex">
          <h2>Roadmap</h2>
          <Link className="link" to="/roadmap">
            View
          </Link>
        </div>
        {error ? (
          <p>{error}</p>
        ) : (
          <>
            <div className="roadmap-row roadmap-flex">
              <p>
                <span className="circle planned"></span>Planned
              </p>
              <p className="bold">{planned.length}</p>
            </div>
            <div className="roadmap-row roadmap-flex">
              <p>
                <span className="circle inProgress"></span>In-progress
              </p>
              <p className="bold">{inProgress.length}</p>
            </div>
            <div className="roadmap-row roadmap-flex">
              <p>
                <span className="circle live"></span>Live
              </p>
              <p className="bold">{live.length}</p>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default FilteringPanel;
