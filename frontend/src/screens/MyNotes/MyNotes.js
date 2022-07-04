import React, { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Accordion, Badge, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import MainScreen from "../../component/MainScreen";
import { useDispatch, useSelector } from "react-redux";

import "./MyNotes.css";
import { deleteNoteAction, listNotes } from "../../actions/noteActions";
import Loading from "../../component/Loading";
import ErrorMessage from "../../component/ErrorMessage";

const MyNotes = ({ search }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const noteList = useSelector((state) => state.noteList);
  const { loading, notes, error } = noteList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;

  const noteDelete = useSelector((state) => state.noteDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = noteDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNoteAction(id));
    }
  };

  useEffect(() => {
    dispatch(listNotes());
    if (!userInfo) {
      navigate("/");
    }
  }, [
    dispatch,
    userInfo,
    navigate,
    successCreate,
    successUpdate,
    successDelete,
  ]);

  return (
    <MainScreen title={`Welcome Back ${userInfo?.name}...`}>
      <Link to="/createnote">
        <Button varient="primary" size="lg" style={{ margin: "15px 5px" }}>
          Create New Note
        </Button>
      </Link>
      {(error || errorDelete) && (
        <ErrorMessage variant="danger">{error}</ErrorMessage>
      )}
      {(loading || loadingDelete) && <Loading />}
      {notes
        ?.filter((note) =>
          note.title.toLowerCase().includes(search.toLowerCase())
        )
        .map((note) => (
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
                  <Button
                    variant="primary"
                    size="md"
                    href={`/note/${note._id}`}
                  >
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
                  <ReactMarkdown>{note.content}</ReactMarkdown>
                  <footer className="blockquote-footer">
                    Created on <i> {note.createdAt.substring(0, 10)}</i>
                  </footer>
                </blockquote>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        ))}
    </MainScreen>
  );
};

export default MyNotes;
