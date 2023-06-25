import { PostList } from "src/component/indexPage";

export default async function Page() {
  return (
    <div className="w-[700px] border-r border-violet-6 min-h-screen">
      <h1 className="border-b border-violet-6 py-2 text-xl pl-4">
        Unchain SNS
      </h1>
      <PostList />
    </div>
  );
}
