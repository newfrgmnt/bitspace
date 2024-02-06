import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export const runtime = 'edge';

export async function POST(req: NextRequest) {
    const { prompt, context } = await req.json();
    const response = await openai.images.generate({
        model: 'dall-e-2',
        prompt: `${prompt}. Interpret the following context and let it influence the image: ${context}`
    });

    return new NextResponse(JSON.stringify(response.data));
}
