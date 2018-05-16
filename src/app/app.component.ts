import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  todoList = [];
  todoItemText: string = "Learn Angular ...";
  todoTextBoolean: boolean = false;
  todoItemTextEdit: string = "lol";
  priority: number = 0;
  priorityBoolean: boolean = false;
  priorityEdit: number = 0;
  index: number = 0;
  editBoolean: boolean = false;
  editErrorBoolean: boolean = false;
  constructor() { }

  ngOnInit() {

  }


  addTodoItem() {

    if (this.todoItemText === "") {
      this.todoTextBoolean = true;
    } else if (this.priority === 0) {
      this.priorityBoolean = true;
    } else {
      const newTodo = {
        text: this.todoItemText,
        priority: this.priority,
        editable: false,
        index: this.index
      }
      this.todoList.push(newTodo);
      this.index++;
      //sorts smallest to largest
      this.todoList.sort((a, b) => { return (a.priority > b.priority) ? 1 : ((b.priority > a.priority) ? -1 : 0); });
      this.todoItemText = "";
      this.priority = 0;
      this.todoTextBoolean = false;
      this.priorityBoolean = false;
    }
  }
  removeTodoItem(index) {
    for (let i = 0; i < this.todoList.length; i++) {
      if (this.todoList[i].index === index) {
        this.todoList.splice(i, 1);
      }
    }


  }

  editTodoItem(index) {
    if (this.editBoolean === true) {
        this.editErrorBoolean = true;
    } else {
      for (let i = 0; i < this.todoList.length; i++) {
        if (this.todoList[i].index === index) {
          this.todoItemTextEdit = this.todoList[i].text
          this.priorityEdit = this.todoList[i].priority
          this.todoList[i].editable = true;
        }
      }
      this.todoList.sort((a, b) => { return (a.priority > b.priority) ? 1 : ((b.priority > a.priority) ? -1 : 0); });
      this.editBoolean = true;
    }
  }
  saveTodoItem(index) {
    for (let i = 0; i < this.todoList.length; i++) {
      if (this.todoList[i].index === index) {
        this.todoList.splice(i, 1);
        const newTodo = {
          text: this.todoItemTextEdit,
          priority: this.priorityEdit,
          editable: false,
          index: index
        }
        this.todoList.push(newTodo);
        this.editBoolean = false;
        this.editErrorBoolean = false;
      }
    }
    //sorts smallest to largest
    this.todoList.sort((a, b) => { return (a.priority > b.priority) ? 1 : ((b.priority > a.priority) ? -1 : 0); });
    this.todoItemTextEdit = "";
    this.priorityEdit = 0;
  }

  cancel(index) {
    for (let i = 0; i < this.todoList.length; i++) {
      if (this.todoList[i].index === index) {
        this.todoList[i].editable = false;
        this.editBoolean = false;
        this.editErrorBoolean = false;
      }
    }
  }

}
