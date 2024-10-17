"use client";

import Navbar from "./components/Navbar";
import { Inter } from "next/font/google";
import "./globals.css";

import { Provider } from 'react-redux';
import store from './store'; // Adjust the import path as necessary

const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({ children }) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body className={inter.className}>
          <Navbar/>
          <div className="content">
            {children}
          </div>
        </body>
      </html>
    </Provider>
  );
}
