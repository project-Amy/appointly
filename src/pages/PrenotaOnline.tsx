import { Button, DatePicker, DatePickerProps, Form, Input, Select } from "antd";
import Navbar from "../components/Navbar";
import { useState } from "react";
import dayjs from "dayjs";
import TextArea from "antd/es/input/TextArea";
import { formValue } from "../types/type";
import ModalConfirm from "../components/ModalConfirm";
import { orari } from "../data/constants";
import useAuthStore from "../stores/useAuthStore";

export default function Contact() {
  const [orariDisponibili, setOrariDisponibili] = useState(orari);
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { supabase } = useAuthStore();

  async function sendForm(form: formValue) {
    setIsLoading(false);
    const formattedFormData: formValue = {
      ...form,
      seleziona_data: dayjs.isDayjs(form.seleziona_data)
        ? form.seleziona_data.format("DD-MM-YYYY")
        : form.seleziona_data,
      seleziona_orario:
        orari.find((orario) => orario.value === form.seleziona_orario)?.label ??
        "",
    };
    console.log(formattedFormData);
    setTimeout(() => {
      setIsLoading(true);
      setIsModalOpen(true);
    }, 2000);
    pushToDB(formattedFormData);
  }

  async function pushToDB(form: formValue) {
    const { data, error } = await supabase
      .from("appuntamenti")
      .insert([form])
      .select("*");
    if (error) {
      console.log("Qualcosa è andato storto", error.message);
    } else {
      console.log("Appuntamento inserito", data);
      getFromDB();
    }
  }

  async function getFromDB() {
    const { data, error } = await supabase.from("appuntamenti").select("*");
    if (error) {
      console.log("Qualcosa è andato storto", error.message);
    } else {
      console.log("Appuntamenti:", data);
    }
  }

  async function searchByDate(date: string) {
    const { data, error } = await supabase
      .from("appuntamenti")
      .select("*")
      .eq("seleziona_data", date);
    if (error) {
      console.log("Qualcosa è andato storto", error.message);
    } else {
      console.log("Appuntamenti:", data); // TODO: generare gli orari disponibili
      const orariDisponibili = orari.map((orario) => ({
        ...orario,
        disabled: data.some(
          (appuntamento) => appuntamento.seleziona_orario === orario.label
        ),
      }));
      // console.log(orariDisponibili);
      setOrariDisponibili(orariDisponibili);
    }
  }

  const handleChangeData: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(dateString);
    if (dateString) {
      searchByDate(dateString as string);
    }
  };

  return (
    <>
      <div className="md:h-screen md:overflow-y-hidden bg-gray-100">
        <ModalConfirm
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
        <Navbar />

        <div className="text-center text-2xl md:text-5xl py-4 font-serif tracking-wider">
          PRENOTA ONLINE
        </div>
        <section className="block md:flex justify-center gap-5">
          <Form
            form={form}
            onFinish={sendForm}
            onFinishFailed={(error) => console.log(error)}
            layout="vertical"
            autoComplete="off"
            className=" w-[90%] m-auto md:m-0 md:w-[400px] p-6 bg-white shadow-lg rounded-md flex flex-col flex-nowrap"
          >
            <Form.Item
              name="nome"
              label="Nome"
              rules={[{ required: true, message: "Seleziona un orario" }]}
              hasFeedback
            >
              <Input className="w-full" placeholder="Nome" />
            </Form.Item>

            <Form.Item
              name="cognome"
              label="Cognome"
              rules={[{ required: true, message: "Seleziona un orario" }]}
              hasFeedback
            >
              <Input placeholder="Cognome" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: "Seleziona un orario" }]}
              hasFeedback
            >
              <Input className="w-full" placeholder="Nome" />
            </Form.Item>

            <Form.Item
              name="seleziona_data"
              label="Seleziona data"
              rules={[{ required: true, message: "Seleziona un orario" }]}
              hasFeedback
            >
              <DatePicker
                format="DD-MM-YYYY"
                onChange={handleChangeData}
                className="w-full"
                placeholder="Seleziona una data"
              />
            </Form.Item>

            <Form.Item
              name="seleziona_orario"
              label="Seleziona orario"
              className="w-full"
              rules={[{ required: true, message: "Seleziona un orario" }]}
              hasFeedback
            >
              <Select
                showSearch
                placeholder="Seleziona un orario"
                options={orariDisponibili}
              />
            </Form.Item>

            <Form.Item
              name="messaggio_aggiuntivo"
              label="Descrivi il servizio"
              rules={[{ required: true, message: "Seleziona un orario" }]}
              hasFeedback
            >
              <TextArea
                placeholder="Taglio capelli, colore, piega.."
                autoSize={{ minRows: 3, maxRows: 3 }}
              />
            </Form.Item>
            {isLoading === false ? (
              <Button onClick={() => form.submit()}>Invia</Button>
            ) : (
              <Button disabled>Invia</Button>
            )}
          </Form>

          {/* funziona -> */}
          {/* <div className="grid w-[90%] md:w-auto m-auto mt-10 md:m-0 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pb-10 md:pb-0">
            <div className="col-span-1 lg:col-span-2  w-full md:col-span-2 picture-contact2 rounded-md shadow-lg"></div>
            <div className="col-span-1 row-span-1  lg:col-span-1 h-full picture-contact1 w-full md:w-56 rounded-md shadow-lg"></div>
            <div className="col-span-1 lg:col-span-1 md:row-span-2 h-full picture-contact3 w-full md:w-56 rounded-md shadow-lg"></div>
            <div className="col-span-1 lg:col-span-2  lg:row-span-2 w-full picture-contact4 rounded-md shadow-lg"></div>
          </div> */}

          <div className="w-[90%] md:w-auto m-auto mt-10 md:m-0 grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pb-10 md:pb-0">
            <div className="col-span-1 aspect-square md:aspect-auto  lg:col-span-2  w-full h-[200px] sm:h-auto md:col-span-2 picture-contact2 rounded-md shadow-lg"></div>
            <div className="col-span-1 aspect-square  md:aspect-auto row-span-1 h-[200px] lg:col-span-1  sm:h-auto picture-contact1 w-full md:w-56 rounded-md shadow-lg"></div>
            <div className="col-span-1 aspect-square  md:aspect-auto lg:col-span-1 h-[200px] sm:h-auto md:row-span-2  picture-contact3 w-full md:w-56 rounded-md shadow-lg"></div>
            <div className="col-span-1 aspect-square  md:aspect-auto lg:col-span-2 h-[200px]  sm:h-auto lg:row-span-2 w-full picture-contact4 rounded-md shadow-lg"></div>
          </div>
        </section>
      </div>
    </>
  );
}
