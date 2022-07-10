import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUserProfile } from "../../actions/userActions";
import ErrorMessage from "../../component/ErrorMessage";
import Loading from "../../component/Loading";
import MainScreen from "../../component/MainScreen";
import "./ProfileScreen.css";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pic, setPic] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error, successMessage } = userUpdate;

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setPic(userInfo.pic);
    }
  }, [navigate, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      dispatch(updateUserProfile({ name, email, pic, password }));
    } else {
      alert("Passwords does not match!");
    }
  };

  return (
    <MainScreen title="EDIT PROFILE">
      <div className="profileContainer">
        <Row>
          <Col md={6}>
            {loading && <Loading />}
            {successMessage && (
              <ErrorMessage variant="success">{successMessage}</ErrorMessage>
            )}
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <Form onSubmit={submitHandler}>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  placeholder="Enter Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  placeholder="Enter Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  value={confirmPassword}
                  placeholder="Confirm Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>

              {/* {picMessage && (
            <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
          )} */}
              {/* <Form.Group className="mb-3" controlId="formFile">
            <Form.Label>Profile Picture</Form.Label>
            <Form.Control
              // onChange={(e) => postDetails(e.target.files[0])}
              type="file"
            />
          </Form.Group> */}

              <Button variant="primary" type="submit">
                Update
              </Button>
            </Form>
          </Col>
          <Col>
            <img src={pic} alt={name} className="profilepic"></img>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default ProfileScreen;
