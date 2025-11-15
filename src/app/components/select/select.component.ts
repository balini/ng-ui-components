import {
  Component,
  forwardRef,
  Input,
  Output,
  EventEmitter,
  HostListener,
  ElementRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectOption } from './select.types';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})
export class SelectComponent implements ControlValueAccessor {
  @Input() options: SelectOption[] = [];
  @Input() placeholder = 'Selecione...';
  @Input() disabled = false;
  @Output() openedChange = new EventEmitter<boolean>();
  @Output() selectionChange = new EventEmitter<string | null>();

  isOpen = false;
  focusedIndex = -1;
  value: string | null = null;

  onChange = (v: any) => {};
  onTouched = () => {};

  constructor(private host: ElementRef<HTMLElement>) {}

  writeValue(obj: any): void {
    this.value = obj === undefined ? null : obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  toggle() {
    if (this.disabled) return;
    this.isOpen = !this.isOpen;
    this.openedChange.emit(this.isOpen);
    if (this.isOpen) {
      this.focusedIndex = this.options.findIndex(o => o.value === this.value);
      if (this.focusedIndex === -1) this.focusedIndex = 0;
    }
  }

  selectOption(opt: SelectOption) {
    if (this.disabled) return;
    this.value = opt.value;
    this.onChange(this.value);
    this.onTouched();
    this.selectionChange.emit(this.value);
    this.isOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onOutsideClick(event: MouseEvent) {
    if (!this.isOpen) return;
    const target = event.target as Node;
    if (!this.host.nativeElement.contains(target)) {
      this.isOpen = false;
    }
  }

  @HostListener('keydown', ['$event'])
  handleKeydown(event: KeyboardEvent) {
    if (this.disabled) return;

    if (!this.isOpen && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      this.toggle();
      return;
    }

    if (this.isOpen) {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        this.focusedIndex = Math.min(this.focusedIndex + 1, this.options.length - 1);
        this.scrollIntoViewIfNeeded();
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        this.focusedIndex = Math.max(this.focusedIndex - 1, 0);
        this.scrollIntoViewIfNeeded();
      } else if (event.key === 'Escape') {
        this.isOpen = false;
      } else if (event.key === 'Enter') {
        event.preventDefault();
        const opt = this.options[this.focusedIndex];
        if (opt) this.selectOption(opt);
      } else if (event.key === 'Home') {
        this.focusedIndex = 0;
        this.scrollIntoViewIfNeeded();
      } else if (event.key === 'End') {
        this.focusedIndex = this.options.length - 1;
        this.scrollIntoViewIfNeeded();
      }
    }
  }

  private scrollIntoViewIfNeeded() {
    // optional: could query the list item and scroll into view
  }

  get selectedLabel() {
    return this.options.find(o => o.value === this.value)?.label || this.placeholder;
  }
}
