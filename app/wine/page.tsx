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

interface MusicSuggestion {
  album: string
  artist: string
  year: string
  genre: string
  vibe: string
  reason: string
  songs: { title: string; youtube: string }[]
}

function WineContent() {
  const searchParams = useSearchParams()
  const [mode, setMode] = useState<'choose' | 'music-to-wine' | 'wine-to-music'>('choose')
  const [wine, setWine] = useState<WineSuggestion | null>(null)
  const [music, setMusic] = useState<MusicSuggestion | null>(null)
  const [wineInput, setWineInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const album = searchParams.get('album')
  const artist = searchParams.get('artist')
  const track = searchParams.get('track')
  const image = searchParams.get('image')
  const errorParam = searchParams.get('error')

  useEffect(() => {
    if (album && artist) {
      setMode('music-to-wine')
      setLoading(true)
      fetch('/api/wine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ album, artist, track, mode: 'music-to-wine' }),
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

  function handleWineSubmit() {
    if (!wineInput.trim()) return
    setLoading(true)
    setError(null)
    setMusic(null)
    fetch('/api/wine', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ wine: wineInput, mode: 'wine-to-music' }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.error) setError(data.error)
        else setMusic(data)
      })
      .catch(() => setError('Something went wrong.'))
      .finally(() => setLoading(false))
  }

  return (
    <main className="min-h-screen" style={{ background: '#2c2a24', fontFamily: 'DM Sans, sans-serif' }}>
      <nav className="flex items-center justify-between px-8 py-6 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
        <Link href="/" className="text-sm" style={{ color: '#8fba9a', letterSpacing: '0.05em' }}>
          Back to Cory Firstenberg
        </Link>
        <span className="text-xs uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.3)' }}>
          Wine & Music
        </span>
      </nav>

      <div className="max-w-2xl mx-auto px-8 py-20">

        {/* Mode selector */}
        {mode === 'choose' && !errorParam && (
          <div className="text-center">
            <p className="text-xs uppercase tracking-widest mb-6" style={{ color: '#c4956a' }}>
              A sommelier for your ears
            </p>
            <h1 className="text-5xl mb-16" style={{ fontFamily: 'Fraunces, serif', color: '#f5f0e8', fontWeight: 300, lineHeight: 1.15 }}>
              Wine meets music.
            </h1>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <button
                onClick={() => setMode('music-to-wine')}
                className="text-left p-8 rounded-2xl transition-all hover:scale-105"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <p className="text-xs uppercase tracking-widest mb-3" style={{ color: '#8fba9a' }}>I have music</p>
                <p className="text-xl mb-3" style={{ fontFamily: 'Fraunces, serif', color: '#f5f0e8', fontWeight: 300 }}>What wine should I drink?</p>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>Connect Spotify and we pair your current album with the perfect bottle.</p>
              </button>
              <button
                onClick={() => setMode('wine-to-music')}
                className="text-left p-8 rounded-2xl transition-all hover:scale-105"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <p className="text-xs uppercase tracking-widest mb-3" style={{ color: '#c4956a' }}>I have wine</p>
                <p className="text-xl mb-3" style={{ fontFamily: 'Fraunces, serif', color: '#f5f0e8', fontWeight: 300 }}>What should I listen to?</p>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>Tell us what you are drinking and we find the perfect album.</p>
              </button>
            </div>
          </div>
        )}

        {/* Music to Wine — Spotify connect */}
        {mode === 'music-to-wine' && !album && !errorParam && (
          <div className="text-center">
            <button onClick={() => setMode('choose')} className="text-xs mb-12 block mx-auto" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Back
            </button>
            <p className="text-xs uppercase tracking-widest mb-6" style={{ color: '#8fba9a' }}>Music to wine</p>
            <h2 className="text-4xl mb-6" style={{ fontFamily: 'Fraunces, serif', color: '#f5f0e8', fontWeight: 300, lineHeight: 1.2 }}>
              What are you listening to?
            </h2>
            <p className="mb-12 text-lg" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Connect Spotify and we will pair your current album with the perfect bottle.
            </p>
            <a href="/api/spotify/login" className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-medium" style={{ background: '#8fba9a', color: '#2c2a24' }}>Connect Spotify</a>
            <p className="mt-6 text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>We read your current track only. Nothing is stored.</p>
          </div>
        )}

        {/* Wine to Music — input */}
        {mode === 'wine-to-music' && !music && !loading && (
          <div>
            <button onClick={() => setMode('choose')} className="text-xs mb-12 block" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Back
            </button>
            <p className="text-xs uppercase tracking-widest mb-6" style={{ color: '#c4956a' }}>Wine to music</p>
            <h2 className="text-4xl mb-10" style={{ fontFamily: 'Fraunces, serif', color: '#f5f0e8', fontWeight: 300, lineHeight: 1.2 }}>
              What are you drinking?
            </h2>
            <div className="flex gap-3">
              <input
                type="text"
                value={wineInput}
                onChange={(e) => setWineInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleWineSubmit()}
                placeholder="e.g. Malbec from Mendoza, a funky Beaujolais..."
                className="flex-1 px-5 py-4 rounded-xl text-sm outline-none"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#f5f0e8' }}
              />
              <button
                onClick={handleWineSubmit}
                className="px-6 py-4 rounded-xl text-sm font-medium"
                style={{ background: '#c4956a', color: '#2c2a24' }}>
                Pair it
              </button>
            </div>
            {error && <p className="mt-4 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>{error}</p>}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="text-center">
            {image && (
              <div className="relative w-48 h-48 mx-auto mb-6 rounded-lg overflow-hidden" style={{ opacity: 0.7 }}>
                <Image src={image} alt={album || 'album'} fill style={{ objectFit: 'cover' }} />
              </div>
            )}
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full animate-bounce" style={{ background: '#c4956a', animationDelay: '0ms' }} />
              <div className="w-2 h-2 rounded-full animate-bounce" style={{ background: '#c4956a', animationDelay: '150ms' }} />
              <div className="w-2 h-2 rounded-full animate-bounce" style={{ background: '#c4956a', animationDelay: '300ms' }} />
            </div>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>
              {mode === 'wine-to-music' ? 'Curating your soundtrack...' : 'Consulting the cellar...'}
            </p>
          </div>
        )}

        {/* Error */}
        {errorParam && (
          <div className="text-center">
            <p className="text-4xl mb-4" style={{ fontFamily: 'Fraunces, serif', color: '#f5f0e8', fontWeight: 300 }}>
              {errorParam === 'no_album' ? 'Nothing playing right now.' : 'Something went sideways.'}
            </p>
            <p className="mb-8" style={{ color: 'rgba(255,255,255,0.4)' }}>
              {errorParam === 'no_album' ? 'Play something on Spotify and try again.' : 'Try reconnecting your Spotify account.'}
            </p>
            <a href="/api/spotify/login" className="text-sm underline" style={{ color: '#8fba9a' }}>Try again</a>
          </div>
        )}

        {/* Music to Wine result */}
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
                  <h2 className="text-3xl" style={{ fontFamily: 'Fraunces, serif', color: '#f5f0e8', fontWeight: 300, lineHeight: 1.2 }}>{wine.wine}</h2>
                </div>
                <span className="text-xs px-3 py-1 rounded-full flex-shrink-0 mt-1" style={{ background: 'rgba(196,149,106,0.15)', color: '#c4956a', border: '1px solid rgba(196,149,106,0.2)' }}>{wine.vibe}</span>
              </div>
              <p className="text-base mb-6 leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>{wine.reason}</p>
              <div className="pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <p className="text-xs uppercase tracking-widest mb-2" style={{ color: 'rgba(255,255,255,0.25)' }}>Serving note</p>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>{wine.serving}</p>
              </div>
            </div>

            <div className="text-center mt-12">
              <button onClick={() => { setMode('choose'); setWine(null); }} className="text-sm mr-6" style={{ color: 'rgba(255,255,255,0.3)' }}>Start over</button>
              <a href="/api/spotify/login" className="text-sm" style={{ color: '#8fba9a' }}>Refresh from Spotify</a>
            </div>
          </div>
        )}

        {/* Wine to Music result */}
        {music && !loading && (
          <div>
            <div className="mb-10">
              <p className="text-xs uppercase tracking-widest mb-2" style={{ color: '#c4956a' }}>You are drinking</p>
              <p className="text-2xl" style={{ fontFamily: 'Fraunces, serif', color: '#f5f0e8', fontWeight: 300 }}>{wineInput}</p>
            </div>

            <div className="flex items-center gap-4 mb-10">
              <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
              <span className="text-xs uppercase tracking-widest" style={{ color: '#8fba9a' }}>soundtrack</span>
              <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
            </div>

            <div className="rounded-2xl p-8 mb-8" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <p className="text-xs uppercase tracking-widest mb-1" style={{ color: '#9a8fc4' }}>{music.genre} · {music.year}</p>
                  <h2 className="text-3xl mb-1" style={{ fontFamily: 'Fraunces, serif', color: '#f5f0e8', fontWeight: 300, lineHeight: 1.2 }}>{music.album}</h2>
                  <p className="text-base" style={{ color: 'rgba(255,255,255,0.5)' }}>{music.artist}</p>
                </div>
                <span className="text-xs px-3 py-1 rounded-full flex-shrink-0 mt-1" style={{ background: 'rgba(143,186,154,0.15)', color: '#8fba9a', border: '1px solid rgba(143,186,154,0.2)' }}>{music.vibe}</span>
              </div>
              <p className="text-base mb-8 leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>{music.reason}</p>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }} className="pt-6">
                <p className="text-xs uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.25)' }}>Songs to start with</p>
                <div className="flex flex-col gap-3">
                  {music.songs.map((song, i) => (
                    
                                          <a key={i} href={song.youtube} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between px-4 py-3 rounded-xl transition-all hover:scale-105" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>

                      <div className="flex items-center gap-3">
                        <span className="text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>{i + 1}</span>
                        <span className="text-sm" style={{ color: '#f5f0e8' }}>{song.title}</span>
                      </div>
                      <span className="text-xs px-2 py-1 rounded" style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.4)' }}>YouTube</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <button
                onClick={() => { setMusic(null); setWineInput(''); setError(null); }}
                className="text-sm mr-6"
                style={{ color: 'rgba(255,255,255,0.3)' }}>
                Try another wine
              </button>
              <button onClick={() => setMode('choose')} className="text-sm" style={{ color: '#8fba9a' }}>Start over</button>
            </div>
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