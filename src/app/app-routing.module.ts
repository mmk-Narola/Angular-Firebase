import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FireAuthComponent } from './fire-auth/fire-auth.component';
import { CrudComponent } from './crud/crud.component';
import { FileUploadComponent } from './file-upload/file-upload.component';

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
  {
    path: 'file-upload',
    component: FileUploadComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
