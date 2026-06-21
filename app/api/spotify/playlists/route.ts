import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token')
  const playlistId = req.nextUrl.searchParams.get('playlistId')

  if (!token) {
    return NextResponse.json({ error: 'Missing token' }, { status: 400 })
  }

  let decodedToken = token
  try {
    decodedToken = decodeURIComponent(token)
  } catch {
    decodedToken = token
  }

  if (playlistId) {
    const res = await fetch(
`https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=20`,      { headers: { Authorization: `Bearer ${decodedToken}` } }
    )
    const data = await res.json()
    console.log('Tracks from Spotify:', JSON.stringify(data).slice(0, 300))
    const tracks = data.items
      ?.filter((item: any) => item.track)
      .map((item: any) => ({
        name: item.track.name,
        artist: item.track.artists[0]?.name,
      }))
    return NextResponse.json({ tracks })
  }

  const res = await fetch('https://api.spotify.com/v1/me/playlists?limit=20', {
    headers: { Authorization: `Bearer ${decodedToken}` },
  })
  const data = await res.json()

  if (data.error) {
    return NextResponse.json({ error: data.error.message }, { status: data.error.status })
  }

  const playlists = data.items
    ?.filter((p: any) => p && p.name)
   .map((p: any) => {
      const total = p?.tracks?.total ?? p?.items?.total ?? 0
      return {
        id: p.id,
        name: p.name,
        count: total,
        image: p.images?.[0]?.url ?? null,
      }
    })

  return NextResponse.json({ playlists })
}