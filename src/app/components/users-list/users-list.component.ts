import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(
      (res) => (this.users = res),
      (err) => console.log(err)
    );
  }

  deleteUser(id:any): void {
    this.userService.deleteUser(id).subscribe(
      (res) => {
        console.log(res);
        this.getUsers();
      },
      (err) => console.log(err)
    );
  }

  // Resto del código...
}
