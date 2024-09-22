import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressBarModule } from 'primeng/progressbar';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { SliderModule } from 'primeng/slider';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { MainRoutingModule } from './main-routing.module';
import { UkToursListComponent } from './components/UK-TOURS/uk-tours-list/uk-tours-list.component';
import { AddUkToursComponent } from './components/UK-TOURS/add-uk-tours/add-uk-tours.component';
import { ImageSelectorComponent } from './shared/components/image-selector/image-selector.component';
import { LoginComponent } from './components/auth/login/login.component';
import { PasswordModule } from 'primeng/password';



@NgModule({
  declarations: [
    UkToursListComponent,
    AddUkToursComponent,
    ImageSelectorComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    TableModule,
    RatingModule,
    ButtonModule,
    SliderModule,
    InputTextModule,
    ToggleButtonModule,
    RippleModule,
    MultiSelectModule,
    DropdownModule,
    ProgressBarModule,
    ToastModule,
    DialogModule,
    CheckboxModule,
    InputGroupModule,
    InputGroupAddonModule,
    MainRoutingModule,
    FileUploadModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    DialogModule,
    ConfirmDialogModule,
    ConfirmPopupModule,
    PasswordModule,
    ReactiveFormsModule
  ],
  providers: [
    ConfirmationService
  ]
})
export class MainModule { }
