import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteNoteAction, updateNoteAction } from "../../actions/noteActions";
import ErrorMessage from "../../component/ErrorMessage";
import Loading from "../../component/Loading";
import MainScreen from "../../component/MainScreen";

const SingleNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { loading, error } = noteUpdate;

  const params = useParams();
  // console.log(params);

  useEffect(() => {
    const fetchNoteData = async () => {
      const { data } = await axios.get(`/api/notes/${params.id}`);
      setTitle(data.title);
      setContent(data.content);
      setCategory(data.category);
      setDate(data.updatedAt);
    };
    fetchNoteData();
  }, [params.id, date]);

  const updateHandler = (e) => {
    e.preventDefault();
    if (!title || !content || !category) return;
    dispatch(updateNoteAction(params.id, title, content, category));
    resetHandler();
    navigate("/mynotes");
  };

  const resetHandler = () => {
    setTitle("");
    setContent("");
    setCategory("");
  };

  const deleteHandler = () => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNoteAction(params.id));
      navigate("/mynotes");
    }
  };

  return (
    <MainScreen title="Edit Note">
      <Card>
        <Card.Header>Edit your Note</Card.Header>
        <Card.Body>
          {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
          <Form onSubmit={updateHandler}>
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                placeholder="Enter Title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formContent">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                value={content}
                placeholder="Enter Content Here"
                rows={4}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
            {content && (
              <Card className="my-2">
                <Card.Header>Note Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}

            <Form.Group className="mb-3" controlId="formCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                value={category}
                placeholder="Enter Category"
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            {loading && <Loading size={50} />}
            <Button variant="primary" type="submit">
              Update Note
            </Button>
            <Button className="mx-2" variant="danger" onClick={deleteHandler}>
              Delete Note
            </Button>
          </Form>
        </Card.Body>
        <Card.Footer className="text-muted">
          Updated on - {date.substring(0, 10)}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
};

export default SingleNote;
