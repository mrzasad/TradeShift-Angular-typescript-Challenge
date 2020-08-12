import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">{{ company.name }}</h4>
      <button
        type="button"
        class="close"
        aria-label="Close"
        (click)="activeModal.dismiss('Cross click')"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <div class="row">
        <div class="col-sm-12">
          <strong class="col-sm-12">COMPANY REGISTRATION NUMBER</strong>
          <p class="col-sm-12">{{ company.registrationNumber }}</p>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12">
          <strong class="col-sm-12">VAT NUMBER</strong>
          <p class="col-sm-12">{{ company.vatNumber }}</p>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-12">
          <strong class="col-sm-12">REGISTERED ADDRESS</strong>
          <p class="col-sm-12">{{ company.address }}</p>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-12">
          <strong class="col-sm-12">COUNTRY</strong>
          <p class="col-sm-12">{{ company.country }}</p>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-12">
          <strong class="col-sm-12">ADDITIONAL STATUS DETAILS</strong>
          <p class="col-sm-12">
            {{ company.additionalStatusDetails.join(',') }}
          </p>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-12">
          <strong class="col-sm-12">COMPANY DESCRIPTION</strong>
          <p class="col-sm-12">{{ company.description }}</p>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-outline-dark"
        (click)="activeModal.close('Close click')"
      >
        Close
      </button>
    </div>
  `,
})
export class NgbdModalContent {
  @Input() company;

  constructor(public activeModal: NgbActiveModal) {}
}

@Component({
  selector: 'message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent implements OnInit {
  filter: {};
  searchFilter: any;
  companies: any;
  countries: any;
  baseUrl = 'http://localhost:4005/api/v1';

  getCountries() {
    this.http.get(`${this.baseUrl}/countries/`).subscribe((list) => {
      this.countries = list['response'];
    });
  }

  constructor(private http: HttpClient, private modalService: NgbModal) {
    this.companies = [];
    this.searchFilter = {
      country_name: '',
      company_name: '',
    };
    this.getCountries();
  }

  open(company) {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.company = company;
  }

  searchByCompany(filter) {
    this.http
      .get(
        `${this.baseUrl}/countries/${filter.country_name}/companies/${filter.company_name}`
      )
      .subscribe((list) => {
        this.companies = list['response'];
      });
  }
  ngOnInit(): void {}

  search(event) {
    this.searchFilter = {
      country_name: event.target[0].value,
      company_name: event.target[1].value,
    };
    this.searchByCompany(this.searchFilter);
    event.preventDefault();
  }
}
