import React from "react";
import Navbar from "./components/NavBar/Navbar";
import Header from "./components/Header/Header";
import Editor from "./components/Editor/Editor";
import './App.css';

const App = () => {
  return (
    <>
      <Navbar/>
      <div className="content-container">
        <Header/>
        <Editor/>
      </div>
    </>
  );
}

export default App;
