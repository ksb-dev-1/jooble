import { redirect } from "next/navigation";

// 3rd party
import { auth, signOut } from "@/auth";

const PostJobPage = async () => {
  const session = await auth();

  if (!session?.user.id) redirect("/pages/signin");

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="font-bold text-xl">Post Job</h1>
      <div className="mt-2">
        <span className="font-bold">Name : </span>
        <span>{session?.user.name}</span>
      </div>
      <div className="mt-2">
        <span className="font-bold">Email : </span>
        <span>{session?.user.email}</span>
      </div>
      <div className="mt-2">
        <span className="font-bold">Role : </span>
        <span>{session?.user.role}</span>
      </div>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button
          type="submit"
          className="bg-[#333] text-white px-4 py-2 rounded mt-2"
        >
          Sign out
        </button>
      </form>
    </div>
  );
};

export default PostJobPage;
