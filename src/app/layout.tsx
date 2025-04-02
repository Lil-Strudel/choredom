import "~/styles/globals.css";

import "@fontsource/indie-flower";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { HydrateClient } from "~/trpc/server";
import { MonthContextProvider } from "~/components/month-selector-context";

export const metadata: Metadata = {
  title: "Welcome to CHOREDOM",
  description: "A place to get chores done!",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="font-indie font-bold">
      <body className="max-w-screen t-[#aed1b8]ext-xl h-screen max-h-screen w-screen overflow-hidden bg-white text-[#4f3c33]">
        <TRPCReactProvider>
          <MonthContextProvider>
            <HydrateClient>{children}</HydrateClient>
          </MonthContextProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
