import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseCircleFilledIcon from "@material-ui/icons/PauseCircleFilled";
import { colors } from "../../theme/colors";
import Progress from "../progress/Progress";

const useStyles = makeStyles({
  play: {
    color: colors.lightGreen,
  },
  pause: {
    color: colors.primary,
  },
  delete: {
    color: colors.red,
  },
  col1: {
    width: "10rem",
  },
  col2: {
    width: "calc(100% - 10rem)",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  colfirst90: {
    width: "calc(100% - 3rem)",
  },
  colfirst10: {
    width: "3rem",
    float: "right",
    fontWeight: 500,
  },
});

const PlayPauseProgress = ({ progress }) => {
  const classes = useStyles();
  return (
    <Grid container>
      <Box className={classes.col1}>
        <IconButton aria-label="play">
          <PlayArrowIcon className={classes.play} />
        </IconButton>
        <IconButton aria-label="pause">
          <PauseCircleFilledIcon className={classes.pause} />
        </IconButton>
        <IconButton aria-label="delete" className={classes.delete}>
          <DeleteIcon />
        </IconButton>
      </Box>
      <Box className={classes.col2}>
        <Progress progress={progress} />
      </Box>
    </Grid>
  );
};

PlayPauseProgress.propTypes = {
  progress: PropTypes.number,
};

export default PlayPauseProgress;
