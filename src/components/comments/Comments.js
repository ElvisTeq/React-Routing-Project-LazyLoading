import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

import classes from "./Comments.module.css";
import NewCommentForm from "./NewCommentForm";
import useHttp from "../../hooks/use-http";
import { getAllComments } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";
import CommentsList from "./CommentsList";

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const params = useParams(); // Getting URL Params
  const { quoteId } = params;

  const { sendRequest, status, data: loadedComments } = useHttp(getAllComments); // Using custom hooks & Get Data

  // get all Comments
  useEffect(() => {
    sendRequest(quoteId);
  }, [quoteId, sendRequest]);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  // { useCallBack } to make it run only once to Prevet infinite loop
  const addedCommentHandler = useCallback(() => {
    sendRequest(quoteId); // Get all comments
  }, [sendRequest, quoteId]);

  let comments;

  if (status === "pending") {
    comments = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  // If completed & has Comments
  if (status === "completed" && loadedComments && loadedComments.length > 0) {
    comments = <CommentsList comments={loadedComments} />;
  }

  // If completed & has no Comments
  if (
    status === "completed" &&
    (!loadedComments || loadedComments.length === 0)
  ) {
    comments = <p className="centered">No comments were added yet</p>;
  }

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm
          quoteId={quoteId}
          onAddedComment={addedCommentHandler}
        />
      )}
      <p>{comments}</p>
    </section>
  );
};

export default Comments;
