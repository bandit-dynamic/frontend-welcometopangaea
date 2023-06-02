import { Nunito } from "next/font/google";

import './globals.css'
import Navbar from "./components/navbar/Navbar";
// import ClientOnly from "./components/ClientOnly";
// import Modal from "./components/modals/Modal";

import SellModal from "./components/modals/SellModal";
import RegisterModal from "@/app/components/modals/RegisterModal";
import LoginModal from "@/app/components/modals/LoginModal";

import ToasterProvider from "@/app/providers/ToasterProvider";
import getCurrentUser from "./actions/getCurrentUser";


export const metadata = {
  title: 'Pangaea Land Group, Inc.',
  description: 'Land Acquisitions and Sales',
}

const font = Nunito({
  subsets: ['latin'],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        {/* <ClientOnly> */}
          {/* <Modal actionLabel="Submit" title="Welcome to Pangaea Land Group!" isOpen /> */}
          <ToasterProvider />
          <SellModal />
          <LoginModal />
          <RegisterModal />
          <Navbar currentUser={currentUser} />
        {/* </ClientOnly> */}
        {children}
      </body>
    </html>
  )
}
