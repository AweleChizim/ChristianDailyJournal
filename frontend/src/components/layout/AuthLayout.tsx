import type { JSX, ReactNode } from "react";
import authImage from "../../assets/images/auth-side.png";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({
  children,
}: AuthLayoutProps): JSX.Element {
  return (
    <main className="min-h-screen bg-white">
      <div className="flex min-h-screen">
        {/* Left Panel */}
        <section className="hidden md:flex w-[45%] p-3">
            <img
                src={authImage}
                alt="Christian Daily Journal"
                className="
                    h-[calc(100vh-24px)]
                    w-full
                    rounded-[32px]
                    object-left
                "
            />
        </section>

        {/* Right Panel */}
        <section className="flex flex-1 items-center justify-center p-8">
          <div className="w-full max-w-lg">
            {children}
          </div>
        </section>
      </div>
    </main>
  );
}