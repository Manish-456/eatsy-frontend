import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";

type Props = {
  children: React.ReactNode;
  showHero?: boolean;
};

function Layout({ children, showHero = false }: Props) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {showHero && <Hero />}
      <div className="md:container px-4 mx-auto flex-1 py-10">{children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
