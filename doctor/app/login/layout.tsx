import type React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MediPanel - Doctor Admin Panel",
  description: "Professional medical admin panel for doctors",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <html lang="en">
        <body>
          <div className="flex h-screen bg-gray-50">
            <div>
              <div className="w-[99vw]">
                <main>{children}</main>
              </div>
            </div>
          </div>
        </body>
      </html>
  );
}
