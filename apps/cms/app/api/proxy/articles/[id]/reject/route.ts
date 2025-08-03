import { NextResponse } from 'next/server';

// Get the web app URL - fallback to localhost for development
const WEB_APP_URL = process.env.WEB_APP_URL || 'http://localhost:3000';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Handler for OPTIONS requests
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// Handler for POST requests (reject article)
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const targetUrl = `${WEB_APP_URL}/api/articles/${id}/reject`;
    
    console.log('Proxying POST reject request to:', targetUrl, 'with data:', body);

    const apiResponse = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!apiResponse.ok) {
      const errorText = await apiResponse.text();
      console.error('POST reject API response error:', apiResponse.status, errorText);
      return NextResponse.json({ error: "Gagal menolak artikel" }, { status: apiResponse.status, headers: corsHeaders });
    }

    const responseData = await apiResponse.json();
    return NextResponse.json(responseData, { status: 200, headers: corsHeaders });
  } catch (error) {
    console.error("POST reject proxy error:", error);
    return NextResponse.json({ error: "Gagal menolak artikel" }, { status: 500, headers: corsHeaders });
  }
}
