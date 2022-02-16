import { getTestBed, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest} from '@angular/common/http/testing';
import { AppService } from './app.service';
import { Subscription } from 'rxjs';

describe('AppService', () => {
  let service: AppService;
  let httpMock: HttpTestingController;
  let req: TestRequest;
  let httpReqSubscription: Subscription;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AppService);
    httpMock = getTestBed().get(HttpTestingController);
  });

  afterEach(() => {
    if (httpReqSubscription) {
      httpMock.verify();
      httpReqSubscription.unsubscribe();
    }
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should get contect details', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
        httpReqSubscription = service.getContactsList().subscribe(res => {
          expect(res).toBe(data);
        });
        req = httpMock.expectOne(`https://my-json-server.typicode.com/voramahavir/contacts-mock-response/contacts`);
        expect(req.request.method).toBe('GET');
      });
});


const data = [
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
]
