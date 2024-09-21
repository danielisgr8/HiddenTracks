import React from 'react';
import { useRouteError } from 'react-router-dom';

// TODO: Handle more error classes
const getErrorString = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
};

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{getErrorString(error)}</i>
      </p>
    </div>
  );
}

export default ErrorPage;
