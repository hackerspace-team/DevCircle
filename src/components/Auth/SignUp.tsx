"use client";

import siteConfig from "@/config";
import Link from "next/link";
import { FiGlobe } from "react-icons/fi";
import OAuthSignIn from "./OAuthSignIn";
import { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../UI/Card";

interface SignInProps {
  customTitle?: string;
}

const SignUp: FC<SignInProps> = () => {
  return (
    <Card className="flex flex-col justify-center text-center border-2 dark:border-1 border-zinc-800">
      <CardHeader className="flex flex-col gap-2">
        <FiGlobe size={75} className="mx-auto dark:text-zinc-300" />
        <CardTitle className="text-4xl md:text-4xl h-full font-semibold tracking-tight dark:text-transparent bg-clip-text text-zinc-800 dark:bg-gradient-to-br dark:from-zinc-200 dark:to-zinc-400">
          Register Now
        </CardTitle>
        <CardDescription className="max-w-xs text-lg mx-auto tracking-tighter">
          By continuing, you are setting up a {siteConfig.siteName} account and
          agree to our User Agreement and Privacy Policy.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <OAuthSignIn />
      </CardContent>
      <CardContent>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-center text-sm w-full md:text-md text-center text-zinc-700 dark:text-zinc-300">
        <p className="mr-2">Already have an account?</p>
        <Link
          href="/signin"
          className="hover:text-zinc-800 dark:hover:text-zinc-500 underline underline-offset-4"
        >
          Sign In
        </Link>
      </CardFooter>
    </Card>
  );
};

export default SignUp;
