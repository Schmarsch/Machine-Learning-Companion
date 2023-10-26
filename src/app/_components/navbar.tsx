import React from "react";
import { getServerAuthSession } from "~/server/auth";
import signIn from "next-auth";
import Image from "next/image";
import Link from "next/link";

const navbar = async () => {
  const session = await getServerAuthSession();

  return (
    <div className="sticky top-0 z-10 bg-gradient-to-b from-base-100 via-base-100 to-transparent p-2">
      <div className="navbar z-10 rounded-xl bg-gradient-to-br from-primary to-base-300">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost">
            Machine Learning Companion
          </Link>
        </div>
        {session ? (
          <div className="flex-none">
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="avatar btn btn-circle btn-ghost">
                <div className="w-10 rounded-full">
                  <Image
                    src={session.user.image ?? ""}
                    alt="profile"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu dropdown-content rounded-box menu-sm z-[1] mt-3 w-52 bg-base-100 p-2 shadow"
              >
                <li>
                  <Link href="/api/auth/signout">Logout</Link>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="w-20 flex-none">
            <Link
              href="/api/auth/signin"
              className="btn btn-square btn-primary w-full"
            >
              Sign in
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default navbar;
