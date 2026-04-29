import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

import ContextLibraryClient from "./pageClient";

export default async function ContextLibraryPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  const [rules, comparables] = await Promise.all([
    prisma.jurisdictionRule.findMany({
      orderBy: { updatedAt: "desc" },
      take: 10,
    }),
    prisma.comparableProperty.findMany({
      orderBy: { updatedAt: "desc" },
      take: 10,
    }),
  ]);

  return <ContextLibraryClient initialRules={rules} initialComparables={comparables} />;
}
