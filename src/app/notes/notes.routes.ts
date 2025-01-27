import { Route } from "@angular/router";

export const notesRoutes: Route[] = [
    {
        path:'',
        loadComponent: () => 
            import('../note-list/note-list.component').then((e)=> e.NotesListComponent),
       } ,
       {
        path:'note',
        loadComponent: () => 
            import('../notes/notes.component').then((e)=> e.NoteComponent),
       } ,
]