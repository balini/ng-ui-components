import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DemoComponent } from './demo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectComponent } from '../components/select/select.component';
import { SwitchComponent } from '../components/switch/switch.component';
import { By } from '@angular/platform-browser';

describe('DemoComponent', () => {
  let component: DemoComponent;
  let fixture: ComponentFixture<DemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DemoComponent, SelectComponent, SwitchComponent],
      imports: [FormsModule, ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(DemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create demo component', () => {
    expect(component).toBeTruthy();
  });

  it('should render select and switch components', () => {
    const selectDebug = fixture.debugElement.query(By.directive(SelectComponent));
    const switchDebug = fixture.debugElement.query(By.directive(SwitchComponent));
    expect(selectDebug).toBeTruthy();
    expect(switchDebug).toBeTruthy();
  });

  it('should update selected model when selecting option programmatically (via child API)', () => {
    // encontra o SelectComponent filho e define o valor via API pública
    const selectDebug = fixture.debugElement.query(By.directive(SelectComponent));
    const selectComp: SelectComponent = selectDebug.componentInstance as SelectComponent;

    // escreve valor diretamente no filho (simula o que o Forms faria)
    selectComp.writeValue('apple');
    // notifica mudança / detect
    fixture.detectChanges();

    const selectValueEl = fixture.debugElement.query(By.css('.select-value'));
    expect(selectValueEl.nativeElement.textContent.toLowerCase()).toContain('apple');
  });

  it('should toggle switch via model and reflect in template (via child API)', () => {
    // encontra o SwitchComponent filho e define o valor via API pública
    const switchDebug = fixture.debugElement.query(By.directive(SwitchComponent));
    const switchComp: SwitchComponent = switchDebug.componentInstance as SwitchComponent;

    // define o valor diretamente (simula o que o Forms faria)
    switchComp.writeValue(true);
    fixture.detectChanges();

    const btn = fixture.debugElement.query(By.css('button[role="switch"]'));
    // aria-checked é string 'true' no DOM
    expect(btn.attributes['aria-checked']).toBe('true');
  });
});
