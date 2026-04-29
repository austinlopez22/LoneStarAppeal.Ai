import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

function wrapText(text: string, maxLineLength = 95) {
  const paragraphs = text.split("\n");
  const lines: string[] = [];

  for (const paragraph of paragraphs) {
    if (!paragraph.trim()) {
      lines.push("");
      continue;
    }

    const words = paragraph.split(/\s+/);
    let current = "";

    for (const word of words) {
      const next = current ? `${current} ${word}` : word;
      if (next.length > maxLineLength) {
        lines.push(current);
        current = word;
      } else {
        current = next;
      }
    }

    if (current) {
      lines.push(current);
    }
  }

  return lines;
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;

  const report = await prisma.report.findFirst({
    where: {
      id,
      property: {
        userId: session.user.id,
      },
    },
    include: {
      property: true,
    },
  });

  if (!report) {
    return NextResponse.json({ error: "Report not found." }, { status: 404 });
  }

  const pdf = await PDFDocument.create();
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdf.embedFont(StandardFonts.HelveticaBold);

  let page = pdf.addPage([612, 792]);
  let y = 740;

  const drawLine = (text: string, opts?: { bold?: boolean; size?: number }) => {
    const size = opts?.size ?? 11;

    if (y < 60) {
      page = pdf.addPage([612, 792]);
      y = 740;
    }

    page.drawText(text, {
      x: 50,
      y,
      size,
      font: opts?.bold ? boldFont : font,
      color: rgb(0.1, 0.1, 0.1),
    });
    y -= size + 6;
  };

  drawLine("LoneStarAppeals.AI Property Tax Appeal Report", {
    bold: true,
    size: 18,
  });
  drawLine(report.property.address, { size: 12 });
  drawLine(
    `${report.property.county} County, ${report.property.state} | ${new Date(
      report.createdAt
    ).toLocaleDateString()}`,
    { size: 12 }
  );
  y -= 10;

  drawLine("AI Market Analysis", { bold: true, size: 14 });
  for (const line of wrapText(report.aiAnalysis)) {
    drawLine(line);
  }

  y -= 12;
  drawLine("Appeal Letter", { bold: true, size: 14 });
  for (const line of wrapText(report.appealLetter)) {
    drawLine(line);
  }

  const bytes = await pdf.save();

  return new NextResponse(Buffer.from(bytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="appeal-report-${report.id}.pdf"`,
    },
  });
}
