import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  BASE_URL: string = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.BASE_URL}/user`);
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.BASE_URL}/user/${id}`);
  }

  createUser(User: User): Observable<User> {
    return this.http.post<User>(`${this.BASE_URL}/user/create`, User);
  }

  deleteUser(id: number): Observable<User> {
    console.log(id);
    return this.http.delete<User>(`${this.BASE_URL}/User/delete/${id}`);
  }

  updateUser(id: any, User: User): Observable<User> {
    return this.http.put<User>(`${this.BASE_URL}/User/update/${id}`, User);
  }
}
