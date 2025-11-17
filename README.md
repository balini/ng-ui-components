# UI Front-End Angular — Select & Switch

Projeto contendo dois componentes customizados:
- `app-select` — componente tipo select custom (compatível com `[(ngModel)]` e `FormControl`)
- `app-switch` — toggle/switch (compatível com `[(ngModel)]` e `FormControl`)

Inclui uma página de demonstração (`app-demo`) que mostra os dois componentes e alguns controles para testar estados.
Também inclui configuração de testes com Jest (jest-preset-angular) e testes unitários para os componentes.

## Como usar / rodar localmente

1. Instalar dependências:
```bash
npm install
```

2. Rodar em modo de desenvolvimento:
```bash
npm start
# abre automaticamente em http://localhost:4200
```

3. Rodar testes:
```bash
npm test
```

4. Rodar cobertura:
```bash
npm run test:coverage
```

