import { useRouter } from 'next/router'
import br from '../../src/messages/br.json'
import en from '../../src/messages/en.json'
import hi from '../../src/messages/hi.json'
import jp from '../../src/messages/jp.json'
import pl from '../../src/messages/pl.json'
import ar from '../../src/messages/ar.json'

const translations = {
  'BR': br,
  'EN': en,
  'HI': hi,
  'JP': jp,
  'PL': pl,
  'AR': ar,
}

export function useTranslation() {
  const router = useRouter()
  const { locale } = router
  const t = (key: string): string => {
    const keys = key.split('.')
    let translation: string | Record<string, unknown> = translations[locale as keyof typeof translations]

    for (const k of keys) {
      translation = (translation as Record<string, unknown>)[k] as string | Record<string, unknown>
    }

    return (translation as string) || key
  }

  return { t, locale }
}
