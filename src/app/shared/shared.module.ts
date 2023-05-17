import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular Material modules
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

// Shared components
import { NavbarComponent } from './components/navbar/navbar.component';

const MATERIAL_MODULES = [
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatMenuModule,
  MatSnackBarModule,
  MatDialogModule,
  MatDatepickerModule,
];

@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule, ...MATERIAL_MODULES],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    ...MATERIAL_MODULES,
    NavbarComponent,
    MatNativeDateModule,
  ],
})
export class SharedModule {}
