import { Footer } from "@/components/footer";
import Header from "@/components/header";
import "./market.styles.css";
export default function WWWLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header></Header>
      {children}
      <Footer></Footer>
    </>
  );

  return <>{children}</>;
}
