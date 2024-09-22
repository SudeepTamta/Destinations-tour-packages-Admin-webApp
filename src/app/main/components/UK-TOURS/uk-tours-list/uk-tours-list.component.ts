import { Component, ElementRef, ViewChild } from '@angular/core';
import { MessageService, ConfirmationService, Message } from 'primeng/api';
import { Table } from 'primeng/table';
import { Observable } from 'rxjs';
import { AddUkToursModel } from 'src/app/main/models/add-uk-tours.model';
import { UkToursModel } from 'src/app/main/models/uk-tours.model';
import { UkToursService } from 'src/app/main/services/uk-tours.service';

@Component({
  selector: 'app-uk-tours-list',
  templateUrl: './uk-tours-list.component.html',
  styleUrl: './uk-tours-list.component.scss'
})
export class UkToursListComponent {
  ukToursData$?: Observable<UkToursModel[]>;
  loading: boolean = false;
  activityValues: number[] = [0, 100];
  showLoader: boolean = false;
  ukToursForm: AddUkToursModel;
  imageSelectorVisible: boolean = true;

  @ViewChild('filter') filter!: ElementRef;
  statuses!: any[];

  msgs: Message[] = [];

  constructor(
    private ukServices: UkToursService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {

  }

  ngOnInit(): void {
    this.ukToursData$ = this.ukServices.getAllUkTours();
    setTimeout(() => {
      if (this.ukToursData$) {
        this.showLoader = false;
      }
    }, 2000);
    this.statuses = [
      { label: 'Active', value: 'active' },
      { label: 'Inactive', value: 'inactive' },
    ];
  }

  openImageSelector(): void {
    this.imageSelectorVisible = true;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }

  deleteTourById(customerId) {

    // const target = event.target || new EventTarget;
    // console.log(target);
    this.confirmationService.confirm({
      key: 'confirm1',
      message: 'Are you sure to perform this action?',
      accept: () => {
        this.showLoader = true;
        this.ukServices.deleteUkTourById(customerId).subscribe((resp) => {
          if (resp) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Record deleted successfully' });
            this.ukToursData$ = this.ukServices.getAllUkTours();
            this.showLoader = false;
          }
        }, (err) => {
          console.log("Error", err);
          this.showLoader = false;
        })
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Reject', detail: 'Request rejected' });
      }
    });
  }

  showSuccessViaMessages() {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: 'Record deleted successfully', detail: '' });
  }

  showErrorViaMessages() {
    this.msgs = [];
    this.msgs.push({ severity: 'error', summary: 'Request rejected', detail: '' });
  }
}
