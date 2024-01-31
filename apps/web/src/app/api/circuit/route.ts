export async function POST(request: Request) {
    console.log(request);
    const res = await request.json();
    return Response.json({ res });
}
