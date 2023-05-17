import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-shift',
  templateUrl: './add-shift.component.html',
  styleUrls: ['./add-shift.component.scss'],
})
export class AddShiftComponent implements OnInit {
  addShiftForm!: FormGroup;
  name = new FormControl('', [Validators.required]);
  startDate = new FormControl('', [Validators.required]);
  endDate = new FormControl('', [Validators.required]);

  ngOnInit(): void {
    this.addShiftForm = new FormGroup({
      name: this.name,
      startDate: this.startDate,
      endDate: this.endDate,
    });
  }

  onAddShift(): void {}

  getNameErrorMessage(): string {
    if (this.name.hasError('required')) {
      return 'You must enter a value';
    }

    return '';
  }
}
