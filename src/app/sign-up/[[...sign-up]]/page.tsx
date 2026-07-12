import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
      <SignUp
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "bg-gray-900 border border-white/10 shadow-2xl shadow-indigo-500/10",
          },
        }}
      />
    </div>
  );
}
