import { Component, OnInit } from '@angular/core';
import { TodoService, Task } from './todo.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
})
export class TodoComponent implements OnInit {
  newTask = '';
  tasks: Task[] = [];

  constructor(private todoService: TodoService, private router: Router) {}

  ngOnInit(): void {
    this.todoService.tasks$.subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });
  }
  onInputChange(event: string) {
    console.log('ngModelChange event fired. New value:', event);
  }

  addTask() {
    if (this.newTask.trim()) {
      this.todoService.addTask(this.newTask.trim());
      this.newTask = '';
    }
  }

  deleteTask(id: number) {
    this.todoService.deleteTask(id);
  }

  toggleTask(id: number) {
    this.todoService.toggleTaskCompletion(id);
  }
  enableEdit(id: number) {
    this.tasks = this.tasks.map((task) =>
      task.id === id ? { ...task, isEditing: true } : task
    );
  }
  saveUpdate(id: number) {
    const taskToUpdate = this.tasks.find((task) => task.id === id);
    if (taskToUpdate) {
      taskToUpdate.isEditing = false;
      this.todoService.updateTask(id, taskToUpdate.title);
    }
  }
  trackById(index: number, task: Task): number {
    return task.id;
  }
  gotoHome() {
    this.router.navigate(['']);
  }
}
