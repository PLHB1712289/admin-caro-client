const { makeStyles } = require("@material-ui/core");

export default makeStyles((theme) => ({
  root: {
    textAlign: "center",
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 1000,
  },
  bottom: {
    color: theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  top: {
    position: "absolute",
    color: "#1a90ff",
    animationDuration: "550ms",
    left: 0,
  },
  circle: {
    strokeLinecap: "round",
    position: "relative",
  },
  case: {
    position: "relative",
  },
}));
