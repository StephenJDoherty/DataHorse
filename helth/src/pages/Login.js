import React, {useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";
import {collection, deleteDoc, getDocs, getFirestore, query, where} from "firebase/firestore";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn, googleSignIn } = useUserAuth();
  const navigate = useNavigate();

  const today = new Date();
  const startDate = new Date(today.getFullYear(), 0, 1);
  const days = Math.floor((today - startDate) / (24 * 60 * 60 * 1000));
  const weekNum = Math.ceil(days / 7);

  useEffect(() => { //cleans out currentWeek when needed:
    const newWeek = async () => {
      const db = getFirestore();
      const colRef = collection(db, "currentWeek");
      //query all docs where week < current:
      const q = query(colRef, where("week", "<", weekNum));
      //take snapshot of docs returned by query:
      const snapShot = await getDocs(q);
      //for each doc in the snapshot, delete it!:
      snapShot.forEach((doc) => {
        deleteDoc(doc.ref);
      }); //end of forEach
    }; // end of newWeek
    newWeek().catch(console.error);
  }, []); //end of useEffect

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };



  return (
    <>
      <div className="p-4 box">
        <h2 className="mb-3">Helth Login</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="primary" type="Submit">
              Log In
            </Button>
          </div>
        </Form>
        <hr />
        {/*removed because it doesn't seem to work:*/}
        {/*<div>*/}
        {/*<GoogleButton*/}
        {/*  className="g-btn"*/}
        {/*  type="dark"*/}
        {/*  onClick={handleGoogleSignIn}*/}
        {/*/>*/}
        {/*</div>*/}
      </div>
      <div className="p-4 box mt-3 text-center">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </div>
    </>
  );
};

export default Login;
