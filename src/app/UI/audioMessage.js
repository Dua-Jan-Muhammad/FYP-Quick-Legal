import WavesurferPlayer from "@wavesurfer/react";
import { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";


const AudioMessage = ({ audioURL }) => {
  const [wavesurfer, setWavesurfer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState('00:00');
  const [duration, setDuration] = useState('00:00');

  const onReady = (ws) => {
    setWavesurfer(ws);
    setIsPlaying(false);
  };

  const onPlayPause = () => {
    wavesurfer && wavesurfer.playPause();
  };

  return (
    <>
      <Box component="span"  display="flex" alignItems="center" mt={1} sx={{
        backgroundColor: "#F0F4F9",
        borderRadius: 5,
        paddingTop: 1,
        paddingBottom: 1,
        paddingRight: 1,
      }}>
      <IconButton onClick={onPlayPause}>
          {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
        </IconButton>
        {/* <Typography variant="subtitle2">
          {currentTime} / {duration}
        </Typography> */}
        <WavesurferPlayer
          height={30}
          width={230}
          waveColor="grey"
          progressColor="black"
          barWidth={3}
          barRadius={3}
          barGap={1.5}
          barHeight={1.5}
          url={audioURL}
          onReady={onReady}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />

       
      </Box>
    </>
  );
};

export default AudioMessage;
