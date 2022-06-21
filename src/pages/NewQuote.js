import { useEffect } from "react";
import { useHistory } from "react-router-dom"; // To redirect, navigate Route to another location
import QuoteForm from "../components/quotes/QuoteForm";
import useHttp from "../hooks/use-http"; // Custom Hook (contain Reducers function)
import { addQuote } from "../lib/api"; // Getting API Function

const NewQuote = () => {
  const { sendRequest, status } = useHttp(addQuote); // useHttp => receives (requestFunction, startWithPending = false)
  const history = useHistory();

  // To automatically redirect Route
  useEffect(() => {
    if (status === "completed") {
      history.push("/quotes"); // Redirecting Route
      // .push => erases history and creates a new Route with changes (No go back button)
      // .replace => replace history Route with changes (Can use go back button)
    }
  }, [status, history]);

  const addQuoteHandler = (quoteData) => {
    sendRequest(quoteData); // Add data & "POST" request
  };

  return (
    <QuoteForm isLoading={status === "pending"} onAddQuote={addQuoteHandler} />
  );
};

export default NewQuote;
