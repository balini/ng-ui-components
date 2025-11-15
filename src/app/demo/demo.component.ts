import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SelectOption } from '../components/select/select.types';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent {
  options: SelectOption[] = [
    { value: 'apple', label: 'Apple' },
    { value: 'orange', label: 'Orange' },
    { value: 'banana', label: 'Banana' },
    { value: 'kiwi', label: 'Kiwi' }
  ];
  placeholder = 'Selecione uma fruta';
  selectDisabled = false;
  selected: string | null = null;

  selectControl = new FormControl(null);

  switchValue = false;
  switchDisabled = false;
  switchControl = new FormControl(false);
  switchLog: string[] = [];

  onSwitchChange(v: boolean) {
    this.switchLog.unshift(`${new Date().toLocaleTimeString()}: ${v}`);
  }

  addOption() {
    const next = { value: `opt-${Date.now()}`, label: `Novo ${this.options.length + 1}` };
    this.options = [...this.options, next];
  }

  removeLast() {
    this.options = this.options.slice(0, -1);
  }
}
