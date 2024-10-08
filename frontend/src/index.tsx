import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from '@mui/icons-material';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
<BrowserRouter>
<Routes>
  <Route path="/">
    <Route index element={<Home/>} />
    {/* <Route path="blogs" element={<Blogs />} />
    <Route path="contact" element={<Contact />} />
    <Route path="*" element={<NoPage />} /> */}
  </Route>
</Routes>
</BrowserRouter>
root.render(   <React.StrictMode>
  <BrowserRouter>
     <App />
  </BrowserRouter>
</React.StrictMode>);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
