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
import { Doctor } from "@/api/doctor";
import dayjs from "dayjs";
/* interface DoctorDetail {
  id: string;
  zone: string;
  nomDelg: string;
  gamme: string;
  demandeDate: string;
  demendeNum: number;
  prospect: string;
} */

interface Product {
  id: number;
  name: string;
  quantity: number;
}

const MedDetailsPage = () => {
  const { id } = useParams();
  // On met les infos du doctor dans un tableau
  const [doctorDetails, setDoctorDetails] = useState<Doctor>();
  useEffect(()=>{
    if(id){
      setDoctorDetails(Doctor.getById(id as string))
      
    }
  },[id])

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


  if(!doctorDetails){
    return <>
     <div className="p-6 bg-gray-900 min-h-screen text-white space-y-8">
       <h1 className="text-2xl font-bold mb-4"></h1>
     </div>
    </>
  }
  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white space-y-8">
      <h1 className="text-2xl font-bold mb-4">Détails du Bon de commande - ID : {id}</h1>

      {/* Tableau des informations du médecin */}
      {
        doctorDetails && <>
        <div className="rounded-lg border border-gray-700 bg-gray-800 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-700/50">
              <TableHead>Zone</TableHead>
              <TableHead>Nom Délégué</TableHead>
              <TableHead>Gamme</TableHead>
              <TableHead>Date de Demande</TableHead>
              <TableHead>N° de Demande</TableHead>
              <TableHead>Prospect</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
           
              <TableRow key={doctorDetails.id}>
                <TableCell>{doctorDetails.zone}</TableCell>
                <TableCell>{doctorDetails.nomDelg}</TableCell>
                <TableCell>{doctorDetails.gamme}</TableCell>
                <TableCell>{dayjs(doctorDetails.demandeDate).format("YYYY/MM/DD")}</TableCell>
                <TableCell>{doctorDetails.demendeNum}</TableCell>
                <TableCell>{doctorDetails.prospect}</TableCell>
              </TableRow>
          
          </TableBody>
        </Table>
      </div>
        
        </>
      }
      

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
            <label className="block mb-1">Prix du Produit</label>
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
          <Button onClick={addProduct} className="bg-blue-600 hover:bg-blue-600 text-white">
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
                  <TableHead>Prix du Produit</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((p) => (
                  <TableRow key={p.id}>
  <TableCell colSpan={1}>{p.id}</TableCell>
  <TableCell colSpan={1}>{p.name}</TableCell>
  <TableCell colSpan={1}>{p.quantity}</TableCell>

  {/* Right-aligned action buttons */}
  <TableCell colSpan={1}>
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
