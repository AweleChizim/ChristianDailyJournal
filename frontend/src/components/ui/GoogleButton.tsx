import type { JSX } from "react";

import { GoogleLogin } from "@react-oauth/google";

import {
    googleLogin,
    saveToken,
    saveUser,
    startSessionTimer,
} from "../../api/authApi";

import { getCurrentUser } from "../../api/userApi";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

interface GoogleButtonProps {
  onSuccess?: (credential: string) => Promise<void>;
}

export default function GoogleButton({
  onSuccess,
}: GoogleButtonProps): JSX.Element {

    const navigate = useNavigate();

    async function handleGoogleSuccess(
        credential: string
    ) {

      if (onSuccess) {
          await onSuccess(
              credential
          );
          return;
      }

        try {

            const response =
                await googleLogin(
                    credential
                );

            saveToken(
                response.access_token
            );

            startSessionTimer(
                response.access_token,
                () => {

                    toast(
                        "Your session has expired."
                    );

                    navigate("/login");

                }
            );

            const user =
                await getCurrentUser();

            saveUser(user);

            toast.success(
                "Welcome!"
            );

            navigate(
                "/dashboard"
            );

        } catch {

            toast.error(
                "Google login failed."
            );

        }

    }

    return (

        <GoogleLogin

            onSuccess={(response) => {

                if (
                    response.credential
                ) {

                    handleGoogleSuccess(
                        response.credential
                    );

                }

            }}

            onError={() =>
                toast.error(
                    "Google login failed."
                )
            }

            useOneTap={false}

        />

    );

}