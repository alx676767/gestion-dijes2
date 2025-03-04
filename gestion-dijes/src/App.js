import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const initialCatalog = [
  { id: 1, name: "Águila", image: "https://via.placeholder.com/100", weight: 5, diamonds: 2 },
  { id: 2, name: "Toro", image: "https://via.placeholder.com/100", weight: 7, diamonds: 1 },
  { id: 3, name: "Serpiente", image: "https://via.placeholder.com/100", weight: 6, diamonds: 3 },
];

export default function JewelryOrderApp() {
  const [orders, setOrders] = useState({});

  const handleQuantityChange = (id, value) => {
    setOrders({ ...orders, [id]: parseInt(value) || 0 });
  };

  const calculateMaterials = () => {
    let totalMetal = 0;
    let totalDiamonds = 0;
    
    initialCatalog.forEach((item) => {
      if (orders[item.id]) {
        totalMetal += item.weight * orders[item.id];
        totalDiamonds += item.diamonds * orders[item.id];
      }
    });
    return { totalMetal, totalDiamonds };
  };

  const { totalMetal, totalDiamonds } = calculateMaterials();

  return (
    <div className="p-6 grid gap-4">
      <h1 className="text-xl font-bold">Gestión de Pedidos de Dijes</h1>
      <div className="grid grid-cols-3 gap-4">
        {initialCatalog.map((item) => (
          <Card key={item.id} className="p-4">
            <CardContent className="flex flex-col items-center">
              <img src={item.image} alt={item.name} className="w-20 h-20" />
              <p className="font-semibold mt-2">{item.name}</p>
              <Input
                type="number"
                min="0"
                value={orders[item.id] || ""}
                onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                placeholder="Cantidad"
                className="mt-2 w-24 text-center"
              />
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-4 p-4 border rounded-lg">
        <h2 className="text-lg font-semibold">Resumen del Pedido</h2>
        <p>Metal necesario: {totalMetal}g</p>
        <p>Diamantes necesarios: {totalDiamonds}</p>
      </div>
      <Button className="mt-4">Generar Reporte</Button>
    </div>
  );
}