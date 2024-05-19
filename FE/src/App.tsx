import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import HomePage from "./components/HomePage";

function App() {
  const isAuthenticated = true;
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
            {/* Use a Route component to conditionally render the Navigate component */}
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Navigate to="/home" replace />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route path="/home" element={<HomePage />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
