import { Component } from '@angular/core';
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  users?: User[];
  currentUser: User = {};
  currentIndex = -1;
  name = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.retrieveTutorials();
  }

  retrieveTutorials(): void {
    this.userService.getAll().subscribe({
      next: (data) => {
        this.users = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

  refreshList(): void {
    this.retrieveTutorials();
    this.currentUser = {};
    this.currentIndex = -1;
  }

  setActiveTutorial(tutorial: User, index: number): void {
    this.currentUser = tutorial;
    this.currentIndex = index;
  }

  removeAllTutorials(): void {
    this.userService.deleteAll().subscribe({
      next: (res) => {
        console.log(res);
        this.refreshList();
      },
      error: (e) => console.error(e)
    });
  }

  searchTitle(): void {
    this.currentUser = {};
    this.currentIndex = -1;

    this.userService.findByTitle(this.name).subscribe({
      next: (data) => {
        this.users = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }
}
