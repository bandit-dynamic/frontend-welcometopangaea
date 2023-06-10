'use client';

import { eachDayOfInterval } from "date-fns";
import { useRouter } from "next/navigation";
import { Inquiry } from "@prisma/client";

import { SafeListing, SafeInquiry, SafeUser } from "@/app/types";
import { useMemo } from "react"
import { categories } from "@/app/components/navbar/Categories";
import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";

import useLoginModal from "@/app/hooks/useLoginModal";

const initialDateRange = {
    offerStartDate: new Date(),
    offerThruDate: new Date(),
    key: 'selection'
};

interface ListingClientProps {
    inquiries?: Inquiry[]
    listing: SafeListing & {
        user: SafeUser
    };
    currentUser?: SafeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
    listing,
    inquiries = [],
    currentUser
}) => {
    const loginModal = useLoginModal();
    const router = useRouter();

    const disabledDates = useMemo (() => {
        let dates: Date[] = [];

        inquiries.forEach((inquiry) => {
            if (inquiry.offerStartDate && inquiry.offerThruDate) {
            const range = eachDayOfInterval({
                start: new Date(inquiry.offerStartDate),
                end: new Date(inquiry.offerThruDate)
            });

            dates = [...dates, ...range];
            }
        })

        return dates;
    }, [inquiries])


    const category = useMemo(() => {
        return categories.find((item) => 
        item.label === listing.category);
    }, [listing.category]);


    return ( 
        <Container>
            <div className="max-w-screen-lg mx-auto">
                <div className="flex flex-col gap-6">
                    <ListingHead 
                        title={listing.title || 'Default Title'}
                        imageSrc={listing.imageSrc || '/default-image.jpg'}
                        id={listing.id}
                        currentUser={currentUser} locationValue={""}                    />
                    <div className="
                        grid
                        grid-cols-1
                        md:grid-cols-7
                        md:gap-10
                        mt-6
                    ">
                        <ListingInfo
                            user={listing.user}
                            category={category}
                            acreageCount={listing.acreageCount || 0}
                            locationValue={listing.locationValue || 'N/A'} description={""}                        />
                    </div>
                </div>

            </div>
        </Container>
     );
}
 
export default ListingClient;