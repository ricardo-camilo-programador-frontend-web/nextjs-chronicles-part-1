# Padroes de Qualidade - Next.js

## Stack

| Tecnologia | Uso |
|------------|-----|
| Next.js 15 | Framework |
| React 19 | UI |
| TypeScript | Linguagem |
| TailwindCSS | Estilos |

## TypeScript

```typescript
// BOM
interface PageProps {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Page({ params }: PageProps) {
  const data = await getData(params.id)
  return <Component data={data} />
}
```

## Next.js Patterns

### Server Components
```tsx
// BOM: Server Component (default)
async function UserList() {
  const users = await fetchUsers()
  return (
    <ul>
      {users.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  )
}
```

### Client Components
```tsx
// BOM: Client Component
'use client'

import { useState } from 'react'

export function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>
}
```

## Comandos

```bash
npm run dev      # Dev server
npm run build    # Build
npm run start    # Production server
npm run lint     # ESLint
```

## Checklist

- [ ] Server Components por default
- [ ] 'use client' apenas quando necessario
- [ ] Metadata API para SEO
- [ ] Loading e error boundaries
