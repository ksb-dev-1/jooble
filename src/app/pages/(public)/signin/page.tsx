import { redirect } from "next/navigation";

// actions
import { githubSigninAction, googleSigninAction } from "@/actions/authActions";

// components
import GoogleSigninButton from "@/components/signin/GoogleSigninButton";
import GithubSigninButton from "@/components/signin/GithubSigninButton";

// 3rd party
import { UserRole } from "@prisma/client";
import { auth } from "@/auth";

const SigninPage = async () => {
  const session = await auth();
  const role = session?.user.role;

  if (role === UserRole.JOB_SEEKER) redirect("/pages/jobs");
  if (role === UserRole.RECRUITER) redirect("/pages/post-job");
  if (role === UserRole.NOT_ASSIGNED) redirect("/pages/select-role");

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4">
      <div className="w-full sm:w-[400px] overflow-hidden shadow-md bg-white">
        <p className="bg-violet-600 text-xl text-white text-center md:text-start font-bold p-4">
          Sign in
        </p>
        <div className="p-8">
          <form action={googleSigninAction}>
            <GoogleSigninButton />
          </form>
          <form action={githubSigninAction}>
            <GithubSigninButton />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
