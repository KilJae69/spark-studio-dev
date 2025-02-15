import { NextRequest } from 'next/server';
import { revalidateTag } from 'next/cache';

export async function POST(req: NextRequest) {
    const secret = req.headers.get('x-revalidation-secret');
  const {  tag } = await req.json();

  // Security check
  if (secret !== process.env.REVALIDATION_SECRET) {
    return new Response(JSON.stringify({ message: 'Invalid secret' }), { status: 401 });
  }

  try {
    if (tag) {
      revalidateTag(tag);
    }

    return new Response(JSON.stringify({ revalidated: true }), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: 'Error revalidating' }), { status: 500 });
  }
}
