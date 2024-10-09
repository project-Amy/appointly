import Navbar from "../components/Navbar";
import PicturesPhotos from "../components/PicturesPhotos";
import Trattamento from "../components/Trattamento";
import { leftItems, rightItems } from "../data/constants";


export default function Service() {


  return (
    <div className="lg:h-screen lg:overflow-y-hidden bg-gray-100">
      <Navbar />
      <div className="">
        <h1 className=" text-3xl md:text-5xl text-center font-light mt-4 font-serif">
          I NOSTRI TRATTAMENTI
        </h1>
        <h2 className="text-center text-2xl font-light">
          Si eseguono su prenotazione: Servizio sposa, Trucco Sposa e Truocco
          giorno/sera
        </h2>

        <PicturesPhotos />

        <div className="grid md:grid-cols-2 m-auto  text-3xl md:text-4xl font-light  w-[90%] md:w-[60%] gap-10 pb-2">
          <div className="text-center">
            {leftItems.map((item, index) => (
              <Trattamento key={index} item={item.toUpperCase()} />
            ))}
          </div>
          <div className=" text-center">
            {rightItems.map((item, index) => (
              <Trattamento key={index} item={item.toUpperCase()} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
