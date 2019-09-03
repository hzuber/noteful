import React from 'react';

const NotefulContext = React.createContext({
    notes: [],
    folders: [],
    deleteNote: () => {},
    addFolder: () => {},
    addNote: () => {},
    setError: () => {}
})

export default NotefulContext