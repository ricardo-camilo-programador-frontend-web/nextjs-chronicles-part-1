'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import * as gtm from '@/lib/gtm'
import { getItemFromLocalStorage } from '@/utils/localStorage'
import { ANALYTICS_LOCAL_STORAGE_NAME } from '@/static/analyticsLocalStorageName'
import { Suspense } from 'react'
import Loading from '@/components/Loading'

function AnalyticsContent() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const isAnalyticsEnabled = getItemFromLocalStorage(ANALYTICS_LOCAL_STORAGE_NAME)

  useEffect(() => {
    const removeAnalyticsScriptFromDom = () => {
      if (!isAnalyticsEnabled) {
        const script = document.getElementById('gtm-script')
        if (script) {
          script.remove()
        }
      }
    }

    if (pathname && isAnalyticsEnabled) {
      gtm.pageview(pathname + searchParams.toString())
      return;
    }

    setTimeout(() => {
      removeAnalyticsScriptFromDom()
    }, 1500)
  }, [pathname, searchParams, isAnalyticsEnabled])

  return null
}

export function Analytics() {
  return (
    <Suspense fallback={<Loading />}>
      <AnalyticsContent />
    </Suspense>
  )
}
