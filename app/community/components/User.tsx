"use client";

import * as Avatar from "@radix-ui/react-avatar";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import { useUser } from "@clerk/nextjs";
import { useClerk } from "@clerk/clerk-react";
import { SignInButton } from "@clerk/nextjs";

export default function User() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useClerk();

  if (isSignedIn) {
    return (
      <>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger className="cursor-pointer rounded-full">
            <Avatar.Root className="inline-flex h-14 w-14 select-none items-center justify-center overflow-hidden rounded-full border border-secondary bg-secondary align-middle">
              <Avatar.Image
                className="h-full w-full rounded-[inherit] object-cover"
                src={user?.imageUrl}
                alt="Avatar image"
              />
              <Avatar.Fallback
                className="flex h-full w-full items-center justify-center border border-secondary bg-secondary text-lg font-medium text-primary"
                delayMs={600}
              >
                {user?.firstName?.charAt(0)}
                {user?.lastName?.charAt(0)}
              </Avatar.Fallback>
            </Avatar.Root>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              sideOffset={8}
              align="end"
              className="rounded-xl border border-secondary bg-primary p-2 text-base shadow-lg sm:text-sm"
            >
              <DropdownMenu.Group className="">
                <DropdownMenu.Item className="px-4 py-2" disabled>
                  <div className="leading-tight">
                    <p className="font-medium">{user?.fullName}</p>
                    <p className="text-sm text-secondary">
                      {user?.primaryEmailAddress?.emailAddress}
                    </p>
                  </div>
                </DropdownMenu.Item>
                <DropdownMenu.Separator>
                  <hr className="my-2 border-secondary" />
                </DropdownMenu.Separator>

                <DropdownMenu.Item
                  className=" cursor-default select-none rounded-md px-4 py-2 outline-none hover:bg-secondary focus:outline-none"
                  onClick={() => signOut()}
                >
                  Sign out
                </DropdownMenu.Item>
                <DropdownMenu.Item className="cursor-default select-none rounded-md px-4 py-2 text-red-500 outline-none hover:bg-red-100 focus:outline-none dark:hover:bg-red-950">
                  Delete Account
                </DropdownMenu.Item>
              </DropdownMenu.Group>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </>
    );
  }
  return (
    <SignInButton mode="modal" redirectUrl="/community">
      <button className="rounded-md border border-secondary bg-transparent px-4 py-1.5 text-base">
        <span>Sign in</span>
      </button>
    </SignInButton>
  );
}