import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import Navbar from "./components/NavBar/Navbar";
import Header from "./components/Header/Header";
import Editor from "./components/Editor/Editor";
import { store } from "./store/store";
import './App.css';

const App = () => {
  const [docId, setDocId] = useState(null);

  useEffect(() => {
    // Create a new document
    fetch("http://localhost:3000/api/documents", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "New Document" }),
    })
      .then((res) => res.json())
      .then((data) => setDocId(data.id));
  }, []);

  if (!docId) return <div>Loading...</div>;

  return (
    <Provider store={store}>
      <Navbar />
      <div className="content-container">
        <Header />
        <Editor docId={docId} />
      </div>
    </Provider>
  );
};

export default App;