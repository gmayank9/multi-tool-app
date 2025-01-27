import { Component, inject, OnInit } from '@angular/core';
import { NoteService, Note } from '../notes/notes.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router'; 


@Component({
  selector: 'app-notes-list',
  imports:[CommonModule, RouterModule],
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.css'
  
})
export class NotesListComponent  {
  notes: Note[] = [];
  private _notes = inject(NoteService);

  constructor(private noteService: NoteService, private router: Router) {}

  ngOnInit(): void {
    this.notes = this.noteService.getNotes();
    if(this.notes.length < 1){
      console.log('inside if')
      this.router.navigate(['notes-list/note'])
    } else{
      console.log('no data');
    }
    console.log(this.notes);
  }

  onDelete(id: number): void {
    this.noteService.deleteNote(id);
    this.notes = this.noteService.getNotes();
   
  }
  onEdit(id: number): void {
    this.router.navigate(['notes-list/note'], {
      queryParams: { id: id },
    });
  }

  onAddNote(){
    this.router.navigate(['notes-list/note']);

  }
}
