import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
export interface Task {
  id: number;
  title: string;
  completed: boolean;
  isEditing?: boolean;
}
@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private storageKey = 'todo-tasks';  
  private tasks = new BehaviorSubject<Task[]>([]);  
  tasks$ = this.tasks.asObservable();  

  constructor() {
    this.loadTasksFromLocalStorage();  
  }
  addTask(title: string) {
    const currentTasks = this.tasks.getValue();  
    const newTask: Task = { id: Date.now(), title, completed: false }; 
    const updatedTasks = [...currentTasks, newTask];  
    this.saveTasks(updatedTasks);  
  }

  deleteTask(id: number) {
    const updatedTasks = this.tasks.getValue().filter(task => task.id !== id);  
    this.saveTasks(updatedTasks);  
  }
  updateTask(id: number, title: string) {
    const updatedTasks = this.tasks.getValue().map(task =>
      task.id === id ? { ...task, title } : task
    );
    this.saveTasks(updatedTasks);  
  }
  toggleTaskCompletion(id: number) {
    const updatedTasks = this.tasks.getValue().map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    this.saveTasks(updatedTasks);  
  }
  private saveTasks(tasks: Task[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));  
    this.tasks.next(tasks);  
  }
  private loadTasksFromLocalStorage() {
    const stored = localStorage.getItem(this.storageKey);
    if (stored) {
      this.tasks.next(JSON.parse(stored));  
    }
  }
}
