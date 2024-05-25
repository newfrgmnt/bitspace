import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';
import { env } from '@/env';

const openai = new OpenAI({
    apiKey: env.OPENAI_API_KEY
});

export const runtime = 'edge';

export async function POST(req: NextRequest) {
    const { imageUrl } = await req.json();

    const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
            {
                role: 'user',
                content: [
                    {
                        type: 'text',
                        text: 'What is in this image?'
                    },
                    {
                        type: 'image_url',
                        image_url: { url: imageUrl }
                    }
                ]
            }
        ]
    });

    return new NextResponse(
        JSON.stringify(response.choices[0]?.message.content)
    );
}
