import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import logo from "public/logo.png";
import Image from "next/image";
import { api } from "~/utils/api";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const { data: sessionData } = useSession();

  const customSignIn = async () => {
    await signIn(); // Perform sign in

    if (sessionData) {
      router.push("/home"); // Redirect to /home if signed in
    }
  };

  function AuthShowcase() {
    const { data: sessionData } = useSession();

    const { data: secretMessage } = api.example.getSecretMessage.useQuery(
      undefined, // no input
      { enabled: sessionData?.user !== undefined },
    );

    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <p className="text-center text-2xl text-white">
          {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
          {secretMessage && <span> - {secretMessage}</span>}
        </p>
        <button
          className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
          onClick={sessionData ? () => void signOut() : customSignIn} // Use customSignIn function
        >
          {sessionData ? "Sign out" : "Sign in"}
        </button>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Potluck</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=" flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#FCD19C] to-[#FCD19C]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <div className="flex flex-row">
            <Image
              src={logo}
              width={150}
              height={150}
              alt="Picture of the author"
            />
            <h1 className="text-9xl	 font-extrabold text-[#AA825D]">potluck</h1>
          </div>

          <div className="grid grid-cols-1 gap-4"></div>
          <div className="flex flex-col items-center gap-2">
            <AuthShowcase />
          </div>
        </div>
      </main>
    </>
  );
}
