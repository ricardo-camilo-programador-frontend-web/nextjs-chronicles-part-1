# SEGURANCA-CODIGO - Protecao contra Caracteres Unicode Invisiveis

## Riscos

Caracteres Unicode invisiveis podem ser usados para:

1. **Ofuscacao de codigo** - Esconder logica maliciosa
2. **Bypass de linting** - Enganar ferramentas de analise
3. **Steganografia** - Esconder dados em codigo-fonte
4. **Homoglyph attacks** - Caracteres visualmente identicos com significados diferentes
5. **Injection attacks** - Explorar parsing inconsistente

---

## Faixas Proibidas

| Faixa | Nome Tecnico | Exemplo de Uso Malicioso |
| ----- | ------------ | ------------------------ |
| `U+FE00` - `U+FE0F` | Variation Selectors | Alterar renderizacao de emojis |
| `U+E0100` - `U+E01EF` | Variation Selectors Supplement | Ofuscacao avancada |
| `U+200B` - `U+200F` | Zero Width Spaces | Esconder codigo/texto |
| `U+202A` - `U+202E` | Directional Formatting | Inverter texto visualmente |
| `U+2060` - `U+206F` | Format Control Characters | Controle invisivel |
| `U+FFF0` - `U+FFF8` | Specials | Caracteres especiais |

---

## Regras Obrigatorias

1. **NUNCA** inserir caracteres das faixas proibidas
2. **SEMPRE** validar codigo antes de commit
3. **REMOVER** imediatamente se detectado
4. **CONFIGURAR** IDEs para destacar caracteres especiais
5. **AUTOMATIZAR** scan no CI/CD

---

## Como Identificar

### VS Code
Configurar `settings.json`:
```json
{
  "editor.unicodeHighlight.ambiguousCharacters": true,
  "editor.unicodeHighlight.invisibleCharacters": true
}
```

### Git Diff
```bash
git diff --color-words='.'
```

### Python One-Liner
```python
python -c "
import sys
with open(sys.argv[1], 'r', encoding='utf-8') as f:
    for i, line in enumerate(f, 1):
        for j, char in enumerate(line):
            cp = ord(char)
            if 0xFE00 <= cp <= 0xFE0F or 0x200B <= cp <= 0x200F:
                print(f'Linha {i}, Col {j}: U+{cp:04X}')
" arquivo.tsx
```

---

## Checklist Pre-Commit

- [ ] Nenhum caractere das faixas proibidas
- [ ] ESLint passa (`pnpm run lint`)
- [ ] TypeScript compila (`npx tsc --noEmit`)
- [ ] Git diff limpo de caracteres suspeitos

---

## Checklist Code Review

- [ ] Verificar caracteres invisiveis nos diffs
- [ ] Validar strings e comentarios
- [ ] Checar nomes de variaveis (homoglyphs)

---

## Checklist CI/CD

- [ ] Script de scan integrado no pipeline
- [ ] Falha automatica se caracteres detectados
- [ ] Relatorio de seguranca gerado

---

## Procedimento de Incidente

Se caracteres maliciosos sao encontrados:

1. **Isolar** - Nao fazer merge do codigo afetado
2. **Documentar** - Registrar quais arquivos e caracteres
3. **Limpar** - Executar ferramenta de limpeza
4. **Verificar** - Confirmar que todos foram removidos
5. **Investigar** - Determinar origem (intencional ou acidental)
6. **Notificar** - Alertar equipe se intencional
7. **Prevenir** - Adicionar verificacoes automatizadas

---

## Referencias

- [Unicode Security Considerations (Unicode.org)](https://www.unicode.org/reports/tr36/)
- [CVE-2021-42574: Bidirectional Text Vulnerability](https://trojansource.codes/)
- [Homoglyph Attack Examples](https://github.com/nickstatnikov/unicode-homoglyph-attack)

---

_Esta politica entra em vigor a partir da data de criacao._
