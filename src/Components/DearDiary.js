import React, { useEffect, useState } from "react";
import "./DearDiary.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faSignOutAlt,
  faSearch,
  faPlusCircle,
  faPencilAlt,
} from "@fortawesome/fontawesome-free-solid";
import { useNavigate, useParams } from "react-router-dom";
import NoteSectionMobile from "./NoteSectionMobile";
import Note from "./Note";

function DearDiary() {
  const [userId, setUserId] = useState();
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [notes, setNotes] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState("");
  const [currentTitle, setCurrentTitle] = useState("");
  const [currentContent, setCurrentContent] = useState("");
  const [display, setDisplay] = useState(false);
  const [searchNotes, setSearchNotes] = useState([]);
  let { id } = useParams();
  let navigate = useNavigate();
  let btnDisplay = display ? "container-none" : "container";

  const logout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };
  let handleDisplay = () => {
    setDisplay(!display);
  };

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    axios
      .get(`https://dear-diary-backend-blackstatus.herokuapp.com/auth/user`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        setUserId(response.data.id);
      });
    axios
      .get(`https://dear-diary-backend-blackstatus.herokuapp.com/notes/${userId}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        setNotes(response.data);
      });
  }, [userId]);

  function newNote() {
    axios
      .post(
        "https://dear-diary-backend-blackstatus.herokuapp.com/notes",
        {
          userId: id,
          title: noteTitle,
          content: noteContent,
        },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          const addedNote = {
            userId: response.data.userId,
            title: noteTitle,
            content: noteContent,
          };
          setNotes([...notes, addedNote]);
          setNoteContent("");
          setNoteTitle("");
        }
      });
    // window.location.reload();
  }

  const editNote = (id) => {
    axios
      .get(`https://dear-diary-backend-blackstatus.herokuapp.com/notes/edit/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        setCurrentId(id);
        setCurrentTitle(response.data.title);
        setCurrentContent(response.data.content);
        setIsEditing(true);
      });
  };

  const updateNote = () => {
    axios
      .put(
        `https://dear-diary-backend-blackstatus.herokuapp.com/notes/editNote`,
        { id: currentId, title: currentTitle, content: currentContent },
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      )
      .then(() => {
        setNotes(
          notes.map((note) => {
            return note.id === currentId
              ? {
                  id: note.id,
                  title: note.currentTitle,
                  content: note.currentTitle,
                }
              : note;
          })
        );
      });
    // window.location.reload();
  };

  const removeNote = (id) => {
    axios
      .delete(`https://dear-diary-backend-blackstatus.herokuapp.com/notes/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        setNotes(
          notes.filter((note) => {
            return note.id !== id;
          })
        );
      });
  };

  const handleSearchOnChange = (keyword) => {
    if (keyword !== "") {
      setSearchNotes(
        notes.filter((note) => {
          return (
            note.title.toLowerCase().startsWith(keyword.toLowerCase()) ||
            note.content.toLowerCase().startsWith(keyword.toLowerCase())
          );
        })
      );
    } else {
      setSearchNotes([]);
    }
  };

  return (
    <div>
      <div className={btnDisplay}>
        <div className="all-dear-diary-notes-section">
          <div className="header">
            <FontAwesomeIcon className="hamburger-menu" icon={faBars} />
            <h1 className="all-notes">all notes</h1>
            <FontAwesomeIcon
              className="hamburger-menu"
              icon={faSignOutAlt}
              onClick={logout}
            />
          </div>
          <div className="notes-body">
            <div className="search-box">
              <FontAwesomeIcon className="search-icon" icon={faSearch} />
              <input
                type="search"
                className="search"
                placeholder="search notes"
                onChange={(e) => handleSearchOnChange(e.target.value)}
              />
            </div>
          </div>
            <Note
              notes={notes}
              editNote={editNote}
              handleDisplay={handleDisplay}
              removeNote={removeNote}
              searchNotes={searchNotes}
            />
        </div>
        {isEditing ? (
          <div className="dear-diary-note-section">
            <input
              name="editTitle"
              className="content-title"
              placeholder="Title"
              value={currentTitle}
              onChange={(e) => {
                setCurrentTitle(e.target.value);
              }}
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
              onClick={updateNote}
            />
          </div>
        ) : (
          <div className="dear-diary-note-section">
            <input
              name="title"
              className="content-title"
              placeholder="Title"
              onChange={(e) => {
                setNoteTitle(e.target.value);
              }}
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
              onClick={newNote}
            />
          </div>
        )}
        <div className="new-note-container">
          <button className="new-note-btn" onClick={handleDisplay}>
            New
          </button>
        </div>
      </div>
      <NoteSectionMobile
        display={display}
        handleDisplay={handleDisplay}
        setNoteTitle={setNoteTitle}
        setNoteContent={setNoteContent}
        newNote={newNote}
        isEditing={isEditing}
        currentTitle={currentTitle}
        setCurrentTitle={setCurrentTitle}
        currentContent={currentContent}
        setCurrentContent={setCurrentContent}
        updateNote={updateNote}
      />
    </div>
  );
}

export default DearDiary;
