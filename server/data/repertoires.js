import prisma from "./prisma";

export async function getRepertoires() {
  const repertoires = await prisma.repertoires.findMany({
    orderBy: { id: "asc" },
  });

  return repertoires;
}