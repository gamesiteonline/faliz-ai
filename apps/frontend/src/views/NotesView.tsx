import React, { useState } from 'react';
import { GlassCard } from '@/components/shared/GlassCard';
import { Book, PlusCircle, Edit, Trash2, Save } from 'lucide-react';
import { OracleButton } from '@/components/shared/OracleButton';

interface Note {
  id: string;
  title: string;
  content: string;
  lastModified: string;
}

const mockNotes: Note[] = [
  {
    id: 'n1',
    title: 'Meeting Notes - Project Oracle',
    content: 'Discussed phase 1 deliverables. Need to follow up with John on API specs. Next meeting on Friday.',
    lastModified: '2024-06-12T14:30:00Z',
  },
  {
    id: 'n2',
    title: 'Ideas for FALIZ AI v2',
    content: 'Integrate more smart home devices. Add advanced natural language understanding for proactive suggestions. Improve offline capabilities.',
    lastModified: '2024-06-10T10:00:00Z',
  },
];

const NotesView: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>(mockNotes);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');

  const handleSelectNote = (note: Note) => {
    setSelectedNote(note);
    setIsEditing(false);
  };

  const handleNewNote = () => {
    setSelectedNote(null);
    setIsEditing(true);
    setNewNoteTitle('');
    setNewNoteContent('');
  };

  const handleSaveNote = () => {
    if (newNoteTitle.trim() === '') return;

    if (selectedNote) {
      // Update existing note
      setNotes(notes.map(note => 
        note.id === selectedNote.id 
          ? { ...note, title: newNoteTitle, content: newNoteContent, lastModified: new Date().toISOString() }
          : note
      ));
      setSelectedNote(null);
    } else {
      // Add new note
      const newId = `n${notes.length + 1}`;
      const newNote: Note = {
        id: newId,
        title: newNoteTitle,
        content: newNoteContent,
        lastModified: new Date().toISOString(),
      };
      setNotes([...notes, newNote]);
      setSelectedNote(newNote);
    }
    setIsEditing(false);
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
    if (selectedNote?.id === id) {
      setSelectedNote(null);
    }
  };

  return (
    <div className="p-4 flex h-full">
      <div className="w-1/3 pr-4 border-r border-falizBorder overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-syne font-bold text-falizText">Notes</h1>
          <OracleButton onClick={handleNewNote} className="p-2">
            <PlusCircle size={20} />
          </OracleButton>
        </div>
        <ul className="space-y-2">
          {notes.length > 0 ? (
            notes.map(note => (
              <li 
                key={note.id} 
                className={`p-3 rounded-lg cursor-pointer ${selectedNote?.id === note.id ? 'bg-elevated border border-oracle-DEFAULT' : 'bg-surface hover:bg-falizMuted'}`}
                onClick={() => handleSelectNote(note)}
              >
                <h3 className="font-semibold text-falizText">{note.title}</h3>
                <p className="text-falizMutedText text-sm truncate">{note.content}</p>
                <p className="text-falizMutedText text-xs mt-1">{new Date(note.lastModified).toLocaleDateString()}</p>
              </li>
            ))
          ) : (
            <p className="text-falizMutedText">No notes yet. Click '+' to create one.</p>
          )}
        </ul>
      </div>

      <div className="w-2/3 pl-4 overflow-y-auto">
        {isEditing || selectedNote ? (
          <GlassCard title={selectedNote ? 'Edit Note' : 'New Note'} icon={<Book size={20} className="text-oracle-DEFAULT" />}>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Note Title"
                value={selectedNote && !isEditing ? selectedNote.title : newNoteTitle}
                onChange={(e) => setNewNoteTitle(e.target.value)}
                readOnly={selectedNote && !isEditing}
                className="w-full p-2 rounded bg-void border border-falizBorder focus:outline-none focus:ring-1 focus:ring-oracle-DEFAULT"
              />
              <textarea
                placeholder="Note Content"
                rows={15}
                value={selectedNote && !isEditing ? selectedNote.content : newNoteContent}
                onChange={(e) => setNewNoteContent(e.target.value)}
                readOnly={selectedNote && !isEditing}
                className="w-full p-2 rounded bg-void border border-falizBorder focus:outline-none focus:ring-1 focus:ring-oracle-DEFAULT"
              ></textarea>
              <div className="flex justify-end space-x-2">
                {selectedNote && !isEditing && (
                  <OracleButton onClick={() => setIsEditing(true)} className="p-2">
                    <Edit size={20} className="mr-2" /> Edit
                  </OracleButton>
                )}
                {(isEditing || !selectedNote) && (
                  <OracleButton onClick={handleSaveNote} className="p-2">
                    <Save size={20} className="mr-2" /> Save
                  </OracleButton>
                )}
                {selectedNote && (
                  <OracleButton onClick={() => handleDeleteNote(selectedNote.id)} className="p-2 bg-danger hover:bg-danger/70">
                    <Trash2 size={20} className="mr-2" /> Delete
                  </OracleButton>
                )}
              </div>
            </div>
          </GlassCard>
        ) : (
          <div className="flex items-center justify-center h-full text-falizMutedText">
            <p>Select a note or click '+' to create a new one.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesView;
