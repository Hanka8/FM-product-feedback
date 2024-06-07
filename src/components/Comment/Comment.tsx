import "./comment.css";
import { CommentProps } from "../../types.tsx";

function Comment({ comment }: CommentProps): JSX.Element {
  return (
    <div key={comment.id} className="comment">
      <div className="avatar-container">
        <img className="avatar" src="assets/shared/avatar.webp" alt="avatar" />
      </div>
      <div>
        <p className="user bold dark-blue">Anonymous user</p>
        <p>{comment.comment}</p>
      </div>
    </div>
  );
}

export default Comment;
