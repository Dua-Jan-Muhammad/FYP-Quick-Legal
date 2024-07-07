'use client';

import { createTheme } from '@mui/material/styles';
import { Outfit } from "next/font/google";

const theme = createTheme({

    palette: {
        mode: 'light',  
        primary: {
          main: '#eeeeee',
        },
        
      },

    typography:{
        fontFamily: ['Outfit'],
    }

  });

export default theme;