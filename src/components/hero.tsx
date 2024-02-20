import hero from "../assets/hero.png";
// import darkHero from "../assets/dark-hero.png";

export function Hero() {
  return <div>
    <img
    src={hero}
    className="w-full  max-h-[600px] object-cover rounded-md "
    />
{/*     
    <img
    src={darkHero}
    className="w-full dark:block hidden max-h-[600px] object-cover "
    /> */}

  </div>;
}
