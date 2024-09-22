import { Component, ElementRef, ViewChild } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
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
  display: boolean = false;
  ukToursForm: AddUkToursModel;
  imageSelectorVisible: boolean = false;

  @ViewChild('filter') filter!: ElementRef;
  statuses!: any[];



  constructor(
    private ukServices: UkToursService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {

  }

  ngOnInit(): void {
    this.ukToursData$ = this.ukServices.getAllUkTours();
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
        this.ukServices.deleteUkTourById(customerId).subscribe((resp) => {
          if (resp) {
            this.ukToursData$ = this.ukServices.getAllUkTours();
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Tour record deleted Successfully' });
          }
        }, (err) => {
          console.log("Error", err);
        })
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Request rejected' });
      }
    });
  }
}
