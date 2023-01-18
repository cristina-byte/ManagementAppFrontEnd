import React, { startTransition } from 'react';
import ReactDOM from 'react-dom/client';
import {RouterProvider} from "react-router-dom"
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { QueryClient, QueryClientProvider } from "react-query"
import router from './Router';
import { msalConfig } from "./authConfig";

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient=new QueryClient()

const msalInstance = new PublicClientApplication(msalConfig);

root.render(
  <LocalizationProvider dateAdapter={AdapterDayjs}>
       <QueryClientProvider client={queryClient}>
      
          <RouterProvider router={router}/>
         
       </QueryClientProvider>
  </LocalizationProvider>
)

