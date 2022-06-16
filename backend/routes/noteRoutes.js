const express = require("express");
const {
  getNotes,
  createNote,
  getNotesById,
  updateNote,
  deleteNote,
} = require("../controllers/noteController");
const protect = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").get(protect, getNotes);
router.route("/create").post(protect, createNote);
router
  .route("/:id")
  .get(getNotesById)
  .put(protect, updateNote)
  .delete(protect, deleteNote);

module.exports = router;