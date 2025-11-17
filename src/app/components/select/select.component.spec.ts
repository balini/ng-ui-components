import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { SelectComponent } from './select.component';
import { SelectOption } from './select.types';
import { DebugElement } from '@angular/core';

describe('SelectComponent', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;
  let hostEl: DebugElement;

  const OPTIONS: SelectOption[] = [
    { value: 'a', label: 'Alpha' },
    { value: 'b', label: 'Bravo' },
    { value: 'c', label: 'Charlie' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectComponent],
      imports: [FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
    hostEl = fixture.debugElement;
    component.options = OPTIONS;
    component.placeholder = 'Escolha';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show placeholder when no value selected', () => {
    const valueEl: HTMLElement = hostEl.query(By.css('.select-value')).nativeElement;
    expect(valueEl.textContent?.trim()).toBe('Escolha');
  });

  it('should open the list when toggled (click)', () => {
    const control = hostEl.query(By.css('.select-control')).nativeElement as HTMLElement;
    control.click();
    fixture.detectChanges();
    expect(component.isOpen).toBeTruthy();
    const list = hostEl.query(By.css('.select-list'));
    expect(list).toBeTruthy();
    const items = hostEl.queryAll(By.css('.select-list li'));
    expect(items.length).toBe(OPTIONS.length);
  });

  it('should select an option on click and emit selectionChange', () => {
    const spy = spyOn(component.selectionChange, 'emit');
    hostEl.query(By.css('.select-control')).nativeElement.click();
    fixture.detectChanges();

    const items = hostEl.queryAll(By.css('.select-list li'));
    items[1].nativeElement.click();
    fixture.detectChanges();

    expect(component.value).toBe('b');
    expect(spy).toHaveBeenCalledWith('b');

    const valueEl: HTMLElement = hostEl.query(By.css('.select-value')).nativeElement;
    expect(valueEl.textContent?.trim()).toBe('Bravo');
  });

  it('should not open when disabled', () => {
    component.disabled = true;
    fixture.detectChanges();
    hostEl.query(By.css('.select-control')).nativeElement.click();
    fixture.detectChanges();
    expect(component.isOpen).toBeFalsy();
    expect(hostEl.query(By.css('.select-list'))).toBeNull();
  });

  it('should support keyboard navigation (open with Enter and navigate)', () => {
    const hostNative: HTMLElement = hostEl.nativeElement;
    const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
    hostNative.dispatchEvent(enterEvent);
    fixture.detectChanges();
    expect(component.isOpen).toBeTruthy();

    const downEvent = new KeyboardEvent('keydown', { key: 'ArrowDown' });
    hostNative.dispatchEvent(downEvent);
    fixture.detectChanges();
    expect(component.focusedIndex).toBeGreaterThanOrEqual(0);

    const enterEvent2 = new KeyboardEvent('keydown', { key: 'Enter' });
    hostNative.dispatchEvent(enterEvent2);
    fixture.detectChanges();
    expect(component.value).toBeTruthy();
  });

  it('should implement writeValue and update DOM accordingly', () => {
    component.writeValue('c');
    fixture.detectChanges();
    const valueEl: HTMLElement = hostEl.query(By.css('.select-value')).nativeElement;
    expect(valueEl.textContent?.trim()).toBe('Charlie');
  });
});
