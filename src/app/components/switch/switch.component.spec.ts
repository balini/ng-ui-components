import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { SwitchComponent } from './switch.component';
import { DebugElement } from '@angular/core';

describe('SwitchComponent', () => {
  let component: SwitchComponent;
  let fixture: ComponentFixture<SwitchComponent>;
  let hostEl: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SwitchComponent],
      imports: [FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(SwitchComponent);
    component = fixture.componentInstance;
    hostEl = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reflect writeValue in DOM (aria-checked)', () => {
    component.writeValue(true);
    fixture.detectChanges();
    const btn = hostEl.query(By.css('button')).nativeElement as HTMLButtonElement;
    expect(btn.getAttribute('aria-checked')).toBe('true');
  });

  it('should toggle on click and emit change', () => {
    const spy = jest.spyOn(component.change, 'emit');
    const btn = hostEl.query(By.css('button')).nativeElement as HTMLButtonElement;
    btn.click();
    fixture.detectChanges();
    expect(component.value).toBeTruthy();
    expect(spy).toHaveBeenCalledWith(true);

    btn.click();
    fixture.detectChanges();
    expect(component.value).toBeFalsy();
  });

  it('should toggle on keyboard Enter/Space', () => {
    const btnNative: HTMLElement = hostEl.query(By.css('button')).nativeElement;
    const enter = new KeyboardEvent('keydown', { key: 'Enter' });
    btnNative.dispatchEvent(enter);
    fixture.detectChanges();
    expect(component.value).toBeTruthy();

    const space = new KeyboardEvent('keydown', { key: ' ' });
    btnNative.dispatchEvent(space);
    fixture.detectChanges();
    expect(component.value).toBeFalsy();
  });

  it('should not toggle when disabled', () => {
    component.disabled = true;
    fixture.detectChanges();
    const btn = hostEl.query(By.css('button')).nativeElement as HTMLButtonElement;
    btn.click();
    fixture.detectChanges();
    expect(component.value).toBeFalsy();
  });

  it('should call onChange when toggled (ControlValueAccessor integration)', () => {
    const onChangeSpy = jest.fn();
    component.registerOnChange(onChangeSpy);

    component.toggle();
    expect(onChangeSpy).toHaveBeenCalledWith(true);
  });
});
