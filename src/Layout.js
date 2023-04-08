function Layout() {
    return (
        <>
            <div className="App">
                <div className="title-lotion"><h1>Lotion</h1></div>
                <Sidebar notes={notes} handleAddNoteClick={handleAddNoteClick} handleDeleteClick={handleDeleteClick} formatDate={formatDate} activeNote={activeNote} setActiveNoteFunction={setActiveNoteFunction} />
                <Main activeNote={getActiveNote()} updateNote={updateNote} editMode={editMode} handleSavedClick={handleSavedClick} handleEditClick={handleEditClick} />
            </div>
        </>
    );
}