import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit3, Trash2, Save } from "lucide-react";

interface Note {
  id: string;
  content: string;
  timestamp: Date;
  category: string;
}

const QuickNotes = () => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      content: 'Remember to read Surah Al-Kahf on Friday',
      timestamp: new Date(),
      category: 'spiritual'
    },
    {
      id: '2',
      content: 'Study plan: Focus on algorithms next week',
      timestamp: new Date(Date.now() - 86400000),
      category: 'study'
    }
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');

  const addNote = () => {
    if (newNote.trim()) {
      const note: Note = {
        id: Date.now().toString(),
        content: newNote,
        timestamp: new Date(),
        category: 'general'
      };
      setNotes([note, ...notes]);
      setNewNote('');
      setIsAdding(false);
    }
  };

  const startEdit = (note: Note) => {
    setEditingId(note.id);
    setEditContent(note.content);
  };

  const saveEdit = () => {
    setNotes(notes.map(note => 
      note.id === editingId 
        ? { ...note, content: editContent }
        : note
    ));
    setEditingId(null);
    setEditContent('');
  };

  const deleteNote = (noteId: string) => {
    setNotes(notes.filter(note => note.id !== noteId));
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return date.toLocaleDateString();
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'spiritual': return 'bg-gradient-spiritual text-accent-foreground';
      case 'study': return 'bg-gradient-success text-success-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <Card className="shadow-soft animate-fade-in">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <span>📝</span>
            <span>Quick Notes</span>
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsAdding(true)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Add New Note */}
        {isAdding && (
          <div className="space-y-3 p-3 border rounded-lg bg-muted/30">
            <Textarea
              placeholder="Write your note..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              className="min-h-[80px] resize-none"
            />
            <div className="flex justify-end space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsAdding(false);
                  setNewNote('');
                }}
              >
                Cancel
              </Button>
              <Button size="sm" onClick={addNote}>
                <Save className="h-3 w-3 mr-1" />
                Save
              </Button>
            </div>
          </div>
        )}

        {/* Notes List */}
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {notes.map((note) => (
            <div 
              key={note.id}
              className="p-3 border rounded-lg hover:bg-muted/50 transition-colors duration-200"
            >
              {editingId === note.id ? (
                <div className="space-y-3">
                  <Textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="min-h-[60px] resize-none"
                  />
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setEditingId(null);
                        setEditContent('');
                      }}
                    >
                      Cancel
                    </Button>
                    <Button size="sm" onClick={saveEdit}>
                      Save
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-start justify-between mb-2">
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${getCategoryColor(note.category)}`}
                    >
                      {note.category}
                    </Badge>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => startEdit(note)}
                      >
                        <Edit3 className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-destructive hover:text-destructive"
                        onClick={() => deleteNote(note.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <p className="text-sm text-foreground mb-2 leading-relaxed">
                    {note.content}
                  </p>
                  
                  <p className="text-xs text-muted-foreground">
                    {formatTimestamp(note.timestamp)}
                  </p>
                </>
              )}
            </div>
          ))}
        </div>

        {notes.length === 0 && !isAdding && (
          <div className="text-center py-8 text-muted-foreground">
            <span className="text-2xl mb-2 block">💭</span>
            <p>No notes yet. Click + to add one!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QuickNotes;