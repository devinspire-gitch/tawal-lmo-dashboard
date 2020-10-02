const {
  REACT_APP_API_PROTOCOL,
  REACT_APP_API_HOSTNAME,
  REACT_APP_API_PORT
} = process.env;

export const apiBaseUrl = `${REACT_APP_API_PROTOCOL}://${REACT_APP_API_HOSTNAME}${
  REACT_APP_API_PORT ? `:${REACT_APP_API_PORT}` : ""
}/api`;

export default { apiBaseUrl };
