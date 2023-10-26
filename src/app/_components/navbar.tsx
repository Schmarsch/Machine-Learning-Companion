import React from "react";
import { getServerAuthSession } from "~/server/auth";
import signIn from "next-auth";
import Image from "next/image";
import Link from "next/link";

const navbar = async () => {
  const session = await getServerAuthSession();

  return (
    <div className="navbar rounded-xl bg-gradient-to-br from-primary to-base-300">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl normal-case">daisyUI</a>
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
  );
};

export default navbar;
