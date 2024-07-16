import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { FeedbackProvider } from "./context/FeedbackContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <FeedbackProvider>
      <App />
    </FeedbackProvider>
  </BrowserRouter>
);