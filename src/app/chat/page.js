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

import ChatIcon from "@mui/icons-material/Chat";
import GavelIcon from "@mui/icons-material/Gavel";
import InfoIcon from "@mui/icons-material/Info";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useState } from "react";

const hideScrollbarStyle = {
    msOverflowStyle: 'none', // Internet Explorer 10+
    scrollbarWidth: 'none', // Firefox
    '&::-webkit-scrollbar': {
      display: 'none', // Safari and Chrome
    },
  };

function page() {
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

  const handleInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      HandleChat();
    }
  };

  const HandleChat = () => {
    setChatStart(true);
    setInput("");

    const newMessage = { text: input, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      const botResponse = {
        text: "This is a static response from the chatbot.",
        sender: "bot",
      };
      setMessages((prevMessages) => [...prevMessages, botResponse]);
    }, 2000);








 
  };
  return (
    <>
      <Box>
        <Container maxWidth="md" sx={{ flexGrow: 1, overflow: "auto", py: 2 }}>
          {ChatStart ? (
            <>
              <Box
                height="84vh"
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
                        secondary={message.text}
                        
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
            <IconButton onClick={HandleChat}>
              <SendIcon />
            </IconButton>
            <IconButton>
              <MicIcon />
            </IconButton>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default page;