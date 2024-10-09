import { Link } from "react-router-dom";
import { useState } from "react";
import useAuthStore from "../stores/useAuthStore";

export default function Navbar() {
  const [isAuthenticated] = useState<null | boolean>(null);
  const navigation = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "I nostri servizi",
      link: "/services",
    },
    {
      name: "Prenota online",
      link: "/prenotazione",
    },
  ];
  const { initialized } = useAuthStore();


  if (initialized) {
    navigation.push({
      name: "Appuntamenti",
      link: "/appointments",
    });
  }

  if (isAuthenticated) {
    navigation.push({
      name: "Lista degli appuntamenti",
      link: "/appointments",
    });
  }

  return (
    <>
      <section>
        <ul className="flex justify-center gap-2 lg:gap-5 p-2  text-black bg-white">
          {navigation.map((item, index) => (
            <Link to={item.link} key={index}>
              <li>{item.name}</li>
            </Link>
          ))}
        </ul>
      </section>
    </>
  );
}
