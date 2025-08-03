import { NextResponse } from 'next/server';

// Get the web app URL - fallback to localhost for development
const WEB_APP_URL = process.env.WEB_APP_URL || 'http://localhost:3000';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, PATCH',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Handler for OPTIONS requests
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// Handler for GET requests
export async function GET() {
  try {
    const targetUrl = `${WEB_APP_URL}/api/live-tv`;
    
    console.log('Proxying GET request to:', targetUrl);

    const apiResponse = await fetch(targetUrl, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!apiResponse.ok) {
      const errorText = await apiResponse.text();
      console.error('GET API response error:', apiResponse.status, errorText);
      return NextResponse.json({ error: "Gagal mengambil data live TV" }, { status: apiResponse.status, headers: corsHeaders });
    }

    const responseData = await apiResponse.json();
    return NextResponse.json(responseData, { headers: corsHeaders });
  } catch (error) {
    console.error("GET proxy error:", error);
    return NextResponse.json({ error: "Gagal mengambil data live TV" }, { status: 500, headers: corsHeaders });
  }
}

// Handler for POST requests
export async function POST(request: Request) {
  try {
    const targetUrl = `${WEB_APP_URL}/api/live-tv`;
    const body = await request.json();

    console.log('Proxying POST request to:', targetUrl, 'with data:', body);

    const apiResponse = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!apiResponse.ok) {
      const errorText = await apiResponse.text();
      console.error('POST API response error:', apiResponse.status, errorText);
      return NextResponse.json({ error: "Gagal membuat live TV" }, { status: apiResponse.status, headers: corsHeaders });
    }

    const responseData = await apiResponse.json();
    return NextResponse.json(responseData, { status: 201, headers: corsHeaders });
  } catch (error) {
    console.error("POST proxy error:", error);
    return NextResponse.json({ error: "Gagal membuat live TV" }, { status: 500, headers: corsHeaders });
  }
}
