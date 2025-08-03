// apps/web/middleware/database-middleware.ts
import { NextRequest, NextResponse } from "next/server";

export async function databaseMiddleware(request: NextRequest) {
  // Only intercept API routes
  if (!request.nextUrl.pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  try {
    // Pass the request to the API route
    const response = await NextResponse.next();

    // If the response is not ok, it might be a database error
    if (!response.ok && (response.status === 500 || response.status === 503)) {
      const contentType = response.headers.get('content-type');

      // If it's a JSON response, check if it's a database error
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();

        // If it's a database connection error
        if (data.error && data.error.includes('database') || data.error.includes('prisma')) {
          // Return a more graceful error with status code 503 (Service Unavailable)
          return NextResponse.json(
            { 
              error: "Database service unavailable", 
              message: "We're experiencing technical issues. Please try again later.",
              isDbError: true
            },
            { status: 503 }
          );
        }
      }
    }

    return response;
  } catch (error) {
    console.error('Database middleware error:', error);

    // Return a graceful error response
    return NextResponse.json(
      { 
        error: "Service unavailable",
        message: "Something went wrong. Please try again later."
      },
      { status: 503 }
    );
  }
}
