import landingImage from "../assets/landing.png";
import appDownloadImage from "../assets/appDownload.png";
import { Separator } from "@/components/ui/separator";
import { SearchBar, SearchForm } from "@/components/searchBar";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  
  const handleSearchSubmit = (values: SearchForm) => {
    navigate({
      pathname: `/search/${values.searchQuery}`
    });
  }
  return (
    <div className="flex flex-col gap-12">
      <div className="rounded-lg md:px-32 flex flex-col gap-5 bg-background  text-center -mt-16 shadow-md py-8">
        <h1 className="md:text-5xl text-3xl font-bold tracking-tight text-orange-600">
          Tuck into a takeway today
        </h1>
        <span className="text-lg text-slate-500">
          Food is just a click away!
        </span>
        <SearchBar onSubmit={handleSearchSubmit} placeholder="Search by city or town"/>
      </div>
        <Separator className="hidden dark:block"/>
      <div className="grid md:grid-cols-2 gap-5">
        <img src={landingImage} className="" alt="landing-image" />
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <span className="font-bold text-3xl  tracking-tighter">
            Order Take-away even faster!
          </span>
          <span className="text-slate-500">
            Download the Eatsy App for faster ordering and personalised
            recommendations
          </span>
          <img src={appDownloadImage} alt="App download image" />
        </div>
      </div>
    </div>
  );
}

export default App;
