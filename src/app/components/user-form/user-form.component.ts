import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  user: User = { nombre: '', apellido: '', correo: '', numero: '', edad: '' };
  forma!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    this.crearForm();
  }

  edit: boolean = false;
  ngOnInit(): void {
    const params = this.activeRoute.snapshot.params;
    if (params) {
      console.log(params['id']);
      this.userService.getUser(params['id']).subscribe(
        (res) => {
          console.log(res);
          this.user = res;
          this.edit = true;
        },
        (err) => console.log(err)
      );
    }
  }
  get nombreValid() {
    return (
      this.forma.get('nombre')?.invalid && this.forma.get('nombre')?.touched
    );
  }
  get apeValid() {
    return (
      this.forma.get('apellido')?.invalid && this.forma.get('apellido')?.touched
    );
  }
  get correoValid() {
    return (
      this.forma.get('correo')?.invalid && this.forma.get('correo')?.touched
    );
  }
  get telValid() {
    return (
      this.forma.get('numero')?.invalid && this.forma.get('numero')?.touched
    );
  }
  get edadValid() {
    return this.forma.get('edad')?.invalid && this.forma.get('edad')?.touched;
  }
  crearForm() {
    this.forma = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      numero: ['', Validators.required],
      correo: ['', Validators.required],
      edad: ['', Validators.required],
    });
  }

  submitUser() {
    if (this.forma.invalid) {
      return Object.values(this.forma.controls).forEach((c) => {
        c.markAllAsTouched();
      });
    }
    console.log(this.user);
    this.userService.createUser(this.user).subscribe((res) => {
      this.router.navigate(['/users']);
    });
  }
  updateUser() {
    if (this.forma.invalid) {
      return Object.values(this.forma.controls).forEach((c) => {
        c.markAllAsTouched();
      });
    } else {
      this.userService.updateUser(this.user.id, this.user).subscribe(
        (res) => {
          console.log(res);
          this.router.navigate(['/users']);
        },
        (err) => console.log(err)
      );
    }
  }
}
