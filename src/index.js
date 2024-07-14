import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './cutom components and hooks/userprovider';
import { SidebarProvider } from './cutom components and hooks/SidebarContext';
import { CoinContextProvider } from './cutom components and hooks/CoinContext';
import { SingleCoinContextProvider } from './cutom components and hooks/SingleCoinContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <SidebarProvider>
        <CoinContextProvider>
          <SingleCoinContextProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </SingleCoinContextProvider>
        </CoinContextProvider>
      </SidebarProvider>
    </UserProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

