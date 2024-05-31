import "../styles/landing.css";
import FilteringPanel from "./FilteringPanel";
import FeedbackBoard from "./FeedbackBoard";
import { useState } from "react";
import { motion } from "framer-motion";
import { FilterType } from "../types";

function Landing(): JSX.Element {
  const [filter, setFilter] = useState<FilterType[]>([
    { isActive: false, label: "All" },
    { isActive: false, label: "UI" },
    { isActive: false, label: "UX" },
    { isActive: false, label: "ENHANCEMENT" },
    { isActive: false, label: "BUG" },
    { isActive: false, label: "FEATURE" },
  ]);
  const handleFilterChange = (label: string) => {
    const newFilter = filter.map((item) => (
        
        {
      ...item,
      isActive: item.label === label && !item.isActive,
    }));
    setFilter(newFilter);
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.15 } }}
    >
      <div className="landing">
        <FilteringPanel
          filter={filter}
          handleFilterChange={handleFilterChange}
        />
        <FeedbackBoard filter={filter} />
      </div>
    </motion.div>
  );
}

export default Landing;
