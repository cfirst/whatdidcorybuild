import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()

export async function POST(req: NextRequest) {
  const { album, artist, track } = await req.json()

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
  "reason": "2-3 sentences explaining why this wine perfectly matches this album's sound and feeling. Be specific about the music.",
  "serving": "One sentence on how to serve it."
}`,
      },
    ],
  })

  const text = message.content[0].type === 'text' ? message.content[0].text : ''

  try {
    const clean = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
    const json = JSON.parse(clean)
    return NextResponse.json(json)
  } catch {
    console.log('Failed to parse:', text)
    return NextResponse.json({ error: 'Failed to parse wine suggestion' }, { status: 500 })
  }
}
