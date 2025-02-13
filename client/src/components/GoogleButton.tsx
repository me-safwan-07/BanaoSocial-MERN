import { useNavigate } from "react-router-dom";
// import { googleAuth } from "@/api/authAPI";
import Button from "./ui/button";
// import { useGoogleLogin } from "@react-oauth/google";

export const GoogleButton = ({
  text = "Continue with Google",
}: {
  text?: string;
}) => {
  const navigate = useNavigate();

  // const responseGoogle = async (authResult: {
  //   code: string;
  // }) => {
  //   try {       
  //     if (authResult.code) {
  //       const result = await googleAuth(authResult.code);
  //       console.log(result);
  //       console.log(result.token)
  //       localStorage.setItem("token", result.token);
  //       console.log(result.data.user.id);
  //       navigate(`/environments/${result.data.user.id}/forms`);
  //     } else {
  //       console.log(authResult);
  //       throw new Error("Google login failed");
  //     }
  //   } catch (e) {
  //     console.log(e);
  //     // alert("Failed to login with Google");
  //   }
  // };

  // const handleGoogleSignIn = useGoogleLogin({
  //   onSuccess: responseGoogle,
  //   onError: (errorResponse: any) => {
  //     console.error(errorResponse);
  //     alert("Failed to login with Google");
  //   },
  //   flow: "auth-code",
  // });
  return (
    <Button
      type="button"
      // EndIcon={GoogleIcon}
      startIconClassName="ml-3"
      // onClick={handleGoogleSignIn}
      variant="secondary"
      className="w-full justify-center"
    >

      {text}
    </Button>
  );
};
