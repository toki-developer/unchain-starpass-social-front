import { ConnectButton } from "./ConnectButton";
import { PostButton } from "./PostButton";
import { SideMenuButton } from "./SideMenuButton";

type SideMenuType = { title: string; href: string };

const sideMenu: SideMenuType[] = [
  { title: "ホーム", href: "/" },
  { title: "検索", href: "/search" },
  { title: "通知", href: "/notification" },
  { title: "いいね", href: "/like" },
];

export const Sidebar = () => {
  return (
    <div className="flex flex-col h-screen items-start pt-8 pb-12 ml-40">
      <div className="h-16">
        <ConnectButton />
      </div>
      <div className="flex flex-col flex-1">
        {sideMenu.map(({ href, title }) => {
          return (
            <SideMenuButton key={title} href={href}>
              {title}
            </SideMenuButton>
          );
        })}
      </div>
      <PostButton />
    </div>
  );
};

