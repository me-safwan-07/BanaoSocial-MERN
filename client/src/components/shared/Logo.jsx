import { Link } from "react-router-dom";

const Logo = () => {
    return (
        <Link to={"/"} className="flex items-center space-x-2">
            <img src="/logo.png" alt="" className="w-2/4" />
            {/* <h1>
                <span className="font-semibold">Link</span>
                <span className="text-xl text-primary">Sphere</span>
            </h1> */}
        </Link>
    );
};

export default Logo;
