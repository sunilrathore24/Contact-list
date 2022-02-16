import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { createSpyObj } from 'jest-createspyobj';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        {
          provide: AppService,
          useValue: {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            getContactsList(): Observable<any>  {
              return of([
                {
                  "firstName": "Amit",
                  "lastName": "Roy",
                  "phone": "9876543210",
                  "id": 1
                },
                {
                  "firstName": "Aakash",
                  "lastName": "Choudhury",
                  "phone": "9876584431",
                  "id": 2
                },
                {
                  "firstName": "Arun",
                  "lastName": "Dey",
                  "phone": "5748493812",
                  "id": 3
                },
                {
                  "firstName": "Vikash",
                  "lastName": "Trivedi",
                  "phone": "9873625261",
                  "id": 4
                },
                {
                  "firstName": "Gaurav",
                  "lastName": "Gupta",
                  "phone": "7002873284",
                  "id": 5
                }
              ]);
            }
          }
        },
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'SrPhoneBook'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('SrPhoneBook');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('SrPhoneBook app is running!');
  });

  it('should call deleteContact method', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    jest.spyOn(component, 'configureTaskActionData');
    component.deleteContact(2);
    expect(component.deleteContact).toHaveBeenCalled();
    expect(component.deleteContact).toHaveBeenCalledOnceWith(2);
  })

  it('should call saveContent method', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    jest.spyOn(component, 'saveContent');
    component.saveContact();
    expect(component.saveContact).toHaveBeenCalled();
  })

  it('should call openDialog method', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    jest.spyOn(component, 'openDialog');
    component.openDialog();
    expect(component.openDialog).toHaveBeenCalled();
    expect(component.addContact).toBeTruthy();
  })
});
