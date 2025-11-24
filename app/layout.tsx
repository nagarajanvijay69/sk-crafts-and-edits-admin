'use client'

import { useEffect } from 'react';
import './globals.css'
import store from './store/Redux-store';
import axios from 'axios'
import { initCategory, initMessage, initProduct } from './store/Slice';
import { Provider } from 'react-redux';

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
 
  useEffect(() => {
      const fetchData = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URI}/get-product`);
        store.dispatch(initProduct(res.data.products));
  
        const data = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URI}/get-category`);
        store.dispatch(initCategory(data.data.category));
  
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URI}/get-message`);
        store.dispatch(initMessage(response.data.message));
      }
      fetchData();
    }, []);
   
  return (
    <html lang="en">
      <head>
        <title>Admin Panel - SK Edits and Crafts</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
        <link rel="icon" href="../sk.png" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=menu" />
      </head>
      <body>
        <Provider store={store}>
          {children}
        </Provider>
      </body>
    </html>
  );
}
