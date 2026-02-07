import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "waitlist.json");

interface WaitlistEntry {
  name: string;
  email: string;
  neighborhood: string;
  timestamp: string;
}

async function readEntries(): Promise<WaitlistEntry[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function writeEntries(entries: WaitlistEntry[]) {
  await fs.writeFile(DATA_FILE, JSON.stringify(entries, null, 2));
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, neighborhood } = body;

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "A valid email is required." },
        { status: 400 }
      );
    }

    const entries = await readEntries();

    // Check for duplicate email
    if (entries.some((e) => e.email.toLowerCase() === email.toLowerCase().trim())) {
      return NextResponse.json(
        { error: "This email is already on the waitlist." },
        { status: 409 }
      );
    }

    entries.push({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      neighborhood: typeof neighborhood === "string" ? neighborhood.trim() : "",
      timestamp: new Date().toISOString(),
    });

    await writeEntries(entries);

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Try again." },
      { status: 500 }
    );
  }
}
