import { createContext, useContext, ReactNode } from "react";
import { FeedbackContextType } from "../types";
import useFeedbacks from "../hooks/useFeedbacks";

const FeedbackContext = createContext<FeedbackContextType | undefined>(
  undefined
);

const FeedbackProvider = ({ children }: { children: ReactNode }) => {
  const feedbacksData = useFeedbacks();

  return (
    <FeedbackContext.Provider value={feedbacksData}>
      {children}
    </FeedbackContext.Provider>
  );
};

const useFeedbackContext = () => {
  const context = useContext(FeedbackContext);
  if (!context) {
    throw new Error(
      "useFeedbackContext must be used within a FeedbackProvider"
    );
  }
  return context;
};

export { FeedbackProvider, useFeedbackContext };
