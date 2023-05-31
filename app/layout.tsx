import { Nunito } from "next/font/google";

import './globals.css'
import Navbar from "./components/navbar/Navbar";
// import ClientOnly from "./components/ClientOnly";
// import Modal from "./components/modals/Modal";
import RegisterModal from "./components/modals/registerModal";

export const metadata = {
  title: 'Pangaea Land Group, Inc.',
  description: 'Land Acquisitions and Sales',
}

const font = Nunito({
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        {/* <ClientOnly> */}
          {/* <Modal actionLabel="Submit" title="Welcome to Pangaea Land Group!" isOpen /> */}
          <RegisterModal />
          <Navbar />
        {/* </ClientOnly> */}
        {children}
      </body>
    </html>
  )
}
