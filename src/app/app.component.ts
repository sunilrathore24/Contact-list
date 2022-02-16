import { Component, OnInit } from '@angular/core';
import { contactsName } from './app.modal';
import { AppService } from './app.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'SrPhoneBook';
  objContacts: any;
  destroy$ = new Subject<boolean>();
  addContact = false;
  emptyContact : any;
  constructor(private appService: AppService){}

  ngOnInit(): void {
      this.appService.getContactsList()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.objContacts = <contactsName[]>data;
        this.objContacts.map((item: contactsName) => item.edit = false);
        console.log(data);
      });
  }

  deleteContact(id: number): void {
    const index = this.objContacts.map((e: { id: any; }) => e.id).indexOf(id);
    this.objContacts.splice(index , 1);
  }

  openDialog(): void {

    this.emptyContact = {
      firstName : '',
      lastName: '',
      phone: '',
      Id: this.objContacts.length + 1
    }
    this.addContact = true;
  }

  saveContact(): void {
    this.addContact = false;
    this.objContacts.unshift(this.emptyContact);
  }

}

