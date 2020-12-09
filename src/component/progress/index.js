import { CircularProgress } from "@material-ui/core";
import React from "react";
import useStyles from "./styles";

const Progress = (props) => {
  const classes = useStyles();

  const { isDisplay, children } = props;

  return (
    <>
      {isDisplay ? (
        <>
          <div className={classes.root}>
            <span className={classes.case}>
              <CircularProgress
                variant="determinate"
                className={classes.bottom}
                size={40}
                thickness={4}
                {...props}
                value={100}
              />
              <CircularProgress
                variant="indeterminate"
                disableShrink
                className={classes.top}
                classes={{
                  circle: classes.circle,
                }}
                size={40}
                thickness={4}
                {...props}
              />
            </span>
          </div>
          <div>{children}</div>
        </>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default Progress;
