import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { NoteService, Note } from './notes.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router'; 


type StyleKeys = 'fontWeight' | 'fontStyle' | 'textDecoration';

@Component({
  selector: 'app-note',
  standalone: true, 
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'], 
})
export class NoteComponent implements OnInit {
  @ViewChild('contentEditableArea') contentArea!: ElementRef<HTMLDivElement>;
  routePath = '/note-list'
  title: string = '';
  content: string = '';
  notes: Note[] = [];
  public id!: number;
  editingNote: Note | null = null; 
  currentStyle: { [key: string]: string } = {};
  styles = {
    fontWeight: 'normal',
    fontStyle: 'normal',
    textDecoration: 'none',
    
  };
  constructor(private noteService: NoteService , private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.notes = this.noteService.getNotes();
    this.route.queryParams.subscribe(params => {
     this.id = Number(params['id']);
      if (this.id) {
        const notes = this.noteService.getNotes();
        const selectedNote = notes.find(note => note.id === this.id) || null;
  
        if (selectedNote) {

          this.title = selectedNote.title;
          this.content = selectedNote.content;
          this.editingNote = selectedNote; 
        }
      }
    });
    
    
  }

  formatContent(styleKey: StyleKeys, styleValue: string): void {
    if (this.styles[styleKey] === styleValue) {
      this.styles[styleKey] = this.getDefaultStyle(styleKey);
    } else {
      this.styles[styleKey] = styleValue;
    }
  }

  private getDefaultStyle(styleKey: StyleKeys): string {
    const defaults: Record<StyleKeys, string> = {
      fontWeight: 'normal',
      fontStyle: 'normal',
      textDecoration: 'none',
    };
    return defaults[styleKey];
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      if (this.editingNote) {
        this.noteService.updateNote(
          this.editingNote.id, 
          this.title, 
          this.content
        );
      } else {
        const newNote: Note = {
          id: Date.now(),
          title: this.title,
          content: this.content,
        };
        this.noteService.addNote(newNote);
      }
  
      this.title = '';
      this.content = '';
      this.editingNote = null;
      this.notes = this.noteService.getNotes();
    }
  }
  
  deleteNote(id: number): void {
    this.noteService.deleteNote(id);
    this.notes = this.noteService.getNotes();
  }
  editNote(note: Note): void {
    this.editingNote = note;
    this.title = note.title;
    this.content = note.content;
  }
  addNOtes(){
    this.router.navigate(['note/notes-list']);
  }
  gotoList(){
    this.router.navigate(['notes-list']);
  }
  gotoHome(){
    this.router.navigate(['']);
  }
}
