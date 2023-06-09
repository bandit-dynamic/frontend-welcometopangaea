'use client';

import { Inquiry } from "@prisma/client";

import { SafeListing, SafeInquiry, SafeUser } from "@/app/types";
import { useMemo } from "react"
import { categories } from "@/app/components/navbar/Categories";
import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";




interface ListingClientProps {
    inquiries?: Inquiry[]
    listing: SafeListing & {
        user: SafeUser
    };
    currentUser?: SafeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
    listing,
    currentUser
}) => {

    


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