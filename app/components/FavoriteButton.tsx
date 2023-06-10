'use client';

import { SafeUser } from "..@/app/types";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

interface FavoriteButtonProps {
    listingId: string;
    currentUser?: SafeUser | null;
}


const FavoriteButton: React.FC<FavoriteButtonProps> = ({
    listingId,
    currentUser
}) => {
    const hasFavorited = false;
    const toggleFavorite = () => {};

    return ( 
        <div
            onClick={toggleFavorite}
            className="
                relative
                hover:opacity-80
                transition
                cursor-pointer
            "
        >
            <AiOutlineStar
                size={28}
                className="
                    fill-white
                    absolute
                    -top-[2px]
                    -right-[2px]
                "
            />
            <AiFillStar
                size={24}
                className={
                    hasFavorited ? 'fill-yellow-600' : 'fill-neutral-500/70'
                }
            />

        </div>
    );
}

export default FavoriteButton;