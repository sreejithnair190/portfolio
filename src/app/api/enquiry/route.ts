import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { name, email, message } = body;
    
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required fields' },
        { status: 400 }
      );
    }
    
    // Create the enquiry in the database
    const enquiry = await prisma.enquiry.create({
      data: {
        name,
        email,
        message: message || '',
      },
    });
    
    return NextResponse.json(
      { success: true, data: enquiry },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error submitting enquiry:', error);
    
    return NextResponse.json(
      { error: 'Failed to submit enquiry' },
      { status: 500 }
    );
  }
}