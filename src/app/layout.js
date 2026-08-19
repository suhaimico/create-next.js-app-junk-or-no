import "./globals.css";

export const metadata = {
  title: "Junk or No | Food Checker",
  description: "A friendly guide for checking everyday foods.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
