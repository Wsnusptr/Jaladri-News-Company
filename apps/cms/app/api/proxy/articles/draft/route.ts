import { NextRequest, NextResponse } from "next/server";

// Get the web app URL - fallback to localhost for development
const WEB_APP_URL = process.env.WEB_APP_URL || 'http://localhost:3000';

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

    if (!apiResponse.ok) {
      const errorText = await apiResponse.text();
      console.error('API response error:', apiResponse.status, errorText);
      throw new Error(`API utama merespons dengan error: ${apiResponse.status} ${errorText}`);
    }

    const responseData = await apiResponse.json();
    return NextResponse.json(responseData, { status: 200 });

  } catch (error: any) {
    console.error("Proxy DRAFT Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}