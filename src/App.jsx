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

function App() {
  return (
   <Provider store={appStore}>
     {/* <PersistGate loading={null} persistor={persistor}> */}
        <BrowserRouter basename = "/">
        <Routes>
          <Route path="/" element={<Books />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path = '/books' element = {<Books/>} />
          
        </Routes>
      </BrowserRouter>
    {/* </PersistGate> */}
   </Provider>
    // <div>
    //   <Header/>
    // </div>
  )
  // const [count, setCount] = useState(0)

  // return (
  //   <>
  //     <div>
  //       <a href="https://vite.dev" target="_blank">
  //         <img src={viteLogo} className="logo" alt="Vite logo" />
  //       </a>
  //       <a href="https://react.dev" target="_blank">
  //         <img src={reactLogo} className="logo react" alt="React logo" />
  //       </a>
  //     </div>
  //     <h1>Vite + React</h1>
  //     <div className="card">
  //       <button onClick={() => setCount((count) => count + 1)}>
  //         count is {count}
  //       </button>
  //       <p>
  //         Edit <code>src/App.jsx</code> and save to test HMR
  //       </p>
  //     </div>
  //     <p className="read-the-docs">
  //       Click on the Vite and React logos to learn more
  //     </p>
  //   </>
  // )
}

export default App
