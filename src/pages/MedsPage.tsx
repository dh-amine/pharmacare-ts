<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { saveDoctor } from "@/api/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
=======
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import {
>>>>>>> 8dc3442b810c99095f86a3e99d00fffe5a086bab
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

<<<<<<< HEAD
import { ArrowLeft } from "lucide-react";
import * as XLSX from "xlsx";

import { fetchDoctors } from "@/api/axios";
import type { Doctor } from "../types/doctor";
=======
import { ArrowLeft, InfoIcon } from "lucide-react";
import { useNavigate } from "react-router";
import * as XLSX from "xlsx";
import { Doctor } from "@/api/doctor";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
>>>>>>> 8dc3442b810c99095f86a3e99d00fffe5a086bab

// ---------------------------------------
// FORMAT DATE (DD/MM/YYYY)
// ---------------------------------------
<<<<<<< HEAD
const formatDate = (value?: string | Date) => {
  if (!value) return "—";

  const date = typeof value === "string" ? new Date(value) : value;
  if (isNaN(date.getTime())) return "—";
=======
function formatDate(value: any) {
  if (!value) return "—";

  const date = value instanceof Date ? value : new Date(value);
>>>>>>> 8dc3442b810c99095f86a3e99d00fffe5a086bab

  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
<<<<<<< HEAD
};
=======
}

// ---------------------------------------
// TYPES
// ---------------------------------------
interface DoctorI {
  id: string;
  zone: string;
  nomDelg: string;
  gamme: string;
  demandeDate: Date;
  demendeNum: number;
  prospect: string;
  action: string;
  manifestation: string;
  agence: string;
  factureNum: string;
  cheqRm: string;
  op: string;
  dateObtained: Date;
}
>>>>>>> 8dc3442b810c99095f86a3e99d00fffe5a086bab

// ---------------------------------------
// MAIN COMPONENT
// ---------------------------------------
<<<<<<< HEAD
const MedsPage: React.FC = () => {
  const navigate = useNavigate();

  const [actions, setActions] = useState<Doctor[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Modal open state
  const [addModalOpen, setAddModalOpen] = useState(false);

  // New doctor state
  const [newDoctor, setNewDoctor] = useState<Doctor>({
    id: "",
    zone: "",
    delegueName: "",
    gamme: "",
    numDemande: "0",
    dateDemande: new Date(),
    nameMedecin: "",       // new
    action: "",
    manifestation: "",
    agence: "",
    numfacture: "",
    dateObtention: new Date(),
    cheque: "",
    op: "",
  });


  const handleAddDoctor = async () => {
    try {
      const doctorToSave: Doctor = {
        ...newDoctor,
        id: crypto.randomUUID(), // optional if backend generates ID
      };

      const savedDoctor = await saveDoctor(doctorToSave);

      // update local state
      setActions([...actions, savedDoctor]);

      setAddModalOpen(false);
      // reset form
      setNewDoctor({
        id: "",
        zone: "",
        delegueName: "",
        gamme: "",
        numDemande: "0",
        dateDemande: new Date(),
        nameMedecin: "",
        action: "",
        manifestation: "",
        agence: "",
        numfacture: "",
        cheque: "",
        op: "",
        dateObtention: new Date(),
      });
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'enregistrement de l'action !");
    }
  };


  // ---------------------------------------
  // FETCH DATA
  // ---------------------------------------
  useEffect(() => {
    const loadActions = async () => {
      try {
        const data = await fetchDoctors();
        setActions(data);
        console.log(data);
      } catch (err) {
        console.error(err);
        setError("Erreur lors du chargement des actions");
      } finally {
        setLoading(false);
      }
    };

    loadActions();
  }, []);
=======
const MedsPage = () => {
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [search, setSearch] = useState("");

  // MODALS
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [productModalOpen, setProductModalOpen] = useState(false);

  const [currentDoctor, setCurrentDoctor] = useState<Doctor | null>(null);

  // ADD DOCTOR
  const [newDoctor, setNewDoctor] = useState<any>({
    id: "",
    zone: "",
    nomDelg: "",
    gamme: "",
    demandeDate: "",
    demendeNum: 0,
    prospect: "",
    action: "",
    manifestation: "",
    agence: "",
    factureNum: "",
    cheqRm: "",
    op: "",
    dateObtained: "",
  });

  function handleAddDoctor() {
    const doctor: Doctor = {
      ...newDoctor,
      id: crypto.randomUUID(),
      demandeDate: new Date(),
   //   dateObtained: newDoctor.dateObtained ? new Date(newDoctor.dateObtained) : null,
      dateObtained:new Date(),
    };

    setDoctors([...doctors, doctor]);
    setAddModalOpen(false);

    setNewDoctor({
      id: "",
      zone: "",
      nomDelg: "",
      gamme: "",
      demandeDate: "",
      demendeNum: 0,
      prospect: "",
      action: "",
      manifestation: "",
      agence: "",
      factureNum: "",
      cheqRm: "",
      op: "",
      dateObtained: "",
    });
  }

  // EDIT DOCTOR
  const [editData, setEditData] = useState<Doctor | null>(null);

  useEffect(() => {
    if (currentDoctor) setEditData(currentDoctor);
  }, [currentDoctor]);

  function handleSaveEdit() {
    if (!editData) return;

    setDoctors(doctors.map((d) => (d.id === editData.id ? editData : d)));
    setEditModalOpen(false);
  }

  // PRODUCT
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [productName, setProductName] = useState("");
  const [dateObtained, setDateObtained] = useState("");

  function handleSaveProduct() {
    setDoctors(
      doctors.map((d) =>
        d.id === selectedDoctorId
          ? {
              ...d,
              productRequested: productName,
              dateObtained: new Date(dateObtained), // FIX TYPE
            }
          : d
      )
    );

    setProductModalOpen(false);
  }
>>>>>>> 8dc3442b810c99095f86a3e99d00fffe5a086bab

  // ---------------------------------------
  // FILTER
  // ---------------------------------------
<<<<<<< HEAD
  // ---------------------------------------
  // FILTER
  // ---------------------------------------
  const filteredActions = actions.filter(
    (a) =>
      a.numDemande !== undefined &&
      a.numDemande !== null &&
      a.numDemande.toString().includes(search)
  );
  // ---------------------------------------
  // TABLE COLUMNS
  // ---------------------------------------
  const columns: { key: keyof Doctor; label: string }[] = [
    { key: "zone", label: "Zone" },
    { key: "delegueName", label: "Nom Délégué" },
    { key: "gamme", label: "Gamme" },
    { key: "dateDemande", label: "Date de Demande" },
    { key: "numDemande", label: "N° de Demande" },
    { key: "action", label: "Action" },
    { key: "manifestation", label: "Manifestation" },
    { key: "agence", label: "Agence" },
    { key: "numfacture", label: "N° de Facture" },
    { key: "cheque", label: "Chèque/Remboursement" },
    { key: "op", label: "OP" },
    { key: "dateObtention", label: "Date d'obtention" },
=======
  const filteredDoctors = doctors.filter((d) =>
    d.demendeNum.toString().includes(search)
  );

  // ---------------------------------------
  // TABLE COLUMNS
  // ---------------------------------------
  const columns = [
    { key: "zone", label: "Zone" },
    { key: "nomDelg", label: "Nom Délégué" },
    { key: "gamme", label: "Gamme" },
    { key: "demandeDate", label: "Date de Demande" },
    { key: "demendeNum", label: "N° de Demande" },
    { key: "prospect", label: "Prospect" },
    { key: "action", label: "Action" },
    { key: "manifestation", label: "Manifestation" },
    { key: "agence", label: "Agence" },
    { key: "factureNum", label: "N° de Facture" },
    { key: "cheqRm", label: "Chèque/Remborsement" },
    { key: "op", label: "OP" },
    { key: "dateObtained", label: "Date d'obtention" },
>>>>>>> 8dc3442b810c99095f86a3e99d00fffe5a086bab
  ];

  // ---------------------------------------
  // EXPORT EXCEL
  // ---------------------------------------
<<<<<<< HEAD
  const handleExportExcel = () => {
    if (actions.length === 0) return;

    const sanitized = actions.map((a) => ({
      Zone: a.zone,
      "Nom Délégué": a.delegueName,
      Gamme: a.gamme,
      "Date Demande": formatDate(a.dateDemande),
      "N° de Demande": a.numDemande,
      Action: a.action,
      Manifestation: a.manifestation,
      Agence: a.agence,
      "N° Facture": a.numfacture,
      "Chèque/Remboursement": a.cheque,
      OP: a.op,
      "Date d'obtention": formatDate(a.dateObtention),
=======
  function handleExportExcel() {
    if (doctors.length === 0) {
      alert("Aucun médecin à exporter.");
      return;
    }

    const sanitized = doctors.map((d) => ({
      Zone: d.zone,
      "Nom Délégué": d.nomDelg,
      Gamme: d.gamme,
      "Date Demande": formatDate(d.demandeDate),
      "N° de Demande": d.demendeNum,
      Prospect: d.prospect,
      Action: d.action,
      Manifestation: d.manifestation,
      Agence: d.agence,
      "N° Facture": d.factureNum,
      "Chèque/Remborsement": d.cheqRm,
      OP: d.op,
      "Date d'obtention": formatDate(d.dateObtained),
>>>>>>> 8dc3442b810c99095f86a3e99d00fffe5a086bab
    }));

    const ws = XLSX.utils.json_to_sheet(sanitized);
    const wb = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, "Actions");
<<<<<<< HEAD
    XLSX.writeFile(
      wb,
      `actions_${new Date().toISOString().slice(0, 10)}.xlsx`
    );
  };
=======

    XLSX.writeFile(wb, `actions_${new Date().toISOString().slice(0, 10)}.xlsx`);
  }
>>>>>>> 8dc3442b810c99095f86a3e99d00fffe5a086bab

  // ---------------------------------------
  // RENDER
  // ---------------------------------------
  return (
    <div className="p-10 min-h-screen bg-gray-900 text-gray-100">
      {/* HEADER */}
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="ghost"
          className="text-gray-300 hover:text-white hover:bg-gray-800"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Retour
        </Button>

        <h1 className="text-4xl font-bold">Gestion des Actions</h1>
      </div>

      {/* CONTROLS */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <Input
          className="max-w-xs bg-gray-800 text-gray-100 border-gray-700"
          placeholder="Rechercher par N° de Demande…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
<<<<<<< HEAD
        <Button className="bg-blue-600 text-white" onClick={() => setAddModalOpen(true)}>
          Ajouter
        </Button>

        <Button
          onClick={handleExportExcel}
          className="bg-blue-600 text-white"
        >
          Exporter Excel
        </Button>
      </div>

      {/* STATES */}
      {loading && <p className="text-gray-400">Chargement...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* TABLE */}
      {!loading && !error && (
        <div className="rounded-lg border border-gray-700 bg-gray-800">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-700/50">
                {columns.map((c) => (
                  <TableHead key={c.key} className="text-white">
                    {c.label}
                  </TableHead>
                ))}
                <TableHead className="text-white">
                  Plus d'info
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredActions.map((action) => (
                <TableRow key={action.id}>
                  {columns.map((c) => (
                    <TableCell key={c.key}>
                      {c.key === "dateDemande" || c.key === "dateObtention" ? formatDate(action[c.key]) : action[c.key] || "—"}
                    </TableCell>
                  ))}

                  <TableCell>
                    <Button
                      onClick={() =>
                        navigate(`/medecines/${action.id}`, {
                          state: { action },
                        })
                      }
                    >
                      Plus d'info
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {addModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
              <div className="bg-gray-800 text-gray-100 p-6 rounded-lg w-full max-w-lg overflow-y-auto max-h-[90vh]">
                <h2 className="text-xl font-bold mb-4">Ajouter une Action</h2>

                <div className="space-y-3">
                  <Input
                    placeholder="Zone"
                    value={newDoctor.zone}
                    onChange={(e) => setNewDoctor({ ...newDoctor, zone: e.target.value })}
                  />
                  <Input
                    placeholder="Nom Délégué"
                    value={newDoctor.delegueName}
                    onChange={(e) => setNewDoctor({ ...newDoctor, delegueName: e.target.value })}
                  />
                  <Input
                    placeholder="Gamme"
                    value={newDoctor.gamme}
                    onChange={(e) => setNewDoctor({ ...newDoctor, gamme: e.target.value })}
                  />
                  <Input
                    placeholder="N° de Demande"
                    type="text"
                    value={newDoctor.numDemande}
                    onChange={(e) => setNewDoctor({ ...newDoctor, numDemande: e.target.value })}
                  />
                  <Input
                    placeholder="Date de Demande"
                    type="date"
                    value={newDoctor.dateDemande.toISOString().split("T")[0]}
                    onChange={(e) => setNewDoctor({ ...newDoctor, dateDemande: new Date(e.target.value) })}
                  />
                  <Input
                    placeholder="Nom Médecin"
                    value={newDoctor.nameMedecin}
                    onChange={(e) => setNewDoctor({ ...newDoctor, nameMedecin: e.target.value })}
                  />
                  <Input
                    placeholder="Action"
                    value={newDoctor.action}
                    onChange={(e) => setNewDoctor({ ...newDoctor, action: e.target.value })}
                  />
                  <Input
                    placeholder="Manifestation"
                    value={newDoctor.manifestation}
                    onChange={(e) => setNewDoctor({ ...newDoctor, manifestation: e.target.value })}
                  />
                  <Input
                    placeholder="Agence"
                    value={newDoctor.agence}
                    onChange={(e) => setNewDoctor({ ...newDoctor, agence: e.target.value })}
                  />
                  <Input
                    placeholder="N° Facture"
                    value={newDoctor.numfacture}
                    onChange={(e) => setNewDoctor({ ...newDoctor, numfacture: e.target.value })}
                  />
                  <Input
                    placeholder="Date d'Obtention"
                    type="date"
                    value={newDoctor.dateObtention.toISOString().split("T")[0]}
                    onChange={(e) => setNewDoctor({ ...newDoctor, dateObtention: new Date(e.target.value) })}
                  />
                  <Input
                    placeholder="Chèque/Remboursement"
                    value={newDoctor.cheque}
                    onChange={(e) => setNewDoctor({ ...newDoctor, cheque: e.target.value })}
                  />
                  <Input
                    placeholder="OP"
                    value={newDoctor.op}
                    onChange={(e) => setNewDoctor({ ...newDoctor, op: e.target.value })}
                  />
                </div>
                <div className="flex justify-end gap-3 mt-4">
                  <Button onClick={() => setAddModalOpen(false)} variant="secondary">
                    Annuler
                  </Button>
                  <Button onClick={handleAddDoctor} className="bg-blue-600 text-white">
                    Ajouter
                  </Button>
                </div>
              </div>
            </div>
          )}

        </div>
      )}

=======

        <Button onClick={() => setAddModalOpen(true)}className="bg-blue-600 text-white">Ajouter</Button>

        

        <Button onClick={handleExportExcel}className="bg-blue-600 text-white">Exporter Excel</Button>
      </div>

      {/* TABLE */}
      <div className="rounded-lg border border-gray-700 bg-gray-800">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-700/50">
              {columns.map((c) => (
                <TableHead key={c.key}
                className="text-white"
                >{c.label}</TableHead>
              ))}
              <TableHead
              className="text-white"
              >
                Plus d'info 
              </TableHead>
            </TableRow>
          </TableHeader>

         {/*  <TableBody>
            {filteredDoctors.map((doctor) => (
              <TableRow key={doctor.id}>
                {columns.map((c) => (
                  <TableCell key={c.key}>
                    {c.key === "demandeDate" || c.key === "dateObtained"
                      ? formatDate((doctor as any)[c.key])
                      : (doctor as any)[c.key] || "—"}
                  </TableCell>
                ))}

                <TableCell className="flex gap-3">
                  <Button
                    onClick={() =>
                      navigate(`/medecines/${doctor.id}`, { state: { doctor } })
                     }
                 >
                    Plus d'info
                  </Button>

                  <Button
                    size="sm"
                    onClick={() => {
                      setCurrentDoctor(doctor);
                      setEditModalOpen(true);
                    }}
                  >
                    Modifier
                  </Button>

                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => {
                      setSelectedDoctorId(doctor.id);
                      setProductModalOpen(true);
                    }}
                  >
                    Produits
                  </Button> 
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
 */}

           <TableBody>
            {Doctor.generateDummy().map((doctor) => (
              <TableRow key={doctor.id}>
                {columns.map((c) => (
                  <TableCell key={c.key}>
                    {c.key === "demandeDate" || c.key === "dateObtained"
                      ? formatDate((doctor as any)[c.key])
                      : (doctor as any)[c.key] || "—"}
                  </TableCell>
                ))}

                <TableCell className="flex gap-3">
                  <Button
                    onClick={() =>
                      navigate(`/medecines/${doctor.id}`)
                     }
                 >
                    Plus d'info
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
 
        </Table>
      </div>



      {/* ADD MODAL */}
      <Dialog open={addModalOpen} onOpenChange={setAddModalOpen}>
        <DialogContent className="bg-gray-800 text-gray-100 border-gray-600 max-h-4/5 overflow-scroll ">
          <DialogHeader>
            <DialogTitle>Ajouter une Action</DialogTitle>
          </DialogHeader>

          <div className="space-y-3">

          
            <Input
                  key={"zone"}
                  type={"text"}
                  placeholder={"Zone"}
                  className="bg-gray-700 text-gray-100 border-gray-600"
                  value={newDoctor["zone"]}
                  onChange={(e) =>
                    setNewDoctor({ ...newDoctor, ["zone"]: e.target.value })
                  }
                />
            {Object.keys(newDoctor).map((key) =>
              key !== "id" ? (
                <Input
                  key={key}
                  type={key=="demandeDate"?"date":"text"}
                  placeholder={key}
                  className="bg-gray-700 text-gray-100 border-gray-600"
                  value={newDoctor[key]}
                  onChange={(e) =>
                    setNewDoctor({ ...newDoctor, [key]: e.target.value })
                  }
                />
              ) : null
            )}
          </div>

          <DialogFooter>
            <Button onClick={handleAddDoctor}>Ajouter</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* EDIT MODAL */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="bg-gray-800 text-gray-100 border-gray-600">
          <DialogHeader>
            <DialogTitle>Modifier</DialogTitle>
          </DialogHeader>

          {editData && (
            <div className="space-y-3">
              {Object.keys(editData).map((key) =>
                key !== "id" ? (
                  <Input
                    key={key}
                    value={(editData as any)[key]}
                    className="bg-gray-700 text-gray-100 border-gray-600"
                    onChange={(e) =>
                      setEditData({ ...editData, [key]: e.target.value })
                    }
                  />
                ) : null
              )}
            </div>
          )}

          <DialogFooter>
            <Button onClick={handleSaveEdit}>Enregistrer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      
      
>>>>>>> 8dc3442b810c99095f86a3e99d00fffe5a086bab
    </div>
  );
};

export default MedsPage;
