import { Fragment, useEffect } from "react";
import { useParams, Route, Link, useRouteMatch } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";

const QuoteDetail = () => {
  const match = useRouteMatch(); // Get Overall URL Data
  const params = useParams(); // Get Current URL Data

  const { quoteId } = params; // Get Id for { getSingleQuote } which needs a ID to work

  // Get data from API
  const {
    sendRequest, // This calls a API function { getSingleQuote }
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleQuote, true); // true (toggle loading mode)

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  // Toggle Loading
  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered">{error}</p>;
  }

  if (!loadedQuote.text) {
    return <p className="centered">No quote found</p>;
  }

  // ${match.path} => "/quotes/:quoteId"
  // ${match.url} => "/quotes/ParamValue"
  return (
    <Fragment>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      <Route path={`${match.path}`} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </Fragment>
  );
};

export default QuoteDetail;
