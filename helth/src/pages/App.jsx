import { Container, Row, Col } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import "../App.css";
import Home from "./Home";
import Login from "../components/Login";
import Signup from "../components/Signup";
import ProtectedRoute from "../components/ProtectedRoute";
import { UserAuthContextProvider } from "../context/UserAuthContext";
import BigCalendar from "./Calendar";
import HabitPage from "./HabitPage";

function App() {
  return (
    <Container style={{ width: "400px" }}>
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
              <Route path="/" element={<Login />} />

              <Route path="/signup" element={<Signup />} />
              <Route path="Calendar" element={<BigCalendar />} />
              <Route path="HabitPage" element={<HabitPage />} />
            </Routes>
          </UserAuthContextProvider>
        </Col>
      </Row>
    </Container>
  );
}

export default App;

////////works, but no login:
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Layout from "./Layout";
// import Home from "./Home";
// import BigCalendar from "./Calendar";
// import HabitPage from "./HabitPage";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Layout />}>
//           <Route index element={<Home />} />
//           <Route path="Calendar" element={<BigCalendar />} />
//           <Route path="HabitPage" element={<HabitPage />} />
//           {/* <Route path="*" element={<NoPage />} /> */}
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
