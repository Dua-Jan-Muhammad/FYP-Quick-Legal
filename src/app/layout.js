import { Outfit } from "next/font/google";
// import "./globals.css";

import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "Quick Legal",
  description: "Your Legal Assistant Chatbot (FYP project made by students of SMIU)",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={outfit.className}>
      <ThemeProvider theme={theme}>
        {children}
        </ThemeProvider>
        
        
      </body>
    </html>
  );
}
