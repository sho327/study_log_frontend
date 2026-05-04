import { NextRequest, NextResponse } from 'next/server';
export const dynamic = "force-static";

// Note: In a real app, this would query a database.
// For demo purposes, we're showing the API structure.

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    if (!userId) {
      return NextResponse.json(
        { error: 'userId query parameter is required' },
        { status: 400 }
      );
    }

    // In a real app, this would query the database
    // For demo, we return a sample response structure
    const sampleResponse = {
      success: true,
      data: {
        logs: [],
        pagination: {
          limit,
          offset,
          total: 0,
        },
      },
      message: 'In demo mode, logs are stored client-side. Connect a database for persistent storage.',
    };

    return NextResponse.json(sampleResponse);
  } catch (error) {
    console.error('Error fetching logs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch logs' },
      { status: 500 }
    );
  }
}
