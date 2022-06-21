import QuoteList from "../components/quotes/QuoteList"; // To display JSX data
import useHttp from "../hooks/use-http"; // Custom Hook
import { getAllQuotes } from "../lib/api"; // Function for API request
import { useEffect } from "react";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoQuotesFound from "../components/quotes/NoQuotesFound";

// Getting Data
const AllQuotes = () => {
  const {
    sendRequest,
    status,
    data: loadedQuotes,
    error,
  } = useHttp(getAllQuotes, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  // Toggle loading Spinning component
  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  // Show error
  if (error) {
    return <p calassName="centered focused">{error}</p>;
  }

  // No quotes Found component
  if ((status === "completed" && !loadedQuotes) || loadedQuotes.length === 0) {
    return <NoQuotesFound />;
  }

  return <QuoteList quotes={loadedQuotes} />;
};

export default AllQuotes;
