import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'data', 'rsvp.json');

function readRsvp() {
  try {
    if (!fs.existsSync(dataPath)) {
      fs.writeFileSync(dataPath, '[]', 'utf-8');
    }
    const data = fs.readFileSync(dataPath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function writeRsvp(data: unknown[]) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8');
}

export async function GET() {
  const rsvps = readRsvp();
  return NextResponse.json(rsvps);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, attendance, people, message } = body;

    if (!name || !attendance) {
      return NextResponse.json({ error: 'Name and attendance are required' }, { status: 400 });
    }

    const rsvps = readRsvp();
    const newRsvp = {
      id: Date.now().toString(),
      name,
      attendance,
      people: people || 1,
      message: message || '',
      date: new Date().toISOString(),
    };

    rsvps.push(newRsvp);
    writeRsvp(rsvps);

    return NextResponse.json({ success: true, data: newRsvp }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
    const rsvps = readRsvp();
    const filtered = rsvps.filter((r: { id: string }) => r.id !== id);
    writeRsvp(filtered);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
