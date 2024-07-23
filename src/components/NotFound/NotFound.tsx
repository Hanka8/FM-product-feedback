import { Link } from "react-router-dom";
import "./notfound.css"

function NotFound(): JSX.Element {
    return (
      <div className="error">
        <Link to="/">
          <button className="go-back">Go Back</button>
        </Link>
        <h1 className="error__h1">Not found</h1>
        <img src="/assets/suggestions/illustration-empty.svg"></img>
        <p className="error__p">
          It seems like the page you are looking for does not exist.
        </p>
      </div>
    );
}

export default NotFound;