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

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────
interface Doctor {
  id: string;
  nom: string;
  factureNum: string;
  address: string;
  productRequested?: string;
  dateObtained?: string;
}

// ─────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────

const MedsPage = () => {
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [search, setSearch] = useState("");

  // Modals
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [productModalOpen, setProductModalOpen] = useState(false);

  const [currentDoctor, setCurrentDoctor] = useState<Doctor | null>(null);

  // ─────────────────────────────────────────────
  // ADD DOCTOR
  // ─────────────────────────────────────────────

  const [newDoctor, setNewDoctor] = useState({
    nom: "",
    factureNum: "",
    address: "",
    numTlfn:"",
  });

  function handleAddDoctor() {
    const doctor: Doctor = {
      id: crypto.randomUUID(),
      nom: newDoctor.nom,
      factureNum: newDoctor.factureNum,
      address: newDoctor.address,
    };

    setDoctors([...doctors, doctor]);
    setAddModalOpen(false);
    setNewDoctor({ nom: "", factureNum: "", address: "",numTlfn:"" });
  }

  // ─────────────────────────────────────────────
  // EDIT DOCTOR
  // ─────────────────────────────────────────────

  const [editData, setEditData] = useState<Doctor | null>(null);

  useEffect(() => {
    if (currentDoctor) setEditData(currentDoctor);
  }, [currentDoctor]);

  function handleSaveEdit() {
    if (!editData) return;
    setDoctors(doctors.map((d) => (d.id === editData.id ? editData : d)));
    setEditModalOpen(false);
  }

  // ─────────────────────────────────────────────
  // ADD / EDIT PRODUCT
  // ─────────────────────────────────────────────

  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [productName, setProductName] = useState("");
  const [dateObtained, setDateObtained] = useState("");

  function handleSaveProduct() {
    setDoctors(
      doctors.map((d) =>
        d.id === selectedDoctorId
          ? { ...d, productRequested: productName, dateObtained }
          : d
      )
    );
    setProductModalOpen(false);
  }

  // ─────────────────────────────────────────────
  // FILTER TABLE
  // ─────────────────────────────────────────────
  const filteredDoctors = doctors.filter((d) =>
    d.nom.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { key: "nom", label: "Nom" },
    { key: "factureNum", label: "N° Facture" },
    { key: "address", label: "Adresse" },
    { key: "productRequested", label: "Produit demandé" },
    { key: "dateObtained", label: "Date d'obtention" },
  ];

  return (
    <div className="p-10 min-h-screen bg-gray-900 text-gray-100">
     
      <>
    {/* Header with Back Button */}
    <div className="flex items-center gap-4 mb-8">
      <Button
        variant="ghost"
        className="text-gray-300 hover:text-white hover:bg-gray-800"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-5 w-5" />
        Retour
      </Button>

      <h1 className="text-4xl font-bold text-gray-100">
        Gestion des Médecins
      </h1>
    </div>

    {/* Controls */}
    <div className="flex flex-wrap items-center gap-4 mb-6">
      <Input
        className="max-w-xs bg-gray-800 text-gray-100 border-gray-700"
        placeholder="Rechercher un médecin..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Button onClick={() => setAddModalOpen(true)}>Ajouter un Médecin</Button>

      <Button variant="secondary" onClick={() => setProductModalOpen(true)}>
        Ajouter un Produit
      </Button>
    </div>
  </>
      {/* Table */}
      <div className="rounded-lg border border-gray-700 bg-gray-800">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-700/50">
              {columns.map((c) => (
                <TableHead
                  key={c.key}
                  className="text-gray-200 font-semibold"
                >
                  {c.label}
                </TableHead>
              ))}
              <TableHead className="text-gray-200">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredDoctors.map((doctor) => (
              <TableRow
                key={doctor.id}
                className="hover:bg-gray-700 transition"
              >
                {columns.map((c) => (
                  <TableCell key={c.key} className="text-gray-300">
                    {(doctor as any)[c.key] || "—"}
                  </TableCell>
                ))}

                <TableCell className="flex gap-3 py-4">
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

      {/* ───────────────────────────────────────────── */}
      {/* ADD DOCTOR MODAL */}
      {/* ───────────────────────────────────────────── */}

      <Dialog open={addModalOpen} onOpenChange={setAddModalOpen}>
        <DialogContent className="bg-gray-800 text-gray-100 border-gray-600">
          <DialogHeader>
            <DialogTitle>Ajouter un Médecin</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <Input
              placeholder="Nom"
              className="bg-gray-700 text-gray-100 border-gray-600"
              value={newDoctor.nom}
              onChange={(e) =>
                setNewDoctor({ ...newDoctor, nom: e.target.value })
              }
            />

            <Input
              placeholder="Numéro de facture"
              className="bg-gray-700 text-gray-100 border-gray-600"
              value={newDoctor.factureNum}
              onChange={(e) =>
                setNewDoctor({ ...newDoctor, factureNum: e.target.value })
              }
            />

            <Input
              placeholder="Numéro de telephone"
              className="bg-gray-700 text-gray-100 border-gray-600"
              value={newDoctor.numTlfn}
              onChange={(e) =>
                setNewDoctor({ ...newDoctor, numTlfn: e.target.value })
              }
            />

            <Input
              placeholder="Adresse"
              className="bg-gray-700 text-gray-100 border-gray-600"
              value={newDoctor.address}
              onChange={(e) =>
                setNewDoctor({ ...newDoctor, address: e.target.value })
              }
            />
          </div>

          <DialogFooter>
            <Button onClick={handleAddDoctor}>Ajouter</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ───────────────────────────────────────────── */}
      {/* EDIT DOCTOR MODAL */}
      {/* ───────────────────────────────────────────── */}

      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="bg-gray-800 text-gray-100 border-gray-600">
          <DialogHeader>
            <DialogTitle>Modifier Médecin</DialogTitle>
          </DialogHeader>

          {editData && (
            <div className="space-y-4">
              <Input
                className="bg-gray-700 text-gray-100 border-gray-600"
                placeholder="Nom"
                value={editData.nom}
                onChange={(e) =>
                  setEditData({ ...editData, nom: e.target.value })
                }
              />

              <Input
                className="bg-gray-700 text-gray-100 border-gray-600"
                placeholder="Num de facture"
                value={editData.factureNum}
                onChange={(e) =>
                  setEditData({ ...editData, factureNum: e.target.value })
                }
              />

              <Input
                className="bg-gray-700 text-gray-100 border-gray-600"
                placeholder="Adresse"
                value={editData.address}
                onChange={(e) =>
                  setEditData({ ...editData, address: e.target.value })
                }
              />
            </div>
          )}

          <DialogFooter>
            <Button onClick={handleSaveEdit}>Enregistrer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ───────────────────────────────────────────── */}
      {/* PRODUCT MODAL */}
      {/* ───────────────────────────────────────────── */}

      <Dialog open={productModalOpen} onOpenChange={setProductModalOpen}>
        <DialogContent className="bg-gray-800 text-gray-100 border-gray-600">
          <DialogHeader>
            <DialogTitle>Ajouter un Produit</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <select
              className="w-full bg-gray-700 text-gray-100 p-2 rounded-md border border-gray-600"
              value={selectedDoctorId}
              onChange={(e) => setSelectedDoctorId(e.target.value)}
            >
              <option value="">Sélectionner un médecin</option>
              {doctors.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.nom}
                </option>
              ))}
            </select>

            <Input
              placeholder="Nom du produit"
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
