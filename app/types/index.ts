import { Listing, Inquiry, User } from "@prisma/client";

export type SafeListing = Omit<
    Listing,
    "createdAt"
> & {
    createdAt: string;
}

export type SafeInquiry = Omit<
  Inquiry, 
  "createdAt" | "offerStartDate" | "offerThruDate" | "listing"
> & {
  createdAt: string;
  offerStartDate: string;
  offerThruDate: string;
  listing: SafeListing;
};


export type SafeUser = Omit<
    User,
    "createdAt" | "updatedAt" | "emailVerified"
> & {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
};