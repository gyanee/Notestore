import React from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import MainScreen from "../../component/MainScreen";
import notes from "../../notes";

import "./MyNotes.css";

const MyNotes = () => {
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
    }
  };

  return (
    <MainScreen title="Welcome Back Laya...">
      <Link to="/createnote">
        <Button varient="primary" size="lg" style={{ margin: "15px 5px" }}>
          Create New Note
        </Button>
      </Link>
      {notes.map((note) => (
        <Accordion key={note._id} style={{ margin: "10px 0" }}>
          <Accordion.Item eventKey="0">
            <div className="acc-item">
              <Accordion.Header
                className="acc-header"
                style={{ fontSize: "20px" }}
              >
                <span>{note.title}</span>
              </Accordion.Header>
              <div>
                <Button variant="primary" size="md" href={`/note/${note._id}`}>
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="md"
                  className="mx-2"
                  onClick={deleteHandler.bind(null, note._id)}
                >
                  Delete
                </Button>
              </div>
            </div>
            <Accordion.Body
              style={{ border: "1px #ababab solid", padding: "5px" }}
            >
              <h4>
                <Badge bg="success" className="badge-success">
                  Category - {note.category}
                </Badge>
              </h4>
              <blockquote className="blockquote mb-0">
                <p>{note.content}</p>
                <footer className="blockquote-footer">Created on - Date</footer>
              </blockquote>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      ))}
    </MainScreen>
  );
};

export default MyNotes;
