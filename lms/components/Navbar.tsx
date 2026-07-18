"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import NavItems from "./NavItem";
import {
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";

const Navbar = () => {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return null; // or loading skeleton
  }

  return (
    <nav className="navbar">
      <Link href="/">
        <div className="flex items-center gap-2.5 cursor-pointer">
          <Image
            src="/images/logo.svg"
            alt="logo"
            width={46}
            height={44}
          />
        </div>
      </Link>

      <div className="flex items-center gap-8">
        <NavItems />

        <div className="flex items-center gap-4">
          {!isSignedIn ? (
            <>
              <SignInButton>
                <button className="px-3 py-1 rounded bg-gray-100">
                  Sign in
                </button>
              </SignInButton>

              <SignUpButton>
                <button className="px-3 py-1 rounded bg-blue-600 text-white">
                  Sign up
                </button>
              </SignUpButton>
            </>
          ) : (
            <UserButton />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;