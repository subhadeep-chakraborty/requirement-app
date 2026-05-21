const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return (
    <p className="text-red-500 mb-2">
      {message}
    </p>
  );
};

export default ErrorMessage;