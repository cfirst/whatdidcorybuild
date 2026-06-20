'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

interface WineSuggestion {
  wine: string
  type: string
  vibe: string
  reason: string
  serving: string
}

function WineContent() {
  const searchParams = useSearchParams()
  const [wine, setWine] = useState<WineSuggestion | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const album = searchParams.get('album')
  const artist = searchParams.get('artist')
  const track = searchParams.get('track')
  const image = searchParams.get('image')
  const errorParam = searchParams.get('error')

  useEffect(() => {
    if (album && artist) {
      setLoading(true)
      fetch('/api/wine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ album, artist, track }),
      })
        .then((r) => r.json())
        .then((data) => {
          if (data.error) setError(data.error)
          else setWine(data)
        })
        .catch(() => setError('Something went wrong.'))
        .finally(() => setLoading(false))
    }
  }, [album, artist, track])

  return (
    <main className="min-h-screen" style={{ background: '#2c2a24', fontFamily: 'DM Sans, sans-serif' }}>
      <nav className="flex items-center justify-between px-8 py-6 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
        <Link href="/" className="text-sm" style={{ color: '#8fba9a', letterSpacing: '0.05em' }}>
          ← Cory Firstenberg
        </Link>
        <span className="text-xs uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.3)' }}>
          Wine & Albums
        </span>
      </nav>

      <div className="max-w-2xl mx-auto px-8 py-20">
        {!album && !errorParam && (
          <div className="text-center">
            <p className="text-xs uppercase tracking-widest mb-6" style={{ color: '#c4956a' }}>
              A sommelier for your ears
            </p>
            <h1 className="text-5xl mb-6" style={{ fontFamily: 'Fraunces, serif', color: '#f5f0e8', fontWeight: 300, lineHeight: 1.15 }}>
              What wine matches<br />what you&apos;re listening to?
            </h1>
            <p className="mb-12 text-lg" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Connect Spotify and we&apos;ll pair your current album with the perfect bottle.
            </p>
            
              href="/api/spotify/login"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-medium transition-all hover:scale-105"
              style={{ background: '#8fba9a', color: '#2c2a24', letterSpacing: '0.02em' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
              Connect Spotify
            </a>
            <p className="mt-6 text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>
              We read your current track only. Nothing is stored.
            </p>
          </div>
        )}

        {errorParam && (
          <div className="text-center">
            <p className="text-4xl mb-4" style={{ fontFamily: 'Fraunces, serif', color: '#f5f0e8', fontWeight: 300 }}>
              {errorParam === 'no_album' ? 'Nothing playing right now.' : 'Something went sideways.'}
            </p>
            <p className="mb-8" style={{ color: 'rgba(255,255,255,0.4)' }}>
              {errorParam === 'no_album'
                ? 'Play something on Spotify and try again.'
                : 'Try reconnecting your Spotify account.'}
            </p>
            <a href="/api/spotify/login" className="text-sm underline" style={{ color: '#8fba9a' }}>
              Try again →
            </a>
          </div>
        )}

        {loading && album && (
          <div className="text-center">
            <div className="mb-8">
              {image && (
                <div className="relative w-48 h-48 mx-auto mb-6 rounded-lg overflow-hidden" style={{ opacity: 0.7 }}>
                  <Image src={image} alt={album} fill style={{ objectFit: 'cover' }} />
                </div>
              )}
              <p className="text-sm mb-1" style={{ color: '#8fba9a' }}>{artist}</p>
              <p className="text-2xl" style={{ fontFamily: 'Fraunces, serif', color: '#f5f0e8', fontWeight: 300 }}>{album}</p>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 rounded-full animate-bounce" style={{ background: '#c4956a', animationDelay: '0ms' }} />
              <div className="w-2 h-2 rounded-full animate-bounce" style={{ background: '#c4956a', animationDelay: '150ms' }} />
              <div className="w-2 h-2 rounded-full animate-bounce" style={{ background: '#c4956a', animationDelay: '300ms' }} />
            </div>
            <p className="mt-4 text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>Consulting the cellar...</p>
          </div>
        )}

        {wine && album && !loading && (
          <div>
            <div className="flex items-center gap-5 mb-12">
              {image && (
                <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                  <Image src={image} alt={album} fill style={{ objectFit: 'cover' }} />
                </div>
              )}
              <div>
                <p className="text-xs uppercase tracking-widest mb-1" style={{ color: '#8fba9a' }}>Now listening</p>
                <p className="text-xl" style={{ fontFamily: 'Fraunces, serif', color: '#f5f0e8', fontWeight: 300 }}>{album}</p>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>{artist}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-12">
              <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
              <span className="text-xs uppercase tracking-widest" style={{ color: '#c4956a' }}>pairs with</span>
              <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
            </div>

            <div className="rounded-2xl p-8" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <p className="text-xs uppercase tracking-widest mb-2" style={{ color: '#9a8fc4' }}>{wine.type}</p>
                  <h2 className="text-3xl" style={{ fontFamily: 'Fraunces, serif', color: '#f5f0e8', fontWeight: 300, lineHeight: 1.2 }}>
                    {wine.wine}
                  </h2>
                </div>
                <span className="text-xs px-3 py-1 rounded-full flex-shrink-0 mt-1" style={{ background: 'rgba(196,149,106,0.15)', color: '#c4956a', border: '1px solid rgba(196,149,106,0.2)' }}>
                  {wine.vibe}
                </span>
              </div>

              <p className="text-base mb-6 leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
                {wine.reason}
              </p>

              <div className="pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <p className="text-xs uppercase tracking-widest mb-2" style={{ color: 'rgba(255,255,255,0.25)' }}>Serving note</p>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>{wine.serving}</p>
              </div>
            </div>

            <div className="text-center mt-12">
              <a href="/api/spotify/login" className="text-sm" style={{ color: '#8fba9a' }}>
                Refresh from Spotify →
              </a>
            </div>
          </div>
        )}

        {error && (
          <div className="text-center">
            <p style={{ color: 'rgba(255,255,255,0.4)' }}>{error}</p>
            <a href="/wine" className="text-sm underline mt-4 block" style={{ color: '#8fba9a' }}>Start over</a>
          </div>
        )}
      </div>
    </main>
  )
}

export default function WinePage() {
  return (
    <Suspense>
      <WineContent />
    </Suspense>
  )
}
