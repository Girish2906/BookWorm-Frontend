import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Header from './Components/Header'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Components/Home';
import About from './Components/About';
import Login from './Components/Login';
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";
import appStore , {persistor} from './utils/store';
import Books  from'./Components/Books' ; 
import UploadNewBook from './Components/UploadNewBook'; 
import {ExploreLoginProvider} from './Components/Context' ; 
import Notification from './Components/Notification';
import StartChat from './Components/StartChat';

function App() {
  return (
   <Provider store={appStore}>
     <PersistGate loading={null} persistor={persistor}>
     <ExploreLoginProvider>
        <BrowserRouter basename = "/">
          <Routes>
            <Route path="/" element={<Books />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path = '/books' element = {<Books/>} />
            <Route path = '/upload' element = {<UploadNewBook/>} />
            <Route path = '/interests' element = {<Notification/>} />
            <Route path='/chat' element={ <StartChat/> } />

          </Routes>
        </BrowserRouter>
      </ExploreLoginProvider>
    </PersistGate>
   </Provider>
  )
}

export default App
