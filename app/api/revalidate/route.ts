import { NextRequest } from 'next/server';
import { revalidateTag } from 'next/cache';

export async function POST(req: NextRequest) {
  console.log('Received a request at /api/revalidate');

  const secret = req.headers.get('x-revalidation-secret');
  const { tag } = await req.json();

  console.log('Secret:', secret);
  console.log('Tag:', tag);

  if (secret !== process.env.REVALIDATION_SECRET) {
    console.log('Invalid secret');
    return new Response(JSON.stringify({ message: 'Invalid secret' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
  }

  try {
    if (tag) {
      revalidateTag(tag);
      console.log(`Successfully revalidated tag: ${tag}`);
    }

    return new Response(JSON.stringify({ revalidated: true, tag }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error('Error during revalidation:', error);
    return new Response(JSON.stringify({ error: 'Error revalidating' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
