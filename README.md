# UI Front-End Angular — Select & Switch

Projeto contendo dois componentes customizados:
- `app-select` — componente tipo select custom (compatível com `[(ngModel)]` e `FormControl`) - componente customizado de seleção)
- `app-switch` — toggle/switch (compatível com `[(ngModel)]` e `FormControl`) - componente de alternância)

Inclui uma página de demonstração (`app-demo`) que mostra os dois componentes e alguns controles para testar estados.
Também inclui configuração de testes com Jasmine/Karma e testes unitários para os componentes.

## Hospedagem via Vercel (demo da aplicação)
É possível acessar a demo da aplicação em: https://angular-ui-components.vercel.app

## Como usar / rodar localmente

1. Instalar dependências:
```bash
npm install
```

2. Rodar a aplicação localmente:
```bash
npm start
# abre automaticamente em http://localhost:4200
```

3. Rodar testes unitários:
```bash
npm test
```

## 📦 Componentes

### `app-select`
Componente de select customizado que:

- Segue o design do handoff
- Aceita opções no formato:
- Funciona com: [(ngModel)], FormControl
- Permite estado desabilitado ([disabled]="true")
- Emite o valor selecionado
- Aceita opções no formato: [{ value: string | number, label: string }]

### `app-switch`
Componente switch customizado que:

- Segue o design do handoff
- Funciona com: [(ngModel)], FormControl
- Aceita valores booleanos
- Permite estado desabilitado
- Emite evento com o valor atual

## Estrutura do projeto

```
src/app/
  components/
    select/
      select.component.ts
      select.component.html
      select.component.scss
    switch/
      switch.component.ts
      switch.component.html
      switch.component.scss
  demo/
    demo.component.ts
    demo.component.html
    demo.component.scss
```

## Como reutilizar os componentes

- Importe os componentes no módulo desejado:
```bash
import { SelectComponent } from './components/select/select.component';
import { SwitchComponent } from './components/switch/switch.component';
```

- E use:
```bash
<app-select [(ngModel)]="selected" [options]="items"></app-select>
<app-switch [(ngModel)]="enabled"></app-switch>
```

## Licença
Projeto de avaliação técnica — uso livre para fins de análise.
