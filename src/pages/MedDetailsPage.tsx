import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DoctorDetail {
  id: string;
  zone: string;
  nomDelg: string;
  gamme: string;
  demandeDate: string;
  demendeNum: number;
  prospect: string;
}

interface Product {
  id: number;
  name: string;
  quantity: number;
}

const MedDetailsPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const doctorFromState = location.state?.doctor as DoctorDetail;

  // On met les infos du doctor dans un tableau
  const [doctorDetails, setDoctorDetails] = useState<DoctorDetail[]>(
    doctorFromState ? [doctorFromState] : []
  );

  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    name: "",
    quantity: 0,
  });

  const addProduct = () => {
    if (!newProduct.name || newProduct.quantity <= 0) return;
    setProducts([...products, { id: products.length + 1, ...newProduct }]);
    setNewProduct({ name: "", quantity: 0 });
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white space-y-8">
      <h1 className="text-2xl font-bold mb-4">Détails du Bon de commande - ID : {id}</h1>

      {/* Tableau des informations du médecin */}
      <div className="rounded-lg border border-gray-700 bg-gray-800 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-700/50">
              <TableHead>Zone</TableHead>
              <TableHead>Nom Délégué</TableHead>
              <TableHead>Gamme</TableHead>
              <TableHead>Date de Demande</TableHead>
              <TableHead>N° de Date</TableHead>
              <TableHead>Prospect</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {doctorDetails.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell>{doc.zone}</TableCell>
                <TableCell>{doc.nomDelg}</TableCell>
                <TableCell>{doc.gamme}</TableCell>
                <TableCell>{doc.demandeDate}</TableCell>
                <TableCell>{doc.demendeNum}</TableCell>
                <TableCell>{doc.prospect}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Ajouter un produit */}
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
          <Button onClick={addProduct} className="bg-blue-600 text-white">
            Ajouter
          </Button>
        </div>

        {/* Tableau des produits */}
        {products.length > 0 && (
          <div className="rounded-lg border border-gray-700 bg-gray-800 overflow-x-auto mt-4">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-700/50">
                  <TableHead>ID</TableHead>
                  <TableHead>Nom</TableHead>
                  <TableHead>Quantité</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>{p.id}</TableCell>
                    <TableCell>{p.name}</TableCell>
                    <TableCell>{p.quantity}</TableCell>
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
