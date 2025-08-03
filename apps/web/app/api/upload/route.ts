// apps/web/app/api/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";
import { mkdir } from "fs/promises";
import { existsSync } from "fs";
import crypto from "crypto";

// Ensure uploads directory exists
const uploadDir = join(process.cwd(), "public/uploads");

export async function POST(request: NextRequest) {
  try {
    // Create uploads directory if it doesn't exist
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }
    
    const formData = await request.formData();
    const file = formData.get("file") as File;
    
    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Create unique filename using crypto instead of uuid
    const fileExt = file.name.split(".").pop();
    const fileName = `${crypto.randomBytes(16).toString("hex")}.${fileExt}`;
    const filePath = join(uploadDir, fileName);
    
    // Save file
    await writeFile(filePath, buffer);
    
    // Return the URL path to the file
    const fileUrl = `/uploads/${fileName}`;
    
    return NextResponse.json({ url: fileUrl });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: "Error uploading file" },
      { status: 500 }
    );
  }
}
