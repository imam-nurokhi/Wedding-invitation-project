import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface WishEntry {
  id: string;
  name: string;
  message: string;
  date: string;
}

const dataPath = path.join(process.cwd(), 'data', 'wishes.json');

function readWishes(): WishEntry[] {
  try {
    const data = fs.readFileSync(dataPath, 'utf-8');
    return JSON.parse(data) as WishEntry[];
  } catch (err: unknown) {
    if (err && typeof err === 'object' && 'code' in err && (err as NodeJS.ErrnoException).code === 'ENOENT') {
      return [];
    }
    return [];
  }
}

function writeWishes(data: WishEntry[]): void {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8');
}

export async function GET() {
  const wishes = readWishes();
  return NextResponse.json(wishes);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, message } = body;

    if (!name || !message) {
      return NextResponse.json({ error: 'Name and message are required' }, { status: 400 });
    }

    const wishes = readWishes();
    const newWish = {
      id: Date.now().toString(),
      name,
      message,
      date: new Date().toISOString(),
    };

    wishes.push(newWish);
    writeWishes(wishes);

    return NextResponse.json({ success: true, data: newWish }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
    const wishes = readWishes();
    const filtered = wishes.filter((w: WishEntry) => w.id !== id);
    writeWishes(filtered);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
