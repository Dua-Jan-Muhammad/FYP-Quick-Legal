import React from 'react';
import { ListItemText, Typography } from '@mui/material';

const parseText = (text) => {
  // Split the text by newline characters
  const paragraphs = text.split('\n\n');

  return paragraphs.map((paragraph, index) => {
    // Split each paragraph by single newline characters
    const lines = paragraph.split('\n');
    return (
      <Typography key={index} component="span" variant="body2" display="block" >
        {lines.map((line, idx) => (
          <React.Fragment key={idx}>
            {line}
            {idx < lines.length - 1 && <br />}
          </React.Fragment>
        ))}
      </Typography>
    );
  });
};

const DisplayText = ({ text }) => {
  return <>{parseText(text)}</>
};

export default DisplayText;
