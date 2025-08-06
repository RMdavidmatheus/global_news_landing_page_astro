import {
  Button,
  Form,
  Input,
  Select,
  SelectItem,
  addToast,
  ToastProvider,
  HeroUIProvider,
} from "@heroui/react";
import type { Key } from "@react-types/shared";
import { useEffect, useState } from "react";
import axios from "axios";
import type { FormWebModel } from "../models/formModel";

export function FormComponent() {
  const [name, setName] = useState("");
  const [nameCompany, setNameCompany] = useState("");
  const [email, setEmail] = useState("");
  const [sectorValue, setSectorValue] = useState<Set<Key>>(new Set([]));
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  //* Log the error
  useEffect(() => {
    if (error) console.log(error);
  });

  const sectorTypes = [
    { key: "salud", label: "Salud" },
    { key: "banca", label: "Banca" },
    { key: "gobierno", label: "Gobierno" },
    { key: "energia", label: "Energia" },
    { key: "tecnologia", label: "Tecnologia" },
    { key: "otros", label: "Otros" },
  ];


  const secretUrl = import.meta.env.PUBLIC_API_URL_LOCAL;

  interface BodyFetch {
    name_client: string;
    name_company: string;
    email_client: string;
    sector_client: string;
  }

  //* Replacing the data on db and returning true or false
  const fetchData = async (data: BodyFetch) => {
    try {
      const response = await axios.post(secretUrl, data);
      if (response.status !== 201 && !response.data) {
        return false;
      }
      return true;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget;

    if (form.checkValidity()) {
      setIsLoading(true);
      try {
        const objectData = Object.fromEntries(new FormData(e.currentTarget));
        const bodyFetch: BodyFetch = {
          name_client: objectData.name as string,
          name_company: objectData.nameCompany as string,
          email_client: objectData.email as string,
          sector_client: objectData.sector as string,
        };
        const result = await fetchData(bodyFetch);
        console.log("result", result);
        if (result) {
          addToast({
            title: "Envio exitoso",
            description: "Se ha enviado tu solicitud correctamente",
            color: "success",
          });
          setError(null);
        } else {
          addToast({
            title: "Error",
            description:
              "No se pudo enviar tu solicitud, por favor intenta nuevamente",
            color: "danger",
          });
        }
        form.reset();
        setName("");
        setNameCompany("");
        setEmail("");
        setSectorValue(new Set([]));
      } catch (error) {
        console.error("Error fetching data: ", error);
        addToast({
          title: "Error",
          description:
            "No se pudo enviar tu solicitud, por favor intenta nuevamente",
          color: "danger",
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      form.reportValidity();
    }
  };

  return (
    <div className="flex flex-col gap-3 p-6 max-w-4xl mx-auto" id="contact">
      <h1 className="text-blue-900 font-bold text-3xl text-center">
        Solicita tu informe gratuito
      </h1>
      <p>
        Te enviaremos un reporte de ejemplo con tendencias específicas de tu
        sector.
      </p>
      <div className="flex flex-col pt-5">
        <Form
          className="w-full max-w-xs gap-3"
          onSubmit={handleSubmit}
          validationBehavior="native"
        >
          <Input
            aria-label="Ingresa tu nombre"
            isRequired
            errorMessage="Por favor, ingresa un nombre"
            name="name"
            variant="bordered"
            value={name}
            onChange={(e) => setName(e.target.value)}
            color="primary"
            className="w-[550px]"
            placeholder="Ingresa tu nombre"
            type="text"
          />
          <Input
            aria-label="Ingresa el nombre de tu empresa"
            isRequired
            errorMessage="Por favor, ingresa un nombre de empresa"
            name="nameCompany"
            variant="bordered"
            value={nameCompany}
            onChange={(e) => setNameCompany(e.target.value)}
            color="primary"
            className="w-[550px]"
            placeholder="Ingresa el nombre de tu empresa"
            type="text"
          />
          <Input
            aria-label="Ingresa tu correo electrónico"
            isRequired
            errorMessage="Por favor, ingresa un correo electrónico"
            name="email"
            variant="bordered"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            color="primary"
            className="w-[550px]"
            placeholder="Ingresa tu correo electrónico"
            type="email"
          />

          <Select
            aria-label="Selecciona tu sector"
            isRequired
            errorMessage="Por favor, selecciona un sector"
            className="w-[550px]"
            selectedKeys={sectorValue}
            name="sector"
            variant="bordered"
            color="primary"
            placeholder="Selecciona tu sector"
            disallowEmptySelection
            selectionMode="single"
            onSelectionChange={(keys) =>
              setSectorValue(new Set(keys as Iterable<Key>))
            }
          >
            {sectorTypes.map((sector) => (
              <SelectItem key={sector.key}>{sector.label}</SelectItem>
            ))}
          </Select>

          <Button
            type="submit"
            variant="flat"
            color="primary"
            className="w-[550px]"
            isLoading={isLoading}
          >
            Enviar
          </Button>
        </Form>
      </div>
      <ToastProvider placement="top-right" client:visible />
    </div>
  );
}
