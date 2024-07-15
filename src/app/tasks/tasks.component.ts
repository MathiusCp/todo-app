import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';

interface Task {
    id?: number;
    title: string;
    description: string;
}

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
    tasks: Task[] = [];
    newTask: Task = { title: '', description: '' };

    constructor(private taskService: TaskService) {}

    ngOnInit() {
        this.loadTasks();
    }

    loadTasks() {
        this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
    }

    addTask() {
        if (this.newTask.title && this.newTask.description) {
            this.taskService.addTask(this.newTask).subscribe((task) => {
                this.tasks.push(task);
                this.newTask = { title: '', description: '' };
            });
        }
    }
}
