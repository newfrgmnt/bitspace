import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';
import { env } from '@/env';

const openai = new OpenAI({
    apiKey: env.OPENAI_API_KEY
});

export const runtime = 'edge';

export async function POST(req: NextRequest) {
    const { prompt, context } = await req.json();
    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',

        messages: [
            {
                role: 'system',
                content: `Everything inside the triple-quotes is called a "context". It is a JSON object with additional information that can be helpful to contextualize and answer the prompt given. For example, if the prompt is "What color is this?" the context might be a JSON representation of RGB values.`
            },
            {
                content: `${prompt}

"""${JSON.stringify(context)}"""
`,
                name: 'User',
                role: 'user'
            }
        ]
    });

    return new NextResponse(
        JSON.stringify(response.choices[0]?.message.content)
    );
}
