import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
export const dynamic = "force-static";

// Note: In a real app, this would use a database. 
// For demo purposes, we're showing the API structure.
// The actual data is stored in localStorage on the client side.

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { userId, date, duration, category, memo, outputUrl, tags, themeId } = body;

    // Validation
    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      );
    }

    if (!date) {
      return NextResponse.json(
        { error: 'date is required' },
        { status: 400 }
      );
    }

    if (!duration || duration <= 0) {
      return NextResponse.json(
        { error: 'duration must be a positive number' },
        { status: 400 }
      );
    }

    if (!category) {
      return NextResponse.json(
        { error: 'category is required' },
        { status: 400 }
      );
    }

    // Create log object (in real app, this would be saved to database)
    const newLog = {
      id: uuidv4(),
      userId,
      date,
      duration,
      category,
      memo: memo || undefined,
      outputUrl: outputUrl || undefined,
      tags: tags || [],
      themeId: themeId || undefined,
      likes: [],
      comments: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: newLog,
      message: 'Log created successfully. Note: In demo mode, data is stored client-side.',
    });
  } catch (error) {
    console.error('Error creating log:', error);
    return NextResponse.json(
      { error: 'Failed to create log' },
      { status: 500 }
    );
  }
}
