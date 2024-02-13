import OpenAI, { toFile } from 'openai';
import { NextRequest, NextResponse } from 'next/server';

export const config = {
    api: {
        bodyParser: false // Disallow body parsing, consume as stream
    }
};

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export const runtime = 'edge';

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const prompt = formData.get('prompt');
    const image = formData.get('image');
    const mask = formData.get('mask');

    const imageFile = await toFile(image as any, 'image.png', { type: 'image/png' });
    const maskFile = await toFile(mask as any, 'mask.png', { type: 'image/png' });

    const response = await openai.images.edit({
        model: 'dall-e-2',
        prompt: prompt as string,
        image: imageFile,
        mask: maskFile
    });

    return new NextResponse(JSON.stringify(response.data[0]?.url));
}
