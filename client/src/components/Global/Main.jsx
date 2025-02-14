
import { selectOtherPosts } from "@/redux/post/post.selector";
import { useSelector } from "react-redux";
import Post from "../shared/Post";

const Main = () => {
    const otherPosts = useSelector(selectOtherPosts);

  return (
      <main className="flex-1 flex flex-col w-[50%] mt-[80px] gap-4 pb-10">
          {otherPosts.map((post, index) => (
              <Post key={index} post={post} />
          ))}
      </main>
  );
}

export default Main;