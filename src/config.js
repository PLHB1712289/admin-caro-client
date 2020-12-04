const PRODUCTION_ENVIRONEMT = {
  title: "Production",
  URL_SERVER: process.env.REACT_APP_URL_SERVER,
};

const DEVELOPMENT_ENVIRONEMT = {
  title: "Development",
  URL_SERVER: "http://localhost:4000",
};

const ENVIRONMENT =
  process.env.REACT_APP_ENVIRONMENT === "PRODUCTION"
    ? { ...PRODUCTION_ENVIRONEMT }
    : { ...DEVELOPMENT_ENVIRONEMT };

console.log(
  `Run on ${
    process.env.REACT_APP_ENVIRONMENT === "PRODUCTION"
      ? "PRODUCTION ENVIRONMENT"
      : "DEVELOPMENT ENVIRONMENT"
  }`
);

export default ENVIRONMENT;
