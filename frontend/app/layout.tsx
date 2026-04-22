import "./globals.css";

export const metadata = {
  title: "Pinterest AI Engine",
  description: "Pinterest affiliate growth engine dashboard"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

