import { Component, OnDestroy, OnInit } from '@angular/core';
import { contactsName } from './app.modal';
import { AppService } from './app.service';
import { finalize, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'SrPhoneBook';
  objContacts: any;
  destroy$ = new Subject<boolean>();
  addContact = false;
  emptyContact : any;
  loading = false;
  constructor(private appService: AppService){}

  ngOnInit(): void {
      this.loading = true;
      this.appService.getContactsList()
      .pipe(takeUntil(this.destroy$), finalize(() => this.loading = false))
      .subscribe(data => {
        this.objContacts = <contactsName[]>data;
        this.objContacts.map((item: contactsName) => item.edit = false);
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
    this.objContacts.sort((a: { firstName: string; }, b: { firstName: string; }) => a.firstName.localeCompare(b.firstName));
  }

  ngOnDestroy(): void {
      this.destroy$.next(true);
      this.destroy$.complete();
  }

}

