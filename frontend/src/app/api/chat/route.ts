import { NextRequest, NextResponse } from 'next/server';
import { processHealthcareQuery, ChatMessage } from '@/lib/chatEngine';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message text is required.' },
        { status: 400 }
      );
    }

    // Process through the clinical healthcare engine
    const response: ChatMessage = processHealthcareQuery(message);

    return NextResponse.json(response);
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      {
        id: `err-${Date.now()}`,
        sender: 'bot',
        text: 'We are experiencing a brief connection delay. Please feel free to call our desk directly at +91 99005 17699 or visit our booking page.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionLink: {
          label: 'Book Online',
          url: '/booking',
        },
      },
      { status: 200 }
    );
  }
}
