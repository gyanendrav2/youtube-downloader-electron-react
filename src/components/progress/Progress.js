import React from "react";
import PropTypes from "prop-types";
import { Box, colors, Grid, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  wrapper: {
    backgroundColor: colors.blue["100"],
    height: "1rem",
    width: "calc(100% - 5rem)",
  },
  child: {
    backgroundColor: colors.green["A700"],
    height: "1rem",
    width: (props) => props.progress+'%',
  },
  progress: {
    width: "3rem",
    fontSize: "1rem",
    fontWeight: 600,
  },
  percent:{
      fontSize: '1rem',
      float: 'right',
      fontWeight: 'bolder',
      lineHeight: '1rem',
  }
});

const Progress = ({ progress }) => {
  const classes = useStyles({ progress });
  return (
    <Grid container alignItems="center" justify="space-between">
      <Box className={classes.wrapper}>
        <Box className={classes.child}></Box>
      </Box>
      <Box className={classes.progress}>
        <Typography className={classes.percent}>{progress}</Typography>
      </Box>
    </Grid>
  );
};

Progress.propTypes = {
  progress: PropTypes.number,
};

export default Progress;
