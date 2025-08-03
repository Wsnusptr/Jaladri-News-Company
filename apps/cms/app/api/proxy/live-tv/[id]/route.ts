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

// Handler for PATCH requests
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const targetUrl = `${WEB_APP_URL}/api/live-tv/${id}`;
    const body = await request.json();

    console.log('Proxying PATCH request to:', targetUrl, 'with data:', body);

    const apiResponse = await fetch(targetUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!apiResponse.ok) {
      const errorText = await apiResponse.text();
      console.error('PATCH API response error:', apiResponse.status, errorText);
      return NextResponse.json({ error: "Live TV tidak ditemukan" }, { status: apiResponse.status, headers: corsHeaders });
    }

    const responseData = await apiResponse.json();
    return NextResponse.json(responseData, { status: 200, headers: corsHeaders });
  } catch (error) {
    console.error("PATCH proxy error:", error);
    return NextResponse.json({ error: "Gagal memperbarui live TV" }, { status: 500, headers: corsHeaders });
  }
}

// Handler for DELETE requests
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const targetUrl = `${WEB_APP_URL}/api/live-tv/${id}`;
    
    console.log('Proxying DELETE request to:', targetUrl);

    const apiResponse = await fetch(targetUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!apiResponse.ok) {
      const errorText = await apiResponse.text();
      console.error('DELETE API response error:', apiResponse.status, errorText);
      return NextResponse.json({ error: "Live TV tidak ditemukan" }, { status: apiResponse.status, headers: corsHeaders });
    }

    const responseData = await apiResponse.json();
    return NextResponse.json(responseData, { status: 200, headers: corsHeaders });
  } catch (error) {
    console.error("DELETE proxy error:", error);
    return NextResponse.json({ error: "Gagal menghapus live TV" }, { status: 500, headers: corsHeaders });
  }
}
