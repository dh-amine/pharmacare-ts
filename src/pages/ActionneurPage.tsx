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

interface Actionneur {
  id: string;
  nom: string;
  role: string;
  department: string;
  shift: string;
  status: "active" | "inactive";
  tasks: string[]; // simple list of tasks/assignments
}

const ActionneurPage: React.FC = () => {
  const [actionneurs, setActionneurs] = useState<Actionneur[]>([]);
  const [search, setSearch] = useState("");

  // Modals state
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const [current, setCurrent] = useState<Actionneur | null>(null);

  // Form state for add / edit
  const [formData, setFormData] = useState<Partial<Actionneur>>({
    nom: "",
    role: "",
    department: "",
    shift: "",
    status: "active",
    tasks: [],
  });

  function resetForm() {
    setFormData({
      nom: "",
      role: "",
      department: "",
      shift: "",
      status: "active",
      tasks: [],
    });
  }

  function handleAdd() {
    const newA: Actionneur = {
      id: crypto.randomUUID(),
      nom: formData.nom || "",
      role: formData.role || "",
      department: formData.department || "",
      shift: formData.shift || "",
      status: formData.status || "active",
      tasks: formData.tasks || [],
    };
    setActionneurs((prev) => [...prev, newA]);
    setAddModalOpen(false);
    resetForm();
  }

  function handleEditSave() {
    if (!current) return;
    setActionneurs((prev) =>
      prev.map((a) => (a.id === current.id ? { ...current, ...formData } : a))
    );
    setEditModalOpen(false);
    resetForm();
  }

  // For editing a particular actionneur
  useEffect(() => {
    if (current) {
      setFormData({
        nom: current.nom,
        role: current.role,
        department: current.department,
        shift: current.shift,
        status: current.status,
        tasks: current.tasks,
      });
    }
  }, [current]);

  // Filtering
  const filtered = actionneurs.filter((a) =>
    a.nom.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { key: "nom", label: "Nom" },
    { key: "role", label: "Rôle" },
    { key: "department", label: "Département" },
    { key: "shift", label: "Shift" },
    { key: "status", label: "Statut" },
    { key: "tasks", label: "Tâches assignées" },
  ];

  return (
    <div className="p-10 min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-8">Gestion des Actionneurs</h1>

      <div className="flex flex-wrap items-center gap-4 mb-6">
        <Input
          className="max-w-xs"
          placeholder="Rechercher un actionneur..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button onClick={() => { resetForm(); setAddModalOpen(true); }}>
          Ajouter un Actionneur
        </Button>
      </div>

      <div className="rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-200 dark:bg-gray-700">
              {columns.map((c) => (
                <TableHead key={c.key}>{c.label}</TableHead>
              ))}
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((a) => (
              <TableRow key={a.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <TableCell>{a.nom}</TableCell>
                <TableCell>{a.role}</TableCell>
                <TableCell>{a.department}</TableCell>
                <TableCell>{a.shift}</TableCell>
                <TableCell>{a.status}</TableCell>
                <TableCell>
                  {a.tasks.length > 0 ? a.tasks.join(", ") : "—"}
                </TableCell>
                <TableCell className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => {
                      setCurrent(a);
                      setEditModalOpen(true);
                    }}
                  >
                    Modifier
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Add Modal */}
      <Dialog open={addModalOpen} onOpenChange={setAddModalOpen}>
        <DialogContent className="space-y-4">
          <DialogHeader>
            <DialogTitle>Ajouter un Actionneur</DialogTitle>
          </DialogHeader>

          <Input
            placeholder="Nom"
            value={formData.nom}
            onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
          />
          <Input
            placeholder="Rôle"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          />
          <Input
            placeholder="Département"
            value={formData.department}
            onChange={(e) =>
              setFormData({ ...formData, department: e.target.value })
            }
          />
          <Input
            placeholder="Shift (ex: Matin / Soir)"
            value={formData.shift}
            onChange={(e) => setFormData({ ...formData, shift: e.target.value })}
          />
          <div className="flex items-center gap-2">
            <label className="mr-2">Statut :</label>
            <select
              className="border rounded p-1"
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value as "active" | "inactive",
                })
              }
            >
              <option value="active">Actif</option>
              <option value="inactive">Inactif</option>
            </select>
          </div>
          <Input
            placeholder="Tâches (séparées par virgule)"
            value={formData.tasks?.join(", ")}
            onChange={(e) => {
              const tasks = e.target.value.split(",").map((t) => t.trim());
              setFormData({ ...formData, tasks });
            }}
          />

          <DialogFooter>
            <Button onClick={handleAdd}>Ajouter</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="space-y-4">
          <DialogHeader>
            <DialogTitle>Modifier Actionneur</DialogTitle>
          </DialogHeader>

          <Input
            placeholder="Nom"
            value={formData.nom}
            onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
          />
          <Input
            placeholder="Rôle"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          />
          <Input
            placeholder="Département"
            value={formData.department}
            onChange={(e) =>
              setFormData({ ...formData, department: e.target.value })
            }
          />
          <Input
            placeholder="Shift"
            value={formData.shift}
            onChange={(e) => setFormData({ ...formData, shift: e.target.value })}
          />
          <div className="flex items-center gap-2">
            <label>Statut :</label>
            <select
              className="border rounded p-1"
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value as "active" | "inactive",
                })
              }
            >
              <option value="active">Actif</option>
              <option value="inactive">Inactif</option>
            </select>
          </div>
          <Input
            placeholder="Tâches (séparées par virgule)"
            value={formData.tasks?.join(", ")}
            onChange={(e) => {
              const tasks = e.target.value.split(",").map((t) => t.trim());
              setFormData({ ...formData, tasks });
            }}
          />

          <DialogFooter>
            <Button onClick={handleEditSave}>Enregistrer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ActionneurPage;
