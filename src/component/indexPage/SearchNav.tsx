"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

const searchSortMenu = [
  { title: "古い順", query: 1 },
  { title: "新しい順", query: 2 },
  { title: "いいねが多い順", query: 3 },
  { title: "いいねが少ない順", query: 4 },
];

export const SearchNav = () => {
  const searchParams = useSearchParams();
  const sort = searchParams.get("sort") ?? 2;

  return (
    <div className="flex justify-between px-6 py-2">
      {searchSortMenu.map((menu) => {
        return (
          <Link
            key={menu.title}
            href={{ pathname: "/", query: { sort: menu.query } }}
            className={`${sort == menu.query ? "text-violet-11" : ""}`}
          >
            {menu.title}
          </Link>
        );
      })}
    </div>
  );
};
