import useStyles from "./useStyles";

export default function Square({ value }) {
  const classes = useStyles();
  const color = value === "X" ? "red" : "green";
  return (
    <div
      className={classes.square}
      style={{
        color: color,
        border: "1px solid rgba(0,0,0,0.25)",
      }}
    >
      {value}
    </div>
  );
}
