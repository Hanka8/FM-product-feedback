import ReactDOM from "react-dom/client";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AnimatedRoutes from "./components/AnimatedRoutes";
import { FeedbackProvider } from "./context/FeedbackContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <FeedbackProvider>
      <AnimatedRoutes />
    </FeedbackProvider>
  </BrowserRouter>
);