import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token')

  if (!token) {
    return NextResponse.json({ error: 'Missing token' }, { status: 400 })
  }

  let decodedToken = token
  try {
    decodedToken = decodeURIComponent(token)
  } catch {
    decodedToken = token
  }

  const res = await fetch('https://api.spotify.com/v1/me/tracks?limit=20', {
    headers: { Authorization: `Bearer ${decodedToken}` },
  })
  const data = await res.json()

  if (data.error) {
    return NextResponse.json({ error: data.error.message }, { status: data.error.status })
  }

  const tracks = data.items
    ?.filter((item: any) => item.track)
    .map((item: any) => ({
      name: item.track.name,
      artist: item.track.artists[0]?.name,
      album: item.track.album?.name,
    }))

  return NextResponse.json({ tracks })
}