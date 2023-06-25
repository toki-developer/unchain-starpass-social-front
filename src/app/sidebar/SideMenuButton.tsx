"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = React.LinkHTMLAttributes<HTMLAnchorElement> & { href: string };
export const SideMenuButton = ({ href, ...props }: Props) => {
  const currentRoute = usePathname();
  const isActive = currentRoute == href;
  return (
    <Link
      {...props}
      href={href}
      className={`text-xl mt-6 ${isActive ? "text-violet-11" : ""}`}
    />
  );
};
