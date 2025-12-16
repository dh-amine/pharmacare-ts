import axios from "axios";
import type { Doctor } from "../types/doctor";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchDoctors = async (): Promise<Doctor[]> => {
  const res = await api.get<Doctor[]>("/Actions/actions");
   return res.data.map((d: any) => ({
    ...d,
    dateDemande: new Date(d.dateDemande),
    dateObtention: new Date(d.dateObtention),
    numDemande: String(d.numDemande),
    products: d.products?.map((p: any) => ({ ...p, qte: Number(p.qte) })) || [],
  }));
};

export const saveDoctor = async (doctor: Doctor): Promise<Doctor> => {
  const res = await axios.post("http://localhost:8080/api/Actions/save", doctor, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};

export const fetchDoctorById = async (id: string | number): Promise<Doctor> => {
  const res = await axios.get(`http://localhost:8080/api/Actions/${id}`);
  return res.data;
};

export default api;
