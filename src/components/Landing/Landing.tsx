import "./landing.css";
import FilteringPanel from "../FilteringPanel/FilteringPanel";
import FeedbackBoard from "../FeedbackBoard/FeedbackBoard";
import { useState } from "react";
import { motion } from "framer-motion";
import { Filters } from "../../types";

function Landing(): JSX.Element {
  const [filters, setFilters] = useState<Filters>({
    all: true,
    ui: false,
    ux: false,
    enhancement: false,
    bug: false,
    feature: false,
  });

  const changeFilter = (filter: keyof Filters) => {
    if (
      filter === "all" ||
      (filters[filter] === true &&
        Object.values(filters).filter((value) => value === true).length === 1)
    ) {
      setFilters({
        all: true,
        ui: false,
        ux: false,
        enhancement: false,
        bug: false,
        feature: false,
      });
      return;
    } else {
      setFilters((prevFilters) => {
        return {
          ...prevFilters,
          all: false,
          [filter]: !prevFilters[filter],
        };
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.1 } }}
      exit={{ opacity: 0, transition: { duration: 0.1 } }}
    >
      <div className="landing">
        <FilteringPanel filters={filters} changeFilter={changeFilter} />
        <FeedbackBoard filters={filters} />
      </div>
    </motion.div>
  );
}

export default Landing;
