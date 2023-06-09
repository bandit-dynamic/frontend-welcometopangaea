'use client';

import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../Avatar';
import { useCallback, useState } from 'react';
import MenuItem from './MenuItem';
import { useRouter } from "next/navigation";

import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import useSellModal from '@/app/hooks/useSellModal';

import { signOut } from 'next-auth/react';
import { SafeUser } from '@/app/types';

interface UserMenuProps {
    currentUser?: SafeUser | null
}

const UserMenu: React.FC<UserMenuProps>= ({
    currentUser
}) => {
    const router = useRouter();
    
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const sellModal = useSellModal();

    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);
    
    const onSell = useCallback(() => {
        if (!currentUser) {
            return loginModal.onOpen();
        }

        sellModal.onOpen();
    }, [currentUser, loginModal, sellModal]);

    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div
                    onClick={onSell}
                    className="
                    hidden
                    md:block
                    text-sm
                    font-semibold
                    px-4
                    py-3
                    hover:bg-neutral-100
                    transition
                    cursor-pointer
                    "
                >
                    List your property!
                </div> 
                <div
                onClick={toggleOpen}
                className="
                p-4
                md:py-1
                md:px-2
                border-[1px]
                border-neutral-200
                flex
                flex-row
                items-center
                gap-3             
                cursor-pointer
                hover:shadow-md
                transition
                "
                >
                    <AiOutlineMenu />
                    <div className="hidden md:block">
                        <Avatar src={currentUser?.image}/>

                    </div>
                </div>
            </div>

            {isOpen && (
                <div
                    className="
                        absolute
                        rounded-xl
                        shadow-md
                        w-[40vw]
                        md:w-3/4
                        bg-white
                        overflow-hidden
                        right-0
                        top-12
                        text-sm
                    "
                >
                    <div className="flex flex-col cursor-pointer">
                        {currentUser ? (
                            <>
                            <MenuItem 
                                onClick={() => router.push('/properties')}
                                label="Properties"
                            />
                            <MenuItem 
                                onClick={() => {}}
                                label="My Favorites"
                            />
                            <MenuItem 
                                onClick={sellModal.onOpen}
                                label="List My property"
                            />
                            <hr />
                            <MenuItem 
                                onClick={() => signOut()}
                                label="Logout"
                            />
                            </>
                        ) : (
                        <>
                        <MenuItem 
                            label="Login" 
                            onClick={loginModal.onOpen}
                        />
                        <MenuItem 
                            label="Sign up" 
                            onClick={registerModal.onOpen}
                        />
                    </>
                )}
            </div>
          </div>
        )}
      </div>
    );
}

export default UserMenu;