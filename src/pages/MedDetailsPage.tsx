import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Doctor } from "../types/doctor";
import dayjs from "dayjs";
import { fetchDoctorById } from "@/api/axios"; // <-- import the API function

interface Product {
  id: number;
  name: string;
  quantity: number;
}

const MedDetailsPage: React.FC = () => {
  const { id } = useParams();
  const [doctorDetails, setDoctorDetails] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    name: "",
    quantity: 0,
  });

  // Fetch doctor by ID when page loads
  useEffect(() => {
    if (!id) return;

    const loadDoctor = async () => {
      setLoading(true);
      setError(null);
      try {
        const doctor = await fetchDoctorById(id);
        setDoctorDetails(doctor);

        // Initialize products from doctor if available
        // if (doctor.products) {
        //   setProducts(
        //     doctor.products.map((p, index) => ({
        //       id: p.id,
        //       name: p.name,
        //       quantity: Number(p.qte),
        //     }))
        //   );
        // }
      } catch (err) {
        console.error(err);
        setError("Impossible de récupérer les détails !");
      } finally {
        setLoading(false);
      }
    };

    loadDoctor();
  }, [id]);

  // Add product locally
  const addProduct = () => {
    if (!newProduct.name || newProduct.quantity <= 0) return;
    setProducts([...products, { id: products.length + 1, ...newProduct }]);
    setNewProduct({ name: "", quantity: 0 });
  };

  if (loading) return <p className="p-6 text-white">Chargement...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!doctorDetails) return <p className="p-6 text-white">Aucune donnée trouvée.</p>;

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white space-y-8">
      <h1 className="text-2xl font-bold mb-4">
        Détails du Bon de commande - ID : {id}
      </h1>

      {/* Doctor info table */}
      <div className="rounded-lg border border-gray-700 bg-gray-800 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-700/50">
              <TableHead>Zone</TableHead>
              <TableHead>Nom Délégué</TableHead>
              <TableHead>Gamme</TableHead>
              <TableHead>Date de Demande</TableHead>
              <TableHead>N° de Demande</TableHead>
              <TableHead>Nom Médecin</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow key={doctorDetails.id}>
              <TableCell>{doctorDetails.zone}</TableCell>
              <TableCell>{doctorDetails.delegueName}</TableCell>
              <TableCell>{doctorDetails.gamme}</TableCell>
              <TableCell>{dayjs(doctorDetails.dateDemande).format("YYYY/MM/DD")}</TableCell>
              <TableCell>{doctorDetails.numDemande}</TableCell>
              <TableCell>{doctorDetails.nameMedecin}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* Add product */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Ajouter un produit</h2>
        <div className="grid grid-cols-3 gap-4 items-end">
          <div>
            <label className="block mb-1">Nom du produit</label>
            <input
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              placeholder="Nom du produit"
              className="p-2 rounded bg-gray-700 text-white w-full"
            />
          </div>
          <div>
            <label className="block mb-1">Quantité</label>
            <input
              type="number"
              value={newProduct.quantity}
              onChange={(e) =>
                setNewProduct({ ...newProduct, quantity: parseInt(e.target.value) })
              }
              placeholder="Quantité"
              className="p-2 rounded bg-gray-700 text-white w-full"
            />
          </div>
          <Button
            onClick={addProduct}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Ajouter
          </Button>
        </div>

        {/* Products table */}
        {products.length > 0 && (
          <div className="rounded-lg border border-gray-700 bg-gray-800 overflow-x-auto mt-4">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-700/50">
                  <TableHead>ID</TableHead>
                  <TableHead>Nom</TableHead>
                  <TableHead>Quantité</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>{p.id}</TableCell>
                    <TableCell>{p.name}</TableCell>
                    <TableCell>{p.quantity}</TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-2">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                          Modifier
                        </Button>
                        <Button className="bg-red-600 hover:bg-red-700 text-white">
                          Supprimer
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedDetailsPage;
