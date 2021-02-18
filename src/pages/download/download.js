import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, Grid, makeStyles, Typography } from "@material-ui/core";
import { images } from "../../assets/image";
import { blueOpacity, colors } from "../../theme/colors";
import "../../theme/styles/index.scss";
import InputWithLabelIcon from "../../components/inputs/InputWithLabelIcon";
import SelectWithLabelIcon from "../../components/inputs/SelectWithLabelIcon";
import LinkIcon from "@material-ui/icons/Link";
import CustomButton from "../../components/buttons/CustomButton";
import { videoFormat } from "../../helper/videoFormat";
import { downloadVideo } from "../../helper/downloadVideo";
import { useForm } from "react-hook-form";
import { videoDownloadValidation } from "../../formValidation/videoDownloadValidation";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import PlayPauseProgress from "../../components/buttons/PlayPauseProgress";
const ytdl = require("ytdl-core");

const useStyles = makeStyles({
  wrapper: {
    width: "100%",
    height: "100vh",
    backgroundImage: `url(${images.downloadbg})`,
    backgroundColor: blueOpacity(0.7),
    // "&::before": {
    //   position: "absolute",
    //   content: "''",

    //   width: "100%",
    //   height: "100vh",
    // },
  },
  container: {
    maxWidth: "45rem",
    margin: "auto",
    padding: "2rem",
    boxShadow: "0 0 10px -1px rgba(0,0,0,0.3)",
    backgroundColor: colors.white,
    borderRadius: "0.4rem",
  },
  heading: {
    fontSize: "2.5rem",
    marginBottom: "1rem",
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: 600,
    marginBottom: "1rem",
  },
});

const Download = () => {
  const classes = useStyles();
  const [videoDetails, setVideoDetails] = useState();
  const [format, setFormat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState(0);

  const { register, errors, handleSubmit, getValues, reset } = useForm({
    resolver: yupResolver(videoDownloadValidation),
  });

  // useEffect(() => {
  //   if (link !== "") {
  //     downloadLink(link);
  //   }
  // }, [link]);

  const handleLink = async (link) => {
    const linkVal = yup.string().url();
    const result = await linkVal.isValid(link);
    if (result && link !== "") {
      setLoading(true);
      downloadLink(link);
    }
  };

  const downloadLink = async (link) => {
    const result = await ytdl.getInfo(link);
    setLoading(false);
    setVideoDetails(result);
    setFormat(videoFormat(result.formats));
  };

  const handleStartDownload = async (link) => {
    setIsDownloading(true);
    const download = await ytdl(link, {
      format: "mp4",
      quality: videoDetails.formats[getValues().format].itag,
    });

    download.on("progress", (length, downloaded, totallength) => {
      setProgress(Number((downloaded / totallength) * 100).toFixed(2));
    });

    download.on("end", () => {
      if (isDownloading) {
        setIsDownloading(false);
        setProgress(0);
      }
    });

    downloadVideo(download, videoDetails.videoDetails.title);
  };

  const submit = async (data) => {
    await handleStartDownload(data.link);
  };

  return (
    <Grid
      container
      alignItems="center"
      justify="center"
      className={classes.wrapper}
    >
      <form onSubmit={handleSubmit(submit)}>
        <Grid
          container
          spacing={3}
          // alignItems="center"
          // justify="center"
          className={classes.container}
        >
          <Typography className={classes.heading}>Video Downloader</Typography>
          <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
            <InputWithLabelIcon
              name="link"
              inputRegister={register}
              label="Link"
              icon={<LinkIcon />}
              error={errors?.link ? true : false}
              errorMsg={errors?.link}
              onChange={handleLink}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <SelectWithLabelIcon
              name="format"
              inputRegister={register}
              label="Format"
              options={format}
              placeholder={format.length ? "Select Format" : ""}
              error={errors?.link ? true : false}
              errorMsg={errors?.format}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            {loading && (
              <Typography>Please wait fetching video info...</Typography>
            )}
            <Typography className={classes.title}>
              {videoDetails && videoDetails.videoDetails.title}
            </Typography>
            {isDownloading ? (
              <PlayPauseProgress progress={progress} />
            ) : (
              <CustomButton type="submit" label="Download Video" />
            )}
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
};

Download.propTypes = {};

export default Download;
