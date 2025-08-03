// apps/cms/app/api/upload/route.ts
import { NextRequest, NextResponse } from "next/server";

// Get the web app URL - fallback to localhost for development
const WEB_APP_URL = process.env.WEB_APP_URL || 'http://localhost:3000';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    
    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    // Create new FormData to forward to web app
    const uploadFormData = new FormData();
    uploadFormData.append('file', file);

    // Proxy the upload request to the web app
    const uploadResponse = await fetch(`${WEB_APP_URL}/api/upload`, {
      method: 'POST',
      body: uploadFormData,
    });

    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text();
      console.error('Upload proxy error:', uploadResponse.status, errorText);
      return NextResponse.json(
        { error: "Failed to upload file" },
        { status: uploadResponse.status }
      );
    }

    const result = await uploadResponse.json();
    return NextResponse.json(result);
    
  } catch (error) {
    console.error("Error in upload proxy:", error);
    return NextResponse.json(
      { error: "Error uploading file" },
      { status: 500 }
    );
  }
}