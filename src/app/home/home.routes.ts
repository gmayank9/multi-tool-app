import { Route } from "@angular/router";

export const homeRoutes: Route[] = [
    {
        path:'',
        loadComponent: () => 
            import('./../home/home.component').then((e)=> e.HomeComponent),
       } ,
   {
    path:'todo',
    loadComponent: () => 
        import('./../todo/todo.component').then((e)=> e.TodoComponent),
   } ,
   {
    path:'calculator',
    loadComponent: () => 
        import('./../calculator/calculator.component').then((e)=> e.CalculatorComponent),
   } ,
   {
    path:'notes-list',
    loadChildren: () => 
        import('../notes/notes.routes').then((e)=> e.notesRoutes)
   } 
]