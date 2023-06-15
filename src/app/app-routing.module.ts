import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';
const routes: Routes = [
  { path: '', component: UsersListComponent },
  { path: 'users', component: UsersListComponent },

  {
    path: 'user/create',
    component: UserFormComponent,
  },
  {
    path: 'user/edit/:id',
    component: UserFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
