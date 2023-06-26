
import { PostList } from "src/component/indexPage";
import { SearchNav } from "src/component/indexPage/SearchNav";

export default async function Page() {


  return (
    <div className="w-[700px] border-r border-violet-6 min-h-screen">
      <div className="border-b border-violet-6 ">
        <h1 className="py-2 text-xl pl-4">Unchain SNS</h1>
        <SearchNav />
      </div>
      <PostList />
    </div>
  );
}
