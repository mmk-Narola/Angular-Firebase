import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FireAuthComponent } from './fire-auth/fire-auth.component';
import { CrudComponent } from './crud/crud.component';

const routes: Routes = [
  {
    path: '',
    component: CrudComponent,
  },
  {
    path: 'crud',
    component: CrudComponent,
  },
  {
    path: 'auth',
    component: FireAuthComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
