'use client';

import { Listing, Inquiry } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from 'react';
import { format } from 'date-fns';
import Image from "nexxt/image";

import { SafeUser } from "@/app/types";

import useCountries from "@/app/hooks/useCountries";


interface ListingCardProps {
    data: Listing;
    inquiry?: Inquiry;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null;
}


const ListingCard: React.FC<ListingCardProps>  = ({
    data,
    inquiry,
    onAction,
    disabled,
    actionLabel,
    actionId = "",
    currentUser
}) => {
    const router = useRouter ();
    const { getByValue } = useCountries();

    // const location = getByValue(data.locationValue);

    const handleCancel = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();

            if (disabled) {
                return;
            }

            onAction?.(actionId);
        }, [onAction, actionId, disabled])

        const price = useMemo(() => {
            if (inquiry) {
                return inquiry.proposedPrice;
            }

            return data.price;
        }, [inquiry, data.price]);

        const inquiryDate = useMemo(() => {
            if (!inquiry) {
                return null;
            }

            // const start = new Date(inquiry.offerStartDate)
            // const end = new Date(inquiry.offerThruDate)

            return `${format(start, 'PP')} - ${format(end, 'PP')}`
        }, [inquiry])

    return (
        <div
            onClick={() => router.push(`/listings/${data.id}`)}
            className="
                col-span-1 cursor-pointer group
            
            "
        >
            <div className="flex flex-col gap-2 w-full">
                <div
                    className="
                        aspect-square
                        w-full
                        relative
                        overflow-hidden
                        rounded-xl
                    "
                >
                    <image 
                        fill
                        alt="Listing"
                        src={data.imageSrc}
                        className="
                            object-cover
                            h-full
                            w-full
                            group-hover:scale-110
                            transition
                        "
                    />
                </div>
            </div>
        </div>
    );
}

export default ListingCard;