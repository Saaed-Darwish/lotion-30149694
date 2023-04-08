import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import React, { useState, useEffect } from 'react';

function Main({ activeNote, updateNote, editMode, handleSavedClick, handleEditClick }) {
    const [editedBody, setEditedBody] = useState("");

    useEffect(() => {
        if (activeNote) {
            setEditedBody(activeNote.body);
        }
    }, [activeNote]);

    const editTitle = (key, value) => {
        updateNote({
            ...activeNote,
            [key]: value,
        });
    };

    const saveBody = (value) => {
        updateNote({
            ...activeNote,
            body: value,
        });
    };

    const handleBodyChange = (value) => {
        setEditedBody(value);
        saveBody(value);
    };

    if (!activeNote) {
        return (
            <div className="no-active-note">Select a note, or create a new one.</div>
        );
    }

    if (editMode) {
        return (
            <div className="main">
                <button className="save-button" onClick={() => { handleSavedClick() }}>save</button>
                <div className="main-note-edit">
                    <input type="text" id="title" value={activeNote.title} onChange={(e) => editTitle("title", e.target.value)} />
                    <ReactQuill
                        id="body"
                        value={editedBody}
                        onChange={(value) => handleBodyChange(value)}
                        placeholder="Your Note Here"
                    />
                </div>
            </div>
        );
    }
    if (!editMode) {
        return (
            <div className="main">
                <button className="edit-button" onClick={handleEditClick}>edit</button>
                <div className="main-note-saved">
                    <h1 className="saved-title">{activeNote.title}</h1>
                    <div className="saved-note" dangerouslySetInnerHTML={{ __html: activeNote.body }} />
                </div>
            </div>
        );
    }
    return <p>ERROR</p>;
}

export default Main;