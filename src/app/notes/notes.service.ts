import { Injectable } from '@angular/core';

export interface Note {
  id: number;
  title: string;
  content: string;
}
@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private storageKey = 'notes';

  constructor() {}

  public getNotes(): Note[] {
    const notes = localStorage.getItem(this.storageKey);
    return notes ? JSON.parse(notes) : [];
  }

  addNote(note: Note): void {
    const notes = this.getNotes();
    notes.push(note);
    localStorage.setItem(this.storageKey, JSON.stringify(notes));
  }

  generateNoteNumber(notes: Note[]): number {
    return notes.length + 1;
  }

  deleteNote(id: number) {
    let notes = this.getNotes();
    notes = notes.filter((note) => note.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(notes));
  }

  public updateNote(id: number, title: string, content: string) {
    const notes = this.getNotes();
    const index = notes.findIndex((note) => note.id === id);
    if (index > -1) {
      notes[index] = { ...notes[index], title, content };
      localStorage.setItem(this.storageKey, JSON.stringify(notes));
    }
  }
}
