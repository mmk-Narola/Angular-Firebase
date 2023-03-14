import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'AngularFirebase';
  userData!: FormGroup;
  userList!: Observable<any>;
  isEdit: boolean = false;
  updateId!: any;

  route = '';
  changeActive(route: any) {
    this.route = route;
  }

  constructor(private fb: FormBuilder, private firestore: Firestore) {}

  ngOnInit(): void {
    this.userData = this.fb.group({
      name: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
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
  }

  getData() {
    const collectionInstance = collection(this.firestore, 'UserDetails');
    collectionData(collectionInstance, { idField: 'id' }).subscribe(() => {});
    this.userList = collectionData(collectionInstance, { idField: 'id' });
  }

  updateData(id: any) {
    this.isEdit = true;
    this.userList.subscribe((res) => {
      res.forEach((ele: any) => {
        if (ele.id === id) {
          this.userData.patchValue({
            name: ele.name,
            email: ele.email,
          });
        }
      });
    });
    this.updateId = id;
    console.log(this.updateId);
  }

  editData() {
    console.log(this.userData.value);
    console.log(this.updateId);
    const docInstance = doc(this.firestore, 'UserDetails', this.updateId);
    updateDoc(docInstance, this.userData.value);
    this.userData.reset();
  }

  deleteData(id: any) {
    const docInstance = doc(this.firestore, 'UserDetails', id);
    deleteDoc(docInstance)
      .then(() => {
        console.log('Data Deleted');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  Submit() {
    if (!this.isEdit) {
      this.addData();
    } else {
      this.editData();
    }
  }
}
