import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()

export async function POST(req: NextRequest) {
  const { album, artist, track, wine, mode, tracks } = await req.json()

  if (mode === 'playlist') {
    if (!tracks || tracks.length === 0) {
      return NextResponse.json({ error: 'Missing tracks' }, { status: 400 })
    }

    const trackList = tracks.map((t: any) => `${t.name} by ${t.artist}`).join('\n')

    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: `You are a sommelier with deep knowledge of music and wine.

Someone's recently liked tracks on Spotify include:
${trackList}

Analyze the overall mood, energy, and vibe of their music taste. Then suggest 3 different wines that match the range of moods in their listening.

Respond in this exact JSON format with no additional text:
{
  "playlistVibe": "2-3 sentence summary of their overall music taste and energy",
  "wines": [
    {
      "wine": "Full wine name and producer",
      "type": "e.g. Red Burgundy, Champagne, Rioja, etc.",
      "vibe": "2-3 word mood descriptor",
      "mood": "Which part of their taste this matches e.g. Mellow moments, Peak energy, Late night",
      "reason": "1-2 sentences on why this wine matches this part of their taste."
    },
    {
      "wine": "Full wine name and producer",
      "type": "e.g. Red Burgundy, Champagne, Rioja, etc.",
      "vibe": "2-3 word mood descriptor",
      "mood": "Which part of their taste this matches",
      "reason": "1-2 sentences on why this wine matches this part of their taste."
    },
    {
      "wine": "Full wine name and producer",
      "type": "e.g. Red Burgundy, Champagne, Rioja, etc.",
      "vibe": "2-3 word mood descriptor",
      "mood": "Which part of their taste this matches",
      "reason": "1-2 sentences on why this wine matches this part of their taste."
    }
  ]
}`,
        },
      ],
    })

    const text = message.content[0].type === 'text' ? message.content[0].text : ''
    try {
      const clean = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
      return NextResponse.json(JSON.parse(clean))
    } catch {
      return NextResponse.json({ error: 'Failed to parse wine suggestion' }, { status: 500 })
    }
  }

  if (mode === 'wine-to-music') {
    if (!wine) {
      return NextResponse.json({ error: 'Missing wine input' }, { status: 400 })
    }

    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: `You are a music curator with deep knowledge of wine and music.

Someone is drinking: "${wine}"

Suggest ONE album that perfectly matches the mood, texture, and vibe of this wine. Then suggest 3 specific songs from that album.

Respond in this exact JSON format with no additional text:
{
  "album": "Full album name",
  "artist": "Artist name",
  "year": "Release year",
  "genre": "Genre",
  "vibe": "2-3 word mood descriptor e.g. Warm & Hazy",
  "reason": "2-3 sentences explaining why this album perfectly matches this wine.",
  "songs": [
    { "title": "Song title", "youtube": "https://www.youtube.com/results?search_query=Artist+Song+Title" },
    { "title": "Song title", "youtube": "https://www.youtube.com/results?search_query=Artist+Song+Title" },
    { "title": "Song title", "youtube": "https://www.youtube.com/results?search_query=Artist+Song+Title" }
  ]
}`,
        },
      ],
    })

    const text = message.content[0].type === 'text' ? message.content[0].text : ''
    try {
      const clean = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
      return NextResponse.json(JSON.parse(clean))
    } catch {
      return NextResponse.json({ error: 'Failed to parse music suggestion' }, { status: 500 })
    }
  }

  if (!album || !artist) {
    return NextResponse.json({ error: 'Missing album or artist' }, { status: 400 })
  }

  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 512,
    messages: [
      {
        role: 'user',
        content: `You are a sommelier with deep knowledge of music and wine.

Someone is listening to "${track}" from the album "${album}" by ${artist}.

Suggest ONE specific bottle of wine that perfectly matches the mood, vibe, and energy of this album.

Respond in this exact JSON format with no additional text:
{
  "wine": "Full wine name and producer",
  "type": "e.g. Red Burgundy, Champagne, Rioja, etc.",
  "vibe": "2-3 word mood descriptor e.g. Brooding & Deep",
  "reason": "2-3 sentences explaining why this wine perfectly matches this album's sound and feeling.",
  "serving": "One sentence on how to serve it."
}`,
      },
    ],
  })

  const text = message.content[0].type === 'text' ? message.content[0].text : ''
  try {
    const clean = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
    return NextResponse.json(JSON.parse(clean))
  } catch {
    return NextResponse.json({ error: 'Failed to parse wine suggestion' }, { status: 500 })
  }
}