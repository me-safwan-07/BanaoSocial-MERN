// // /* eslint-disable import/no-anonymous-default-export */
// // import React from "react";
// // import { useGoogleLogin } from "@react-oauth/google";
// // import { googleAuth } from "@/api/authAPI";
// // import { useNavigate } from "react-router-dom";
// // import { TUser } from "@/types/user";
// // // import { googleAuth } from "../services/api";
// // interface Props {
// // 	setUser: (user: any) => void;
// // }

// // interface AuthResult {
// // 	code?: string;
// // }

// export default (props: Props) => {
//     const navigate = useNavigate();
// 	const responseGoogle = async (authResult: AuthResult) => {
// 		try {       
// 			if (authResult.code) {
// 				// console.log(authResult.code);
// 				const result = await googleAuth(authResult.code);
//                 console.log(result);
//                 console.log(result.token)
//                 localStorage.setItem("token", result.token);
//                 props.setUser(result.data.user);
//                 console.log(result.data.user.id);
//                 navigate(`/environments/${result.data.user.id}/forms`);
//             } else {
//                 console.log(authResult);
//                 throw new Error("Google login failed");
// 			}
// 		} catch (e) {
// 			console.log(e);
// 			// alert("Failed to login with Google");
// 		}
// 	};

// 	const googleLogin = useGoogleLogin({
// 		onSuccess: responseGoogle,
// 		onError: (errorResponse) => {
// 			console.error(errorResponse);
// 			alert("Failed to login with Google");
// 		},
// 		flow: "auth-code",
// // 	});

// 	return (
// 		<button
// 			style={{
// 				padding: "10px 20px",
// 			}}
// 			onClick={googleLogin}
// 		>
// 			Sign in with Google
// 		</button>
// 	);
// };