import {FeedbackAddedProps} from "../../types";

function FeedbackAdded({setFeedbackAdded} : FeedbackAddedProps): JSX.Element {
  return (
    <>
      <div className="added-message text">Feedback added successfully</div>
      <button
        className="btn btn-primary"
        type="button"
        onClick={() => {
          setFeedbackAdded(false);
        }}
      >
        Add Another
      </button>
    </>
  );
}

export default FeedbackAdded;
