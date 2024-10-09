import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Homepage() {
  return (
    <>
      <Navbar />
      <main className="bg-gray-200">
        <div className="bg-home h-full w-full">
          <div className="text-2xl w-[90%] lg:w-[70%] m-auto text-white">
            <h1 className=" text-4xl md:text-7xl text-start m-auto font-serif pt-32">
              Your Hair Salon
            </h1>
            <div className=" font-light text-start mt-20 m-auto">
              <div className=" md:tracking-widest">
                è il luogo in cui puoi rilassarti e prenderti una pausa dalla
                routine quotidiana. <br /> Lasciati coccolare dalle mani esperte
                di parrucchieri professionisti.
              </div>
            </div>
          </div>
          <div className="text-center mt-10 flex justify-center gap-5">
            <Link to={"/services"}>
              <button className="bg-black hover:bg-black/30 mb-12 text-white px-10 p-4  border border-white tracking-widest">
                Scopri i nostri servizi
              </button>
            </Link>
          </div>
        </div>
        <div className=" w-[90%] lg:w-[70%] m-auto  ">
          <div className="mt-10 text-3xl font-serif  ">
            I NOSTRI TRATTAMENTI:
          </div>
          <div className="md:grid grid-cols-2 items-center gap-10 pb-20 ">
            <p className="mt-10 text-base md:tracking-widest">
              Dai trattamenti più classici a quelli più innovativi, i servizi
              offerti dal nostro salone si distinguono per caratteristiche,
              tecniche e prodotti utilizzati. Siamo specializzati in diverse
              tipologie di schiariture, come Babylights, Airtouch, Microlights e
              Color Block. Ogni tecnica può essere applicata su tonalità calde e
              fredde, sempre con un’attenzione particolare alla salute del
              capello.
            </p>
            <img
              src="/treatment1.webp"
              alt=""
              className=" w-full lg:w-[450px] mt-10 md:mt-0 rounded-md border-[10px] border-white"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-5 md:gap-24 pb-20 ">
            <div className="relative max-w-[500px] ">
              <img
                src="/treatment2.avif"
                style={{ backgroundPosition: "bottom" }}
                alt=""
                className=" w-full rounded-md relative border-[10px] border-white "
              />
              <img
                src="/treatment4.webp"
                alt=""
                className=" w-full rounded-md mt-10 md:mt-0 md:absolute md:top-28 border-[10px] border-white left-20"
              />
            </div>

            <div className="md:mt-10 text-lg  tracking-widest ">
              Grazie al nostro trattamento alla cheratina, i capelli di questa
              cliente sono rinati! Da spenti e sfibrati a lisci, setosi e
              visibilmente più sani. La cheratina ha rigenerato e rivitalizzato
              ogni singola ciocca, donando lucentezza e morbidezza durature. Un
              risultato impeccabile che rende i capelli più forti, elastici e
              protetti dagli agenti esterni.
              <div className="text-center">
              <Link to={"/prenotazione"} className="">
                <button className="bg-black hover:bg-black/30  text-white px-10 p-4  border border-white mt-10 text-base ">
                  Prenota un'appuntamento
                </button>
              </Link>
              </div>
              
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
