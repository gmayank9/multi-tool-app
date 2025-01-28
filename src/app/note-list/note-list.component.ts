import { Component, inject, OnInit } from '@angular/core';
import { NoteService, Note } from '../notes/notes.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-notes-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.css',
})
export class NotesListComponent {
  notes: Note[] = [];
  private _notes = inject(NoteService);
  private _router = inject(Router);
  private _noteService = inject(NoteService);

  ngOnInit(): void {
    this.notes = this._noteService.getNotes();
    if (this.notes.length < 1) {
      console.log('inside if');
      this._router.navigate(['notes-list/note']);
    } else {
      console.log('no data');
    }
    console.log(this.notes);
  }
  onDelete(id: number): void {
    this._noteService.deleteNote(id);
    this.notes = this._noteService.getNotes();
  }
  onEdit(id: number): void {
    this._router.navigate(['notes-list/note'], {
      queryParams: { id: id },
    });
  }
  onAddNote() {
    this._router.navigate(['notes-list/note']);
  }
  gotoHome() {
    this._router.navigate(['']);
  }
}
