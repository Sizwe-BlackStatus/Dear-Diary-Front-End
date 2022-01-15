import React from "react";
import "./Note.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/fontawesome-free-solid";

function Note({
  notes,
  removeNote,
  editNote,
  handleDisplay,
  searchNotes,
}) {
  return (
    <div className="note-container">
      {searchNotes.length !== 0
        ? searchNotes.map((note, id) => {
            return (
              <div key={id} className="note-box">
                <h1 className="note-title">{note.title}</h1>
                <p className="note-content">{note.content}</p>
                <div className="update-delete">
                  <FontAwesomeIcon
                    className="edit-note"
                    icon={faPencilAlt}
                    onClick={() => {
                      editNote(note.id);
                      handleDisplay();
                    }}
                  />
                  <FontAwesomeIcon
                    className="delete-note"
                    icon={faTrash}
                    onClick={() => removeNote(note.id)}
                  />
                </div>
              </div>
            );
          })
        : notes.map((note, id) => {
            return (
              <div key={id} className="note-box">
                <h1 className="note-title">{note.title}</h1>
                <p className="note-content">{note.content}</p>
                <div className="update-delete">
                  <FontAwesomeIcon
                    className="edit-note"
                    icon={faPencilAlt}
                    onClick={() => {
                      editNote(note.id);
                      handleDisplay();
                    }}
                  />
                  <FontAwesomeIcon
                    className="delete-note"
                    icon={faTrash}
                    onClick={() => removeNote(note.id)}
                  />
                </div>
              </div>
            );
          })}
    </div>
  );
}

export default Note;
