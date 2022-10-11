// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Layout from "./Layout";
// import Home from "./Home";
// import BigCalendar from "./Calendar";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Layout />}>
//           <Route index element={<Home />} />
//           <Route path="Calendar" element={<BigCalendar />} />
//           {/* <Route path="contact" element={<Contact />} /> */}
//           {/* <Route path="*" element={<NoPage />} /> */}
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import { Container, Row, Col } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import "../App.css";
// import Home from "./components/Home";
import Home from "./Home";
import Login from "../components/Login";
import Signup from "../components/Signup";
import Calendar from "./Calendar";
import ProtectedRoute from "../components/ProtectedRoute";
import { UserAuthContextProvider } from "../context/UserAuthContext";

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
            </Routes>
          </UserAuthContextProvider>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
