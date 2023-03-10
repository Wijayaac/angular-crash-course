import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';

import { Task } from 'src/app/Task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();

  subscription: Subscription;
  text: string;
  day: string;
  reminder: boolean = false;
  showAddTask: boolean;

  constructor(private uiService: UiService) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((val) => (this.showAddTask = val));
  }
  ngOnInit(): void {}
  onSubmit() {
    if (!this.text) {
      alert('Please add a task');
      return;
    }
    const newtask = {
      text: this.text,
      day: this.day,
      reminder: this.reminder,
    };

    this.onAddTask.emit(newtask);

    this.text = '';
    this.day = '';
    this.reminder = false;
  }
}
