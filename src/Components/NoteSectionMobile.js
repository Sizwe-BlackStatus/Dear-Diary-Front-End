import React from "react";
import "./NoteSectionMobile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faPlusCircle } from "@fortawesome/fontawesome-free-solid";
function NoteSectionMobile({
  display,
  handleDisplay,
  setNoteTitle,
  setNoteContent,
  newNote,
  isEditing,
  currentTitle,
  setCurrentTitle,
  currentContent,
  setCurrentContent,
  updateNote,
}) {
  return display ? (
    isEditing ? (
      <div className="note-section-mobile-container">
        <input
          name="title"
          className="content-title"
          placeholder="Title"
          value={currentTitle}
          onChange={(e) => setCurrentTitle(e.target.value)}
        />
        <textarea
          name="content"
          className="content"
          placeholder="What's on your mind..."
          rows="6"
          value={currentContent}
          onChange={(e) => setCurrentContent(e.target.value)}
        />
        <FontAwesomeIcon
          className="add-note"
          icon={faPencilAlt}
          onClick={() => {
            updateNote();
            handleDisplay();
          }}
        />
        <div className="new-note-container">
          <button className="back-btn" onClick={handleDisplay}>
            back
          </button>
        </div>
      </div>
    ) : (
      <div className="note-section-mobile-container">
        <input
          name="title"
          className="content-title"
          placeholder="Title"
          onChange={(e) => setNoteTitle(e.target.value)}
        />
        <textarea
          name="content"
          className="content"
          placeholder="What's on your mind..."
          rows="6"
          onChange={(e) => setNoteContent(e.target.value)}
        />
        <FontAwesomeIcon
          className="add-note"
          icon={faPlusCircle}
          onClick={() => {
            newNote();
            handleDisplay();
          }}
        />
        <div className="new-note-container">
          <button className="back-btn" onClick={handleDisplay}>
            back
          </button>
        </div>
      </div>
    )
  ) : null;
}

export default NoteSectionMobile;
