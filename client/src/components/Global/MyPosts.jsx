import { selectMyPosts } from "@/redux/post/post.selector";
import { useSelector } from "react-redux";
import Post from "../shared/Post";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const MyPosts = () => {
    const myPosts = useSelector(selectMyPosts);

    return (
        <div className="w-[50%] mt-[80px] flex-1 flex-col-center gap-4">
            <div className="w-full">
                <Button variant="outline"> <Link to={".."}>Back</Link> </Button>
            </div>
            <main className=" flex flex-col  gap-4 pb-10">
                {myPosts.map((post, index) => (
                    <Post key={index} post={post} />
                ))}
            </main>
        </div>
    );
};

export default MyPosts;
