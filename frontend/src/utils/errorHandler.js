export const getErrorMessage = (error) => {
  if (error.response) {
    return error.response.data?.detail || "Server error";
  } else if (error.request) {
    return "No response from server";
  } else {
    return error.message;
  }
};