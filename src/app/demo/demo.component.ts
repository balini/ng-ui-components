import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SelectOption } from '../components/select/select.types';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {
  optionsNgModel: SelectOption[] = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'orange', label: 'Orange' }
  ];

  optionsReactive: SelectOption[] = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'orange', label: 'Orange' }
  ];

  // ngModel 
  selected: string | null = null;
  switchValue = false;
  selectDisabledNgModel = false;

  // reactive form
  form = new FormGroup({
    fruit: new FormControl<string | null>(null),
    featureSwitch: new FormControl<boolean>(false)
  });

  // inputs label and value
  newLabelNg = '';
  newValueNg = '';
  newLabelReactive = '';
  newValueReactive = '';

  constructor() {}

  ngOnInit(): void {
    this.form.get('featureSwitch')?.valueChanges.subscribe(value => {
      if (value === true) {
        this.form.get('fruit')?.disable({ emitEvent: false });
      } else {
        this.form.get('fruit')?.enable({ emitEvent: false });
      }
    });
  }

  // ---------- ngModel Select ----------
  addOptionNgModel() {
    const label = (this.newLabelNg || this.newValueNg).trim();
    const value = (this.newValueNg || this.newLabelNg).trim();
    if (!label || !value) return;
    this.optionsNgModel = [...this.optionsNgModel, { value, label }];
    this.newLabelNg = '';
    this.newValueNg = '';
  }

  removeLastOptionNgModel() {
    if (this.optionsNgModel.length === 0) { return; }
    this.optionsNgModel = this.optionsNgModel.slice(0, -1);
    if (this.selected && !this.optionsNgModel.find(o => o.value === this.selected)) {
      this.selected = null;
    }
  }

  // ---------- Reactive Select ----------
  addOptionReactive() {
    const label = (this.newLabelReactive || this.newValueReactive).trim();
    const value = (this.newValueReactive || this.newLabelReactive).trim();
    if (!label || !value) return;
    this.optionsReactive = [...this.optionsReactive, { value, label }];
    this.newLabelReactive = '';
    this.newValueReactive = '';
  }

  removeLastOptionReactive() {
    if (this.optionsReactive.length === 0) { return; }
    this.optionsReactive = this.optionsReactive.slice(0, -1);
    const current = this.form.get('fruit')?.value;
    if (current && !this.optionsReactive.find(o => o.value === current)) {
      this.form.get('fruit')?.setValue(null, { emitEvent: false });
    }
  }

  onNgModelSwitchChange(val: boolean) {
    this.selectDisabledNgModel = !!val;
    if (this.selectDisabledNgModel) {
      this.selected = null; 
    }
  }

}
