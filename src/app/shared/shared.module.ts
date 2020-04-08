import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { CardComponent } from './card/card.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
  ],
  exports: [
    MaterialModule,
    CardComponent
  ],
  providers: [],
  bootstrap: []
})
export class SharedModule { }
