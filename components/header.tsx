"use client";
import { Loader2, LogOut } from "lucide-react";
import {
  ClerkLoaded,
  ClerkLoading,
  UserButton,
  useUser,
  useClerk,
} from "@clerk/nextjs";

import { HeaderLogo } from "@/components/header-logo";
import { Navigation } from "@/components/navigation";
import { WelcomeMsg } from "@/components/welcome-msg";
import { Filters } from "@/components/filters";

export const Header = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const demoEmail = process.env.NEXT_PUBLIC_DEMO_USER_EMAIL;
  const isDemo = user?.emailAddresses?.[0]?.emailAddress === demoEmail;

  return (
    <header className="bg-gradient-to-b from-blue-700 to-blue-500 px-4 py-8 lg:px-14 pb-36">
      <div className="max-w-screen-2xl mx-auto">
        <div className="w-full flex items-center justify-between mb-14">
          <div className="flex items-center lg:gap-x-16">
            <HeaderLogo />
            <Navigation />
          </div>
          <ClerkLoaded>
            {isDemo ? (
              <button
                onClick={() =>
                  signOut(() => {
                    setTimeout(() => window.location.replace("/"), 500);
                  })
                }
                className="p-2 rounded bg-white/10 text-white hover:bg-white/20 transition border-none flex items-center justify-center"
                aria-label="Sign out demo user"
              >
                <LogOut className="h-4 w-4" />
              </button>
            ) : (
              <UserButton afterSignOutUrl="/" />
            )}
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className="size-8 animate-spin text-slate-400" />
          </ClerkLoading>
        </div>
        <WelcomeMsg />
        <Filters />
      </div>
    </header>
  );
};
