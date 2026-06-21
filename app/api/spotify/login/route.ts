import { NextResponse } from 'next/server'

export async function GET() {
  const clientId = process.env.SPOTIFY_CLIENT_ID!
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI!

  const scope = 'user-read-currently-playing user-read-recently-played playlist-read-private playlist-read-collaborative'

  const params = new URLSearchParams({
    client_id: clientId,
    response_type: 'code',
    redirect_uri: redirectUri,
    scope,
  })

  return NextResponse.redirect(
    `https://accounts.spotify.com/authorize?${params.toString()}`
  )
}
