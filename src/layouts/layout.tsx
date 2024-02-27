import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";

type Props = {
  children: React.ReactNode;
  showHero?: boolean;
};

function Layout({ children, showHero = false }: Props) {
  return (
    <div className="flex flex-col overflow-y-auto scrollbar min-h-screen">
      <Header />
      {showHero && <Hero />}
      <div className="max-w-7xl w-full px-6 mx-auto flex-1 py-10">{children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
