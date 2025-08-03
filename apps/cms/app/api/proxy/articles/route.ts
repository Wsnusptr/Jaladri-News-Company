import { NextRequest, NextResponse } from "next/server";

// Get the web app URL - fallback to localhost for development
const WEB_APP_URL = process.env.WEB_APP_URL || 'http://localhost:3000';

// Handler untuk GET (mengambil semua artikel)
export async function GET(request: NextRequest) {
  try {
    // Ambil query params (seperti ?status=DRAFT) dari permintaan asli
    const { search } = new URL(request.url);
    const targetUrl = `${WEB_APP_URL}/api/articles${search}`;

    console.log('CMS Proxying GET request to:', targetUrl);

    const apiResponse = await fetch(targetUrl, {
      cache: 'no-store', // Selalu ambil data terbaru
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!apiResponse.ok) {
      const errorText = await apiResponse.text();
      console.error('CMS Proxy: API response error:', apiResponse.status, errorText);
      throw new Error(`API utama merespons dengan error: ${apiResponse.status} ${errorText}`);
    }

    const responseData = await apiResponse.json();
    return NextResponse.json(responseData, { status: 200 });

  } catch (error: any) {
    console.error("CMS Proxy GET Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Handler untuk POST (membuat artikel baru)
export async function POST(request: NextRequest) {
  try {
    const targetUrl = `${WEB_APP_URL}/api/articles`;
    const body = await request.json();

    console.log('Proxying POST request to:', targetUrl);

    const apiResponse = await fetch(targetUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const responseData = await apiResponse.json();

    if (!apiResponse.ok) {
      console.error('POST API response error:', apiResponse.status, responseData);
      throw new Error(responseData.error || 'Gagal di API utama');
    }

    return NextResponse.json(responseData, { status: 201 });
  } catch (error: any) {
    console.error("Proxy POST Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}