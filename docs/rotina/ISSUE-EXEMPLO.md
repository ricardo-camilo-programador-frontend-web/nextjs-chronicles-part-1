# Corrigir validacao do formulario de checkout - Erro ao avancar para pagamento

## Referencia

| Campo | Valor |
|-------|-------|
| **Origem** | Reporte de bug - modulo de Checkout |
| **Reportado por** | Usuario do sistema |
| **Data** | 2026-04-13 |
| **Prioridade** | Alta |
| **Impacto** | Critico |

**Contexto Resumido:**
O formulario de checkout apresenta erro ao tentar avancar para a etapa de pagamento. O botao "Avancar para Pagamento" fica desabilitado mesmo apos preencher todos os campos obrigatorios corretamente. O problema ocorre na validacao do formulario que nao reconhece os dados inseridos.

---

## PROBLEMA ATUAL

### Descricao Clara e Objetiva

**Problema: Validacao do formulario de checkout bloqueia fluxo**

Ao preencher o formulario de checkout e tentar avancar para a etapa de pagamento, o botao permanece desabilitado. O erro ocorre porque:
- A funcao de validacao `validateCheckoutForm` esta verificando campos que foram renomeados no schema do formulario
- O campo `billingAddress` foi alterado para `address` no schema, mas a validacao ainda usa o nome antigo
- O estado do formulario (`formState.isValid`) nunca se torna `true` porque a validacao falha silenciosamente

**Condicoes que desencadeiam:**
1. Acessar a pagina `/checkout`
2. Adicionar um produto ao carrinho
3. Preencher todos os campos do formulario de checkout
4. Tentar clicar em "Avancar para Pagamento"

**Frequencia:** 100% das tentativas

### Impacto no Sistema/Usuario

| Dimensao | Descricao |
|----------|-----------|
| **Usuarios afetados** | Todos os usuarios que tentam finalizar uma compra |
| **Funcionalidades bloqueadas** | Finalizacao de compras - operacao critica do e-commerce |
| **Prejuizo** | Impossibilidade de converter vendas, impacto direto na receita |
| **Urgencia** | Bloqueio total do fluxo de checkout em producao |

### Riscos Envolvidos

- **Perda de receita**: Usuarios nao conseguem finalizar compras
- **Abandono de carrinho**: Frustracao leva usuarios a desistirem
- **Impacto em metricas de negocio**: Conversao zero durante o periodo do bug
- **Retrabalho de suporte**: Usuarios contactam atendimento para relatar problema
- **Degradacao da UX**: Formulario nao da feedback claro do erro

---

## OBJETIVOS

Lista clara e objectiva do que precisa ser resolvido:

- [ ] **Corrigir validacao do formulario** em `checkout-form.tsx` para usar nomes corretos dos campos
- [ ] **Atualar schema de validacao** para refletir estrutura atual do formulario (`address` em vez de `billingAddress`)
- [ ] **Adicionar feedback visual** quando validacao falhar (mensagens de erro inline)
- [ ] **Implementar teste automatizado** do fluxo completo de checkout
- [ ] **Validar tipagem TypeScript** em todas as alteracoes
- [ ] **Testar fluxo completo** de checkout (preenchimento, validacao, avancar para pagamento)

---

## ANALISE TECNICA

### Possivel Causa Raiz

**Problema: Schema de Validacao Desatualizado**

O componente `CheckoutForm` utiliza um schema de validacao (Zod) que foi criado antes de uma refatoracao no modelo de dados do endereco. A refatoracao alterou o nome do campo de `billingAddress` para `address`, mas o schema de validacao e a funcao `validateCheckoutForm` nao foram atualizados.

Além disso, a validacao esta capturando erros silenciosamente com `try/catch` sem log ou feedback visual, o que dificulta o diagnostico.

### Fluxo Atual vs Fluxo Esperado

#### Fluxo Atual (Problematico)

```
1. Usuario acessa /checkout
2. Preenche formulario com dados validos
3. Clica em "Avancar para Pagamento"
4. validateCheckoutForm() executa validacao
5. Validacao busca campo "billingAddress" (NAO EXISTE MAIS)
6. Validacao falha silenciosamente
7. formState.isValid permanece false
8. Botao permanece desabilitado
9. Usuario nao entende o que esta acontecendo
```

#### Fluxo Esperado (Correto)

```
1. Usuario acessa /checkout
2. Preenche formulario com dados validos
3. Clica em "Avancar para Pagamento"
4. validateCheckoutForm() executa validacao com schema atualizado
5. Validacao verifica campo "address" (CORRETO)
6. Validacao passa com sucesso
7. formState.isValid se torna true
8. Botao habilita e navega para etapa de pagamento
9. Feedback visual claro em caso de erro de validacao
```

### Dependencias Envolvidas

| Tipo | Nome | Impacto |
|------|------|---------|
| **Server Actions** | `checkout-actions.ts` | Processa dados do formulario |
| **Components** | `checkout-form.tsx` | Formulario principal que contem validacao |
| **Hooks** | `useCheckoutForm.ts` | Gerencia estado do formulario |
| **Schemas** | `checkout-schema.ts` | Schema Zod de validacao |
| **Types** | `checkout-types.ts` | Tipos TypeScript do checkout |
| **API Routes** | `/api/checkout/route.ts` | Endpoint de criacao do pedido |

---

## ARQUIVOS AFETADOS

Lista de arquivos que provavelmente precisarao de alteracoes:

```
src/
├── app/
│   └── checkout/
│       └── page.tsx                          # Pagina de checkout (leitura)
├── components/
│   └── checkout/
│       ├── checkout-form.tsx                  # Corrigir validacao e feedback
│       └── checkout-schema.ts                 # Atualizar schema Zod
├── actions/
│   └── checkout-actions.ts                    # Verificar integracao (se necessario)
├── hooks/
│   └── useCheckoutForm.ts                     # Gerencia estado do formulario
└── types/
    └── checkout-types.ts                      # Consultar tipos atuais (leitura)
```

---

## IMPLEMENTACAO SUGERIDA

### Passo a Passo Tecnico

#### 1. Correcao do Schema de Validacao

**Responsabilidade:** Garantir que o schema Zod use nomes corretos dos campos

```typescript
// src/components/checkout/checkout-schema.ts

// ANTES
import { z } from 'zod'

export const checkoutSchema = z.object({
  name: z.string().min(1, 'Nome e obrigatorio'),
  email: z.string().email('Email invalido'),
  billingAddress: z.object({
    street: z.string().min(1, 'Rua e obrigatoria'),
    number: z.string().min(1, 'Numero e obrigatorio'),
    city: z.string().min(1, 'Cidade e obrigatoria'),
    state: z.string().length(2, 'UF invalida'),
    zip: z.string().regex(/^\d{5}-\d{3}$/, 'CEP invalido'),
  }),
})

// DEPOIS
import { z } from 'zod'

export const checkoutSchema = z.object({
  name: z.string().min(1, 'Nome e obrigatorio'),
  email: z.string().email('Email invalido'),
  address: z.object({
    street: z.string().min(1, 'Rua e obrigatoria'),
    number: z.string().min(1, 'Numero e obrigatorio'),
    city: z.string().min(1, 'Cidade e obrigatoria'),
    state: z.string().length(2, 'UF invalida'),
    zip: z.string().regex(/^\d{5}-\d{3}$/, 'CEP invalido'),
  }),
})

export type CheckoutFormData = z.infer<typeof checkoutSchema>
```

**Arquivos:** `src/components/checkout/checkout-schema.ts`

#### 2. Correcao da Funcao de Validacao

**Responsabilidade:** Usar schema atualizado e fornecer feedback de erros

```typescript
// src/components/checkout/checkout-form.tsx

// ANTES
function validateCheckoutForm(data: FormData): boolean {
  try {
    const parsed = checkoutSchema.parse({
      name: data.get('name'),
      email: data.get('email'),
      billingAddress: {          // Campo antigo
        street: data.get('street'),
        number: data.get('number'),
        city: data.get('city'),
        state: data.get('state'),
        zip: data.get('zip'),
      },
    })
    return true
  } catch {
    return false                 // Erro silencioso
  }
}

// DEPOIS
function validateCheckoutForm(data: FormData): { valid: boolean; errors?: Record<string, string> } {
  try {
    const parsed = checkoutSchema.parse({
      name: data.get('name'),
      email: data.get('email'),
      address: {                  // Campo atualizado
        street: data.get('street'),
        number: data.get('number'),
        city: data.get('city'),
        state: data.get('state'),
        zip: data.get('zip'),
      },
    })
    return { valid: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {}
      error.errors.forEach((err) => {
        const path = err.path.join('.')
        errors[path] = err.message
      })
      return { valid: false, errors }
    }
    return { valid: false, errors: { general: 'Erro inesperado na validacao' } }
  }
}
```

**Arquivos:** `src/components/checkout/checkout-form.tsx`

#### 3. Adicionar Feedback Visual de Erros

**Responsabilidade:** Exibir mensagens de erro inline no formulario

```tsx
// src/components/checkout/checkout-form.tsx

'use client'

import { useState } from 'react'
import { checkoutSchema } from './checkout-schema'

export function CheckoutForm() {
  const [errors, setErrors] = useState<Record<string, string>>({})

  function handleSubmit(formData: FormData) {
    const validation = validateCheckoutForm(formData)

    if (!validation.valid) {
      setErrors(validation.errors ?? {})
      return
    }

    setErrors({})
    // Prosseguir para pagamento...
  }

  return (
    <form action={handleSubmit}>
      {/* Campos do formulario */}
      {errors.general && (
        <div className="text-red-600 bg-red-50 p-3 rounded">{errors.general}</div>
      )}

      {Object.entries(errors).map(([key, message]) => (
        key !== 'general' && (
          <p key={key} className="text-red-600 text-sm">{message}</p>
        )
      ))}

      <button
        type="submit"
        className="bg-green-600 text-white px-6 py-3 rounded"
      >
        Avancar para Pagamento
      </button>
    </form>
  )
}
```

**Arquivos:** `src/components/checkout/checkout-form.tsx`

### Separacao por Responsabilidades

| Responsabilidade | Arquivo | Acao |
|------------------|---------|------|
| Schema de validacao | `checkout-schema.ts` | Corrigir nome do campo |
| Funcao de validacao | `checkout-form.tsx` | Usar `address` e retornar erros |
| Feedback visual | `checkout-form.tsx` | Exibir mensagens de erro |
| Tipos TypeScript | `checkout-types.ts` | Verificar consistencia |

### Oportunidades de Refactor

1. **Padronizacao de schemas**: Verificar se outros schemas tambem usam nomes desatualizados
2. **Validacao centralizada**: Mover logica de validacao para um hook dedicado
3. **Testes automatizados**: Criar testes para cada etapa do checkout

---

## REFERENCIA VISUAL

### Comportamento Atual (Erro)

```
Pagina: /checkout

[Formulario preenchido corretamente]

Botao "Avancar para Pagamento": DESABILITADO (cinza)
Nenhuma mensagem de erro visivel
Console: nenhum erro exibido (try/catch silencioso)
```

### Comportamento Esperado (Corrigido)

```
Pagina: /checkout

[Formulario preenchido corretamente]

Botao "Avancar para Pagamento": HABILITADO (verde)
Ao clicar: navega para /checkout/payment

[Formulario com campo faltando]

Botao "Avancar para Pagamento": DESABILITADO
Mensagem visivel: "CEP invalido" (vermelho, abaixo do campo)
```

---

## REGRAS DE IMPLEMENTACAO

### Padroes de Codigo

- **TypeScript rigoroso**: Tipagem completa em todos os metodos, sem `any`
- **DRY**: Reaproveitar logica de validacao se existir em outros lugares
- **Object Calisthenics**: Metodos com no maximo 5-8 linhas
- **Next.js App Router**: Usar Server Components por padrao, `'use client'` apenas quando necessario
- **Tailwind CSS**: Manter padroes de estilos do projeto
- **Clean Code**: Nomes descritivos como `address` em vez de `addr`

### O Que Nao Fazer

- Nao duplicar logica de validacao que ja exista em `useCheckoutForm`
- Nao adicionar comentarios obvios como "valida formulario"
- Nao criar tipos novos sem necessidade - usar existentes do projeto
- Nao ignorar tratamento de erro - sempre validar dados de entrada
- Nao deixar logs de debug (`console.log`) no codigo final

### Validacoes Obrigatorias

```typescript
// Sempre validar dados de entrada
if (!formData.address) {
  throw new Error('Endereco e obrigatorio')
}

// Validar formato do CEP
if (!isValidZipCode(formData.address.zip)) {
  throw new Error('CEP invalido')
}
```

---

## ESTRUTURA FINAL

Onde cada arquivo deve ser criado/alterado:

```
src/
├── components/
│   └── checkout/
│       ├── checkout-form.tsx
│       │   ├── Corrigir: validateCheckoutForm para usar "address"
│       │   └── Adicionar: feedback visual de erros
│       └── checkout-schema.ts
│           └── Corrigir: billingAddress para address
│
└── types/
    └── checkout-types.ts
        └── Verificar: consistencia com novos tipos
```

---

## ENTREGAVEL EXATO

Lista clara e objectiva do que deve ser entregue:

### Types

Verificar se tipo `CheckoutFormData` esta consistente:

```typescript
// src/types/checkout-types.ts
import type { z } from 'zod'
import type { checkoutSchema } from '@/components/checkout/checkout-schema'

export type CheckoutFormData = z.infer<typeof checkoutSchema>
```

### Hooks

Nenhum hook novo necessario. Se necessario validar:

```typescript
// Verificar se existe e usar
import { useCheckoutForm } from '@/hooks/useCheckoutForm'
```

### Componentes

Nenhum componente novo necessario. Apenas corrigir o existente:

```tsx
// components/checkout/checkout-form.tsx
'use client'

export function CheckoutForm() {
  // ... corrigir validacao e adicionar feedback
}
```

### Integracao

A integracao ja existe via server actions. Garantir que:

1. Schema esta exportando tipos corret
2. Formulario esta validando corretamente
3. Pagina esta reagindo a mudancas de estado

### Exemplos de Uso

```typescript
// Uso correto do formulario apos correcao
const validation = validateCheckoutForm(formData)

if (validation.valid) {
  // Prosseguir para pagamento
  await createCheckoutOrder(validation.data)
} else {
  // Exibir erros ao usuario
  setErrors(validation.errors)
}
```

### Testes

- [ ] Teste unitario do schema de validacao
- [ ] Teste de integracao do fluxo completo de checkout
- [ ] Teste de feedback visual de erros

---

## TESTES

### Fluxos Manuais Obrigatorios

1. **Fluxo Principal - Checkout Completo**
   - [ ] Acessar `/checkout`
   - [ ] Preencher todos os campos do formulario com dados validos
   - [ ] Clicar em "Avancar para Pagamento"
   - [ ] **Verificar**: Botao esta habilitado
   - [ ] **Verificar**: Navega para etapa de pagamento

2. **Fluxo Alternativo - Campo Obrigatorio Vazio**
   - [ ] No formulario, deixar o campo "Nome" vazio
   - [ ] **Verificar**: Botao permanece desabilitado
   - [ ] **Verificar**: Mensagem "Nome e obrigatorio" aparece

3. **Fluxo Alternativo - CEP Invalido**
   - [ ] Preencher CEP com formato invalido (ex: "12345")
   - [ ] **Verificar**: Mensagem "CEP invalido" aparece
   - [ ] **Verificar**: Botao permanece desabilitado

4. **Fluxo de Excecao - Email Invalido**
   - [ ] Preencher email sem @ (ex: "usuario@email")
   - [ ] **Verificar**: Validacao impede avancar
   - [ ] **Verificar**: Mensagem de erro apropriada e exibida

5. **Fluxo Alternativo - Corrigir Erro e Avancar**
   - [ ] Preencher formulario com erro
   - [ ] Observar mensagem de erro
   - [ ] Corrigir o campo com erro
   - [ ] **Verificar**: Mensagem de erro desaparece
   - [ ] **Verificar**: Botao habilita

6. **Validacao de Responsividade**
   - [ ] Testar formulario em viewport desktop (1280px)
   - [ ] **Verificar**: Layout corretto, campos alinhados
   - [ ] Testar formulario em viewport mobile (375px)
   - [ ] **Verificar**: Campos empilham corretamente, botao acessivel

### Casos de Sucesso

- **Formulario valido**: Botao habilita, navega para pagamento
- **Formulario invalido**: Mensagens de erro claras, botao desabilitado
- **Correcao de erro**: Feedback visual, botao habilita apos correcao

### Casos de Erro

- **Dados incompletos**: Erros inline claros e objetivos
- **API indisponivel**: Erro de rede tratado graciosamente
- **Dados inconsistentes**: Tratamento de erro apropriado

### Validacoes

- [ ] Dados corretos no backend (verificar criacao do pedido)
- [ ] UI atualizada conforme esperado (sem flicker ou estados estranhos)
- [ ] Mensagens de erro/exibicao adequadas (inline, visiveis)
- [ ] Performance nao degradada (sem re-renders desnecessarios)
- [ ] Acessibilidade preservada (aria-labels, focus management)
- [ ] Responsividade mantida (mobile e desktop)

### Criterios de Aceite

- [ ] Zero erros silenciosos na validacao
- [ ] Feedback visual claro para cada erro de validacao
- [ ] Botao habilita apenas quando formulario e valido
- [ ] Tipagem TypeScript sem erros (`pnpm type-check`)
- [ ] Lint sem erros (`pnpm lint`)
- [ ] Build sem erros (`pnpm build`)
- [ ] Testes manuais documentados e validados

---

## REFERENCIAS TECNICAS

### Documentacao Relacionada

- [Next.js Forms](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- [Zod - Schema Validation](https://zod.dev/)
- [React Hook Form](https://react-hook-form.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Issues Relacionadas

- Esta issue

### Arquivos de Referencia do Projeto

- `docs/rotina/COMMIT-PATTERN.md` - Padrao de commits
- `docs/rotina/PULL_REQUEST_TEMPLATE.md` - Template de PR
- `src/types/checkout-types.ts` - Tipos de checkout
- `src/components/checkout/checkout-schema.ts` - Schema de validacao

---

## LABELS SUGERIDAS

| Label | Aplicar | Justificativa |
|-------|---------|---------------|
| `bug` | Sim | Erro de validacao bloqueia fluxo |
| `feature` | Nao | Nao e nova funcionalidade |
| `priority:high` | Sim | Funcionalidade bloqueada em producao |
| `frontend` | Sim | Alteracoes em componentes React |
| `typescript` | Sim | Codigo TypeScript tipado |
| `checkout` | Sim | Modulo afetado |

---

## NOTAS ADICIONAIS

### Contexto Historico

Este problema surgiu apos uma refatoracao no modelo de dados do endereco que alterou o nome do campo de `billingAddress` para `address`. A validacao e o schema nao foram atualizados em sincronia com a mudanca.

### Decisoes de Design

1. **Schema centralizado**: Manter schema Zod em arquivo separado para reuso
2. **Feedback inline**: Exibir erros proximo aos campos afetados em vez de toast generico
3. **Validacao explicita**: Retornar objeto com `valid` e `errors` em vez de boolean

### Restricoes Tecnicas

- **Compatibilidade**: Manter compatibilidade com server actions existentes
- **Performance**: Evitar re-renders desnecessarios com validacao
- **Tipagem**: Manter tipagem forte sem usar `any` ou `unknown`

### Consideracoes Especiais

- Testar com diferentes combinacoes de dados validos e invalidos
- Validar comportamento com autocompletar do navegador
- Considerar acessibilidade para leitores de tela (aria-describedby nos erros)

### Proximos Passos (Futuro)

Apos esta correcao, considerar:
1. Auditoria em outros schemas para problemas similares
2. Criacao de testes automatizados E2E para checkout
3. Implementacao de testes de integracao com Playwright
