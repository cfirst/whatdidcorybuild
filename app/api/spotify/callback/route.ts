import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code')

  if (!code) {
    return NextResponse.redirect(new URL('/wine?error=no_code', req.url))
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID!
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI!

  const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
    }),
  })

  const tokenData = await tokenRes.json()

  if (!tokenData.access_token) {
    return NextResponse.redirect(new URL('/wine?error=token_failed', req.url))
  }

  const nowRes = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
    headers: { Authorization: `Bearer ${tokenData.access_token}` },
  })

  let album = null

  if (nowRes.status === 200) {
    const nowData = await nowRes.json()
    if (nowData?.item?.album) {
      album = {
        name: nowData.item.album.name,
        artist: nowData.item.album.artists[0]?.name,
        image: nowData.item.album.images[0]?.url,
        track: nowData.item.name,
      }
    }
  }

  if (!album) {
    const recentRes = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=1', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    })
    const recentData = await recentRes.json()
    const item = recentData?.items?.[0]?.track

    if (item?.album) {
      album = {
        name: item.album.name,
        artist: item.album.artists[0]?.name,
        image: item.album.images[0]?.url,
        track: item.name,
      }
    }
  }

  if (!album) {
    return NextResponse.redirect(new URL('/wine?error=no_album', req.url))
  }

  const params = new URLSearchParams({
    album: album.name,
    artist: album.artist,
    track: album.track,
    image: album.image,
  })

  return NextResponse.redirect(new URL(`/wine?${params.toString()}`, req.url))
}
