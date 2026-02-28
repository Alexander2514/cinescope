'use client'
import { useState, useEffect, useCallback } from 'react'
import { useSearchParams,useRouter } from 'next/navigation'
import { searchMulti } from '@/lib/api'
import { MovieCard } from '@/components/ui/MovieCard'
import { MovieGrid } from '@/components/sections/MovieGrid'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { useLang } from '@/hooks/useLang'
import { t } from '@/lib/i18n'
import type { TrendingItem } from '@/lib/types'

export default function SearchContent() {
  const params   = useSearchParams()
  const query    = params.get('q') ?? ''
  const { lang } = useLang()
  const router   = useRouter()


  const [items,      setItems]      = useState<TrendingItem[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [loading,    setLoading]    = useState(false)
  const [mobileQuery, setMobileQuery] = useState(query)
    const debounceRef = useState<ReturnType<typeof setTimeout> | null>(null)


  useEffect(() => { setMobileQuery(query) }, [query])

  // Re-fetch when query OR language changes
  useEffect(() => {
    if (!query.trim()) { setItems([]); return }
    setLoading(true)
    setItems([])
    searchMulti(query, 1, lang)
      .then(data => {
        setItems(data.results as TrendingItem[])
        setTotalPages(Math.min(data.total_pages, 20))
      })
      .finally(() => setLoading(false))
  }, [query, lang])

  const fetchMore = useCallback(async (page: number): Promise<TrendingItem[]> => {
    const data = await searchMulti(query, page, lang)
    return data.results as TrendingItem[]
  }, [query, lang])


 const handleMobileInput = (val: string) => {
    setMobileQuery(val)
    if (debounceRef[0]) clearTimeout(debounceRef[0])
    if (!val.trim()) return
    ;(debounceRef as any)[0] = setTimeout(() => {
      router.push(`/search?q=${encodeURIComponent(val.trim())}`)
    }, 600)
  }

  const handleMobileSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (mobileQuery.trim()) router.push(`/search?q=${encodeURIComponent(mobileQuery.trim())}`)
  }



  return (
    <main className="relative z-[1] max-w-[1600px] mx-auto px-4 md:px-6 lg:px-10 pt-6 pb-24 md:pb-10">



        <form
        onSubmit={handleMobileSubmit}
        className="md:hidden flex items-center mb-5 h-11 rounded-2xl
          border border-white/[0.1] bg-white/[0.06] overflow-hidden
          transition-all duration-300 focus-within:border-violet-glow/60
          focus-within:shadow-[0_0_0_3px_rgba(109,40,217,0.18)]"
      >
        <span className="pl-4 text-white/35 text-base flex-shrink-0">🔍</span>
        <input
          value={mobileQuery}
          onChange={e => handleMobileInput(e.target.value)}
          placeholder={t(lang, 'searchPlaceholder')}
          autoComplete="off"
          autoFocus={!query}
          className="flex-1 h-full px-3 text-[0.95rem] bg-transparent text-white/90
            placeholder-white/30 outline-none"
        />
        {mobileQuery && (
          <button
            type="button"
            onClick={() => { setMobileQuery(''); router.push('/search?q=') }}
            className="pr-4 text-white/30 hover:text-white/60 transition-colors text-lg"
            aria-label="Limpiar"
          >
            ×
          </button>
        )}
      </form>






       <div className="hidden md:flex items-baseline gap-3 mb-6 flex-wrap">
        <SectionTitle className="section-title-bar font-serif font-bold text-xl md:text-2xl text-white/95">
          {query ? `"${query}"` : t(lang, 'searchPlaceholder')}
        </SectionTitle>
        {items.length > 0 && !loading && (
          <span className="text-[0.72rem] text-white/30 uppercase tracking-widest">
            {items.length}+ results
          </span>
        )}
      </div>

         {items.length > 0 && !loading && (
        <p className="md:hidden text-[0.7rem] text-white/30 uppercase tracking-widest mb-3">
          {items.length}+ results
        </p>
      )}




      {loading && (
        <div
          className="grid gap-2.5 md:gap-4"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))' }}
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[2/3] rounded-[10px] skeleton"
              style={{ animationDelay: `${i * 30}ms` }}
            />
          ))}
        </div>
      )}

      {!loading && !query && (
        <div className="flex flex-col items-center gap-4 py-16 text-center">
          <div className="w-20 h-20 rounded-full bg-violet/10 border border-violet/20 flex items-center justify-center text-4xl">
            🔍
          </div>
          <p className="text-white/40 font-medium text-lg">
            {t(lang, 'searchPlaceholder')}
          </p>
        </div>
      )}

      {!loading && query && items.length === 0 && (
        <div className="flex flex-col items-center gap-4 py-16 text-center">
          <div className="w-20 h-20 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-4xl">
            🎬
          </div>
          <p className="text-white/50 font-medium text-lg">
            {t(lang, 'noResults')} &ldquo;{query}&rdquo;
          </p>
          <p className="text-white/25 text-sm max-w-[260px]">
            {t(lang, 'noResultsHint')}
          </p>
        </div>
      )}

      {!loading && items.length > 0 && (
        <>
          <div className="block md:hidden mb-4">
            <div
              className="grid gap-2"
              style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}
            >
              {items.slice(0, 9).map((item, i) => (
                <MovieCard key={item.id} item={item} priority={i < 6} />
              ))}
            </div>
            {items.length > 9 && (
              <div className="mt-2">
                <MovieGrid
                  initialItems={items.slice(9)}
                  initialPage={1}
                  totalPages={totalPages}
                  fetchMore={fetchMore}
                  columns={3}
                />
              </div>
            )}
          </div>

          <div className="hidden md:block">
            <MovieGrid
              initialItems={items}
              initialPage={1}
              totalPages={totalPages}
              fetchMore={fetchMore}
            />
          </div>
        </>
      )}
    </main>
  )
}
