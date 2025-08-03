import { NextResponse } from 'next/server';

// Get the web app URL - fallback to localhost for development
const WEB_APP_URL = process.env.WEB_APP_URL || 'http://localhost:3000';

// Ini adalah proxy untuk mengubah status artikel
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const targetUrl = `${WEB_APP_URL}/api/articles/${id}`;
        const body = await request.json();
        
        console.log('Proxying PATCH publish request to:', targetUrl, 'with status:', body.status);

        const apiResponse = await fetch(targetUrl, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: body.status }), // Hanya kirim status baru
        });

        const responseData = await apiResponse.json();
        
        if (!apiResponse.ok) {
            console.error('PATCH publish API response error:', apiResponse.status, responseData);
            throw new Error(responseData.error || 'Gagal publish artikel');
        }
        
        return NextResponse.json(responseData, { status: apiResponse.status });
    } catch (error: any) {
        console.error('Proxy PATCH publish error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}