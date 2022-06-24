import { useEffect, useRef } from "react";
import useHttp from "../../hooks/use-http"; // Custom Hook
import { addComment } from "../../lib/api"; // Component with API Functionalities

import classes from "./NewCommentForm.module.css";
import LoadingSpinner from "../UI/LoadingSpinner";

const NewCommentForm = (props) => {
  const commentTextRef = useRef(); // Connecting Reference from JSX

  const { sendRequest, status, error } = useHttp(addComment);

  const { onAddedComment } = props; // Define what to do after successfully sending request

  useEffect(() => {
    if (status === "completed" && !error) {
      onAddedComment(); // Calls getAllComments
    }
  }, [status, error, onAddedComment]);

  const submitFormHandler = (event) => {
    event.preventDefault();

    const enteredText = commentTextRef.current.value; // Get comment Value

    // optional: Could validate here

    // Function expects (Comment, ID)
    sendRequest({ commentData: { text: enteredText }, quoteId: props.quoteId }); // send comment to server
  };

  // {status} => show spinner when loading, will automatically change state after finishing API requets
  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      {status === "pending" && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor="comment">Your Comment</label>
        <textarea id="comment" rows="5" ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className="btn">Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
