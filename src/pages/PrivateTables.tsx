import { Table, TableColumnsType, TableProps } from "antd";
import { useEffect, useState } from "react";
import { DataType } from "../types/type";
import Navbar from "../components/Navbar";
import useAuthStore from "../stores/useAuthStore";

export default function PrivateTables() {
  const { supabase } = useAuthStore();
  const [data, setData] = useState<DataType[]>([]);
  const columns: TableColumnsType<DataType> = [
    {
      title: "Nominativo",
      filterSearch: true,
      filters: [
        {
          text: "Nicole",
          value: "Nicole",
        },
        {
          text: "Marika",
          value: "Marika",
        },
      ],
      render: (_, record) => `${record.nome} ${record.cognome}`,
      onFilter: (value, record) => record.nome.includes(value as string),
      width: "20%",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "20%",
    },
    {
      title: "Data e orario",
      render: (_, record) =>
        ` ${record.seleziona_orario}  ${record.seleziona_data} `,
      dataIndex: "data_e_orario",
      filters: [
        {
          text: "Oggi",
          value: "today",
        },
        {
          text: "Questa settimana",
          value: "this_week",
        },
        {
          text: "Nei prossimi 10 giorni",
          value: "next_10_days",
        },
      ],
      onFilter: (value, record) => {
        const recordDateStr = record.seleziona_data;
        const [day, month, year] = recordDateStr.split("-").map(Number);
        const recordDate = new Date(year, month - 1, day);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Imposta l'ora a mezzanotte
        if (value === "today") {
          return recordDate.getTime() === today.getTime();
        } else if (value === "this_week") {
          const firstDayOfWeek = new Date(today);
          firstDayOfWeek.setDate(today.getDate() - today.getDay() + 1); // Lunedì
          const lastDayOfWeek = new Date(firstDayOfWeek);
          lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6); // Domenica
          return recordDate >= firstDayOfWeek && recordDate <= lastDayOfWeek;
        } else if (value === "next_10_days") {
          const tenDaysFromNow = new Date(today);
          tenDaysFromNow.setDate(today.getDate() + 10);

          return recordDate >= today && recordDate <= tenDaysFromNow;
        }
        return false;
      },
      filterSearch: true,
      width: "20%",
    },
    {
      title: "Servizio richiesto",
      dataIndex: "messaggio_aggiuntivo",
    },
  ];

  async function getFromDB() {
    const { data, error } = await supabase.from("appuntamenti").select("*");
    if (error) {
      console.log("Qualcosa è andato storto", error.message);
    } else {
      setData(data);
      console.log("Appuntamenti:", data);
    }
  }

  useEffect(() => {
    getFromDB();
  }, []);

  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <>
      <div className="bg-gray-100 h-screen">
        <Navbar />
        <Table<DataType>
          columns={columns}
          rowKey="id"
          dataSource={data}
          onChange={onChange}
          className="p-10 px-16"
        />
      </div>
    </>
  );
}
