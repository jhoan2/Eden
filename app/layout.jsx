import "./globals.css";
import ConnectKitWrapper from "../components/ConnectKitWrapper";

// eslint-disable-next-line react/prop-types
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.jsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <ConnectKitWrapper>
            {children}
        </ConnectKitWrapper>
      </body>
    </html>
  );
}
