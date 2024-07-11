"use client";
import React from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Card,
  CardContent,
  IconButton,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
  Skeleton
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import MicIcon from "@mui/icons-material/Mic";
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';

import ChatIcon from "@mui/icons-material/Chat";
import GavelIcon from "@mui/icons-material/Gavel";
import InfoIcon from "@mui/icons-material/Info";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useState, useRef, useEffect } from "react";


import AudioMessage from "../UI/audioMessage";

import { motion } from 'framer-motion';

const hideScrollbarStyle = {
    msOverflowStyle: 'none', // Internet Explorer 10+
    scrollbarWidth: 'none', // Firefox
    '&::-webkit-scrollbar': {
      display: 'none', // Safari and Chrome
    },
  };

function ChatPage() {
  const cardData = [
    { text: "Get legal advice on property disputes", icon: <GavelIcon /> },
    { text: "Understand your rights as a tenant", icon: <InfoIcon /> },
    { text: "Prepare legal documents for court", icon: <AssignmentIcon /> },
    { text: "Chat with a virtual law assistant", icon: <ChatIcon /> },
  ];

  const [ChatStart, setChatStart] = useState(false);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [audioURL, setAudioURL] = useState('');
  const [recordingTime, setRecordingTime] = useState(0);

  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);


 


  const handleInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      HandleChat();
    }
  };

  const HandleChat = () => {
    setChatStart(true);
    setInput("");

    const newMessage = { content: input, sender: "user" , type: "text" };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      const botResponse = {
        content: "This is a static response from the chatbot.",
        sender: "bot",
        type: "text",
      };
      setMessages((prevMessages) => [...prevMessages, botResponse]);
    }, 2000);








 
  };


  const handleStartRecording = async () => {
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start( );
      setIsRecording(true);

      const audioChunks = [];
      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        setChatStart(true);
        const audioBlob = new Blob(audioChunks);
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioURL(audioUrl);
        setMessages((prevMessages) => [
          ...prevMessages,
          { content: audioUrl , sender: "user" , type: 'audio'},
        ]);
        
        setLoading(true);
        setRecordingTime(0)


        setTimeout(() => {
            setLoading(false);
            setMessages((prevMessages) => [
              ...prevMessages,
              {content: 'This is a simulated response from the chatbot.', sender: 'bot', type: 'text'},
            ]);
          }, 2000);
      };

      
    } catch (error) {
      console.error('Error accessing audio stream:', error);
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'paused') {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
    }
  };

  const handleCancelRecording = () => {
    setIsRecording(false);
    setIsPaused(false);
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
    chunksRef.current = [];
  };

  useEffect(() => {
    let timer;
    if (isRecording && !isPaused) {
      timer = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRecording, isPaused]);


  return (
    <>
      <Box>
        <Container maxWidth="md" sx={{ flexGrow: 1, overflow: "auto", py: 2 }}>
          {ChatStart ? (
            <>
              <Box
                height="76vh"
                id="Scrollbar"
                sx={{
                  width: "100%",
                  overflow: "auto",
                  ...hideScrollbarStyle,
                }}


              >
                <List
                  sx={{
                    width: "100%",
                  }}
                >
                 {messages.map((message, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        sx={{
                          display: 'flex',
                          flexDirection: message.sender === 'user' ? 'column' : 'column',
                          alignItems: message.sender === 'user' ? 'flex-end' : 'flex-start',
                          mx: 2,
                          textAlign: message.sender === 'user' ? 'right' : 'left',
                        }}
                        primary={message.sender}
                        secondary={message.type === 'text' ? message.content : (

                            <AudioMessage audioURL={message.content} />
                            // <audio controls>
                            //   <source src={message.content} type="audio/ogg" />
                            //   Your browser does not support the audio element.
                            // </audio>
                          )}
                        
                      />
                    </ListItem>
                  ))}
                  {loading && (
                    <ListItem>
                      <ListItemText
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          mx: 2,
                          textAlign: 'left',
                        }}
                        primary={
                            <>
                            <Skeleton variant="text" width={210} height={20} />
                            <Skeleton variant="text" width={610} height={20}/>
                            <Skeleton variant="text" width={610} height={20}/>
                            </>}
                      />
                    </ListItem>
                  )}
                </List>
              </Box>
            </>
          ) : (
            <>
              <Box mt={10}>
                <Typography variant="h2" gutterBottom>
                  Hello User,
                </Typography>
                <Typography variant="h2" gutterBottom>
                  Chat with your Legal Assistant
                </Typography>

                <Grid container spacing={2} mt={8}>
                  {cardData.map((card, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                      <Card
                        sx={{
                          bgcolor: "#F0F4F9",
                          borderRadius: "10px",
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                        }}
                        onClick={()=>setInput(card.text)}
                      >
                        <CardContent>
                          <Typography variant="body1" gutterBottom>
                            {card.text}
                          </Typography>
                        </CardContent>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            padding: "10px",
                          }}
                        >
                          <IconButton>{card.icon}</IconButton>
                        </Box>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </>
          )}

          <Box
            sx={{
              position: "fixed",
              bottom: 15,
              left: "250px", // Adjust for the sidebar width
              right: "250px", // Adjust for the sidebar width
              marginLeft: "auto",
              marginRight: "auto",
              width: {
                xs: "calc(100% - 320px)", // Account for sidebar and padding
                sm: "calc(100% - 350px)", // Account for sidebar and padding
                md: "calc(100% - 660px)", // Account for sidebar and padding
              },
              bgcolor: "#F0F4F9",
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              padding: "10px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <input
              type="text"
              placeholder="Enter a prompt here"
              value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleInputKeyPress}
              style={{
                flexGrow: 1,
                border: "none",
                outline: "none",
                padding: "10px",
                fontSize: "16px",
                backgroundColor: "transparent",
              }}
             
             
            />

            {
                isRecording ? (
                    <>
                    {isPaused ? (<>
                    <IconButton onClick={resumeRecording} >
                    <PlayCircleFilledWhiteIcon />
                    </IconButton> 
                    </>):(<>
                    <IconButton onClick={pauseRecording} color="error">
                    <PauseCircleIcon />
                    </IconButton>
                    </>)}
                    
                    <Typography variant="body2">{`Recording: ${Math.floor(recordingTime / 60)}:${recordingTime % 60}`}</Typography>
                    <IconButton onClick={handleStopRecording} color="error">
                    <StopCircleIcon />
                    </IconButton>
                    </>
                ) : (
                    <IconButton onClick={HandleChat}>
                    <SendIcon />
                  </IconButton>
      
                )
            }
           

            <IconButton onClick={handleStartRecording}
          >
              <MicIcon />
            </IconButton>
          </Box>
         
      
        </Container>
      </Box>
    </>
  );
}

export default ChatPage;
