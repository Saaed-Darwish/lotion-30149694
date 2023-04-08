function Sidebar({ notes, handleAddNoteClick, handleDeleteClick, activeNote, setActiveNoteFunction }) {
    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <h1>Notes</h1>
                <button onClick={ handleAddNoteClick }>+</button>
            </div>
            <div id="sidebarNotes" className="sidebar-notes">
                {notes.map((note) => (
                    <div className={`sidebar-note ${note.id === activeNote && "active"}`} onClick={() => setActiveNoteFunction(note.id)}>
                        <div className="sidebar-note-title">
                            <strong>{ note.title }</strong>
                            <button onClick={ () => handleDeleteClick(note.id) }>Delete</button>
                        </div>
                        <small className="note-meta">
                            { note.lastModified }
                        </small>
                        <div dangerouslySetInnerHTML={{ __html: note.body.indexOf('</p>') > -1 && note.body.indexOf('</p>') < 100 ? note.body.substring(0, note.body.indexOf('</p>')) + '...</p>' : note.body.substring(0, 100) + '...</p>'}} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Sidebar;