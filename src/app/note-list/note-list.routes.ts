import { Route } from "@angular/router";

export const notesRoutes: Route[] = [
    {
        path:'',
        loadComponent: () => 
            import('../notes/notes.component').then((e)=> e.NoteComponent),
       } ,
       {
        path:'note/:noteId',
        loadComponent: () => 
        import('../note-list/note-list.component').then((e)=> e.NotesListComponent),
       } ,

]