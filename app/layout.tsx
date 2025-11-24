import "./globals.css";

export const metadata = {
  title: "Mithril-OS",
  description: "Tactical Forest Monitoring Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-200 overflow-hidden h-screen w-screen">
        {children}
      </body>
    </html>
  );
}
