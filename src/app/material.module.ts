//Material imports
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';

@NgModule({
    exports: [
        MatRadioModule,
        MatFormFieldModule,
        MatToolbarModule,
        MatInputModule,
        MatListModule,
        MatDividerModule,
        MatIconModule,
        MatCheckboxModule,
        MatButtonModule,
    ],
  })
  export class MaterialModule { }
