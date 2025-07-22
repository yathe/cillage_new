export const dynamic = "force-dynamic";

<<<<<<< HEAD
import db from "../../db/db";
import { currentUser } from "@clerk/nextjs/server";
import { ClientHeader } from "@/components/Layout/ClientHeader"; // ✅ Corrected
import { redirect } from "next/navigation";


const layout = async ({ children }: { children: React.ReactNode }) => {
 
  const user = await currentUser();
  if (!user) {
     redirect("/sign-in");
  }
  const loggedInUser = await db.user.findUnique({
    where: { clerkUserId: user.id },
  });
  if (!loggedInUser) {
    await db.user.create({
      data: {
        name: `${user.fullName} ${user.lastName}`,
        clerkUserId: user.id,
        email: user.emailAddresses[0].emailAddress,
        imageUrl: user.imageUrl,
      },
    });
  }
  return (
    <div>
      <ClientHeader />
      {children}
=======
import { ClientHeader } from "@/components/Layout/ClientHeader";
import db from "@/db/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";


const Layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentUser();

  // If not logged in, redirect to sign-in page
  if (!user) {
    redirect("/sign-in");
  }

  // See if user exists in DB
  let loggedInUser = await db.user.findUnique({
    where: { clerkUserId: user.id },
  });

  // If not, create new user record
  if (!loggedInUser) {
    loggedInUser = await db.user.create({
      data: {
        name: user.fullName || `${user.firstName ?? ""} ${user.lastName ?? ""}`,
        clerkUserId: user.id,
        email: user.emailAddresses[0]?.emailAddress ?? "",
        imageUrl: user.imageUrl ?? "",
      },
    });
  }

  return (
    <div>
      <ClientHeader />
      <div className="container my-6">{children}</div>
>>>>>>> 44ac3c5 (WIP before pulling)
    </div>
  );
};

<<<<<<< HEAD
export default layout;
=======
export default Layout;
>>>>>>> 44ac3c5 (WIP before pulling)
