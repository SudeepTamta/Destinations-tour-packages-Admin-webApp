import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UkToursListComponent } from './components/UK-TOURS/uk-tours-list/uk-tours-list.component';
import { AddUkToursComponent } from './components/UK-TOURS/add-uk-tours/add-uk-tours.component';



@NgModule({
  imports: [RouterModule.forChild([
    { path: 'components/UK-TOURS/uk-tours-list', component: UkToursListComponent },
    { path: 'components/UK-TOURS/add-uk-tours', component: AddUkToursComponent },
    { path: 'components/UK-TOURS/:id', component: AddUkToursComponent }
  ])],
  exports: [
    RouterModule
  ]
})
export class MainRoutingModule { }
