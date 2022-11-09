import { Row, Col } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import "../App.css";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import ProtectedRoute from "../components/ProtectedRoute";
import { UserAuthContextProvider } from "../context/UserAuthContext";
import BigCalendar from "./Calendar";
import HabitPage from "./HabitPage";
import TrackPage from "./TrackPage";

function App() {
  return (
    <div>
      <Row>
        <Col>
          <UserAuthContextProvider>
            <Routes>
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="Calendar"
                element={
                  <ProtectedRoute>
                    <BigCalendar />
                  </ProtectedRoute>
                }
              />
              <Route
                path="HabitPage"
                element={
                  <ProtectedRoute>
                    <HabitPage />
                  </ProtectedRoute>
                }
              />
                <Route
                    path="TrackPage"
                    element={
                        <ProtectedRoute>
                            <TrackPage />
                        </ProtectedRoute>
                    }
                />
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </UserAuthContextProvider>
        </Col>
      </Row>
    </div>
  );
}

export default App;
