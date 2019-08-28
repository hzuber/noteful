import React from 'react';

const NotefulContext = React.createContext({
    notes: [],
    folders: [],
    deleteBookmark: () => {},
})

export default NotefulContext