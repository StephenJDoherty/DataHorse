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
import HabitList from "../components/HabitList";
import TrackList from "../components/TrackList";

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
                    <HabitPage
                      collectionPath={"habits"}
                      Component={HabitList}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path="TrackPage"
                element={
                  <ProtectedRoute>
                    <HabitPage
                      collectionPath={"habits"}
                      Component={TrackList}
                    />
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
