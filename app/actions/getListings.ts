import prisma from "@/app/libs/prismadb";

interface GetListingsParams {
    userId?: string;
}

export default async function getListings(params?: GetListingsParams) {
    try {
        const whereClause = params?.userId ? { userId: params.userId } : {};

        const listings = await prisma.listing.findMany({
            where: whereClause,
            orderBy: {
                createdAt: 'desc'
            }
        });

        const safeListings = listings.map((listing) => ({
            ...listing,
            createdAt: listing.createdAt.toISOString(),
        }));

        return safeListings;
    } catch (error: any) {
        throw new Error(error);
    }
}
