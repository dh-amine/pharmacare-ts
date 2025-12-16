import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { saveDoctor } from "@/api/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ArrowLeft } from "lucide-react";
import * as XLSX from "xlsx";

import { fetchDoctors } from "@/api/axios";
import type { Doctor } from "../types/doctor";

// ---------------------------------------
// FORMAT DATE (DD/MM/YYYY)
// ---------------------------------------
const formatDate = (value?: string | Date) => {
  if (!value) return "—";

  const date = typeof value === "string" ? new Date(value) : value;
  if (isNaN(date.getTime())) return "—";

  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

// ---------------------------------------
// MAIN COMPONENT
// ---------------------------------------
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

  // ---------------------------------------
  // FILTER
  // ---------------------------------------
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
  ];

  // ---------------------------------------
  // EXPORT EXCEL
  // ---------------------------------------
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
    }));

    const ws = XLSX.utils.json_to_sheet(sanitized);
    const wb = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, "Actions");
    XLSX.writeFile(
      wb,
      `actions_${new Date().toISOString().slice(0, 10)}.xlsx`
    );
  };

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

    </div>
  );
};

export default MedsPage;
