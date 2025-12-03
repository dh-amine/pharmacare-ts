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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import * as XLSX from "xlsx";

// ---------------------------------------
// FORMAT DATE (DD/MM/YYYY)
// ---------------------------------------
function formatDate(value: any) {
  if (!value) return "—";

  const date = value instanceof Date ? value : new Date(value);

  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

// ---------------------------------------
// TYPES
// ---------------------------------------
interface Doctor {
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
  productRequested: string;
  op: string;
  dateObtained: Date;
}

// ---------------------------------------
// MAIN COMPONENT
// ---------------------------------------
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
    productRequested: "",
    op: "",
    dateObtained: "",
  });

  function handleAddDoctor() {
    const doctor: Doctor = {
      ...newDoctor,
      id: crypto.randomUUID(),
      demandeDate: new Date(newDoctor.demandeDate),
      dateObtained: newDoctor.dateObtained ? new Date(newDoctor.dateObtained) : null,
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
      productRequested: "",
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

  // ---------------------------------------
  // FILTER
  // ---------------------------------------
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
    { key: "demendeNum", label: "N° de Date" },
    { key: "prospect", label: "Prospect" },
    { key: "action", label: "Action" },
    { key: "manifestation", label: "Manifestation" },
    { key: "agence", label: "Agence" },
    { key: "factureNum", label: "N° de Facture" },
    { key: "cheqRm", label: "Chèque/Reemborsement" },
    { key: "productRequested", label: "Produit demandé" },
    { key: "op", label: "OP" },
    { key: "dateObtained", label: "Date d'obtention" },
  ];

  // ---------------------------------------
  // EXPORT EXCEL
  // ---------------------------------------
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
      "N° de Date": d.demendeNum,
      Prospect: d.prospect,
      Action: d.action,
      Manifestation: d.manifestation,
      Agence: d.agence,
      "N° Facture": d.factureNum,
      "Chèque/Remborsement": d.cheqRm,
      "Produit demandé": d.productRequested,
      OP: d.op,
      "Date d'obtention": formatDate(d.dateObtained),
    }));

    const ws = XLSX.utils.json_to_sheet(sanitized);
    const wb = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, "Actions");

    XLSX.writeFile(wb, `actions_${new Date().toISOString().slice(0, 10)}.xlsx`);
  }

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
          placeholder="Rechercher par N° de Date…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Button onClick={() => setAddModalOpen(true)}>Ajouter</Button>

        <Button variant="secondary" onClick={() => setProductModalOpen(true)}>
          Ajouter un Produit
        </Button>

        <Button onClick={handleExportExcel}>Exporter Excel</Button>
      </div>

      {/* TABLE */}
      <div className="rounded-lg border border-gray-700 bg-gray-800">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-700/50">
              {columns.map((c) => (
                <TableHead key={c.key}>{c.label}</TableHead>
              ))}
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
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
        </Table>
      </div>

      {/* ADD MODAL */}
      <Dialog open={addModalOpen} onOpenChange={setAddModalOpen}>
        <DialogContent className="bg-gray-800 text-gray-100 border-gray-600">
          <DialogHeader>
            <DialogTitle>Ajouter une Action</DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            {Object.keys(newDoctor).map((key) =>
              key !== "id" ? (
                <Input
                  key={key}
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

      {/* PRODUCT MODAL */}
      <Dialog open={productModalOpen} onOpenChange={setProductModalOpen}>
        <DialogContent className="bg-gray-800 text-gray-100 border-gray-600">
          <DialogHeader>
            <DialogTitle>Ajouter un Produit</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <select
              className="w-full bg-gray-700 text-gray-100 p-2 border border-gray-600 rounded"
              value={selectedDoctorId}
              onChange={(e) => setSelectedDoctorId(e.target.value)}
            >
              <option value="">Sélectionner…</option>
              {doctors.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.nomDelg} – {d.demendeNum}
                </option>
              ))}
            </select>

            <Input
              placeholder="Nom produit"
              className="bg-gray-700 text-gray-100 border-gray-600"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />

            <Input
              type="date"
              className="bg-gray-700 text-gray-100 border-gray-600"
              value={dateObtained}
              onChange={(e) => setDateObtained(e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button onClick={handleSaveProduct}>Enregistrer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MedsPage;
