import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export const runtime = 'edge';

export async function POST(req: NextRequest) {
    const { prompt } = await req.json();
    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ content: prompt, name: 'User', role: 'user' }]
    });

    return new NextResponse(JSON.stringify(response.choices[0]?.message.content));
}
