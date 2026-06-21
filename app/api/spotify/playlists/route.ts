import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token')
  const playlistId = req.nextUrl.searchParams.get('playlistId')

  if (!token) {
    return NextResponse.json({ error: 'Missing token' }, { status: 400 })
  }

  // Fetch tracks from a specific playlist
  if (playlistId) {
    const res = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=20&fields=items(track(name,artists))`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    const data = await res.json()
    const tracks = data.items
      ?.filter((item: any) => item.track)
      .map((item: any) => ({
        name: item.track.name,
        artist: item.track.artists[0]?.name,
      }))
    return NextResponse.json({ tracks })
  }

  // Fetch user's saved playlists
  const res = await fetch('https://api.spotify.com/v1/me/playlists?limit=20', {
    headers: { Authorization: `Bearer ${token}` },
  })
  const data = await res.json()
  const playlists = data.items?.map((p: any) => ({
    id: p.id,
    name: p.name,
    count: p.tracks.total,
    image: p.images?.[0]?.url,
  }))

  return NextResponse.json({ playlists })
}