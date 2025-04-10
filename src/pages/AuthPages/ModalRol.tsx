import { useState } from "react";
//import Modal from "../ui/modal/Modal";

//import Button from "../ui/button/Button";

//import { createRol } from "../../services/Gestion_de_usuario/rolService";
import { Modal } from "../../components/ui/modal";
import Button from "../../components/ui/button/Button";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";

interface ModalCreateRolProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: () => void; // para recargar tabla al crear
}
export const ModalCreateRol = ({ isOpen, onClose, onCreated }: ModalCreateRolProps) => {
  const [nombre, setNombre] = useState("");

  const handleCreateRol = async () => {
    try {
      if (!nombre.trim()) return; // validación básica
    //  await createRol(nombre);
      setNombre("");
      onClose();
      onCreated(); // refresca la tabla
    } catch (error) {
      console.error("Error al crear rol:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[500px] m-4">
      <div className="w-full p-6 bg-white rounded-3xl dark:bg-gray-900">
        <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">Crear nuevo Rol</h2>
        
        <div className="space-y-4">
          <div>
            <Label>Nombre del Rol</Label>
            <Input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ej. Administrador"
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button size="sm" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button size="sm" onClick={handleCreateRol}>
              Crear Rol
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
