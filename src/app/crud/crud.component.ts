import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  DocumentData,
  doc,
  updateDoc,
  deleteDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss'],
})
export class CrudComponent implements OnInit {
  title = 'AngularFirebase';
  userData!: FormGroup;
  userList!: Observable<any>;
  isEdit: boolean = false;
  updateId!: any;
  submitted = false;

  route = '';
  changeActive(route: any) {
    this.route = route;
  }

  constructor(private fb: FormBuilder, private firestore: Firestore) {}

  ngOnInit(): void {
    this.userData = this.fb.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
    this.getData();
  }

  addData() {
    const collectionInstance = collection(this.firestore, 'UserDetails');
    addDoc(collectionInstance, this.userData.value)
      .then((res) => {
        this.userData.reset();
      })
      .catch((error) => {
        console.log('Error ====>', error);
      });

    this.userData.reset();
    this.submitted = false;
  }

  getData() {
    const collectionInstance = collection(this.firestore, 'UserDetails');
    collectionData(collectionInstance, { idField: 'id' }).subscribe(() => {});
    this.userList = collectionData(collectionInstance, { idField: 'id' });
  }

  // updateData(id: any) {
  //   this.isEdit = true;
  //   this.userList.subscribe((res) => {
  //     res.forEach((ele: any) => {
  //       if (ele.id === id) {
  //         this.userData.patchValue({
  //           name: ele.name,
  //           email: ele.email,
  //         });
  //       }
  //     });
  //   });
  //   this.updateId = id;
  //   console.log(this.updateId);
  // }

  editData() {
    console.log(this.userData.value);
    console.log(this.updateId);
    const docInstance = doc(this.firestore, 'UserDetails', this.updateId);
    updateDoc(docInstance, this.userData.value);
    this.resetForm();
  }

  // deleteData(id: any) {
  //   const docInstance = doc(this.firestore, 'UserDetails', id);
  //   deleteDoc(docInstance)
  //     .then(() => {
  //       console.log('Data Deleted');
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  resetForm() {
    this.userData.reset();
    this.submitted = false;
    this.isEdit = false;
  }

  action(type: string, index: any, data: any) {
    if (type == 'edit') {
      this.userData.setValue({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      this.isEdit = true;
    } else if (type == 'delete') {
      alert('Are you sure to Delete Data!!!......');
      const docInstance = doc(this.firestore, 'UserDetails', index);
      deleteDoc(docInstance)
        .then(() => {
          console.log('Data Deleted');
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log('Call Wrong Function......');
    }
    this.updateId = index;
  }

  Submit() {
    this.submitted = true;
    if (this.userData.invalid) {
      return;
    }
    this.isEdit ? this.editData() : this.addData();
  }
}
