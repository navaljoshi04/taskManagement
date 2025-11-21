import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Home from "./components/Home";
import Task from "./components/Task";
import { SearchProvider } from "./context/SearchContext";

function App() {
  return (
    <>
      <SearchProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/task" element={<Task />} />
            <Route path="/task/update/:id" element={<Task />} />
          </Routes>
        </BrowserRouter>
      </SearchProvider>
    </>
  );
}

export default App;
