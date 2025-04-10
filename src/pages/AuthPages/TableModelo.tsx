import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import Pagination from "../Tables/PaginacionT";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { getPaginatedModelos, updateModelo, deleteModelo } from "../../services/Gestion_de_Productos/modeloService";
import { Modelo } from "../../services/interfaces/modelo";
import Swal from "sweetalert2";
import { Modal } from "../../components/ui/modal";
import Button from "../../components/ui/button/Button";
import SelectModified from "./SelectModified";
import { getAllMarca } from "../../services/Gestion_de_Productos/marcaService";
import { getAllCategoria } from "../../services/Gestion_de_Productos/categoriaService";


interface TableModeloProps {
  reloadTrigger?: boolean;
  onDeleted?: () => void;
}

const TableModelo = ({ reloadTrigger, onDeleted }: TableModeloProps) => {
  const [modelos, setModelos] = useState<Modelo[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedModelo, setSelectedModelo] = useState<Modelo | null>(null);
  const [modeloEditMarcaId, setModeloEditMarcaId] = useState<string>("");
  const [modeloEditCategoriaId, setModeloEditCategoriaId] = useState<string>("");
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);


  const fetchModelos = async () => {
    try {
      const data = await getPaginatedModelos(currentPage);
      setModelos(data.items);
      setTotalPages(data.meta.total_pages);
    } catch (error) {
      console.error("Error al obtener modelos paginados", error);
    }
  };

  useEffect(() => {
    fetchModelos();
  }, [currentPage, reloadTrigger]);

  const openDeleteModal = (modelo: Modelo) => {
    setSelectedModelo(modelo);
    setShowDeleteModal(true);
  };

  // Función para abrir el modal de edición y cargar datos
const openEditModal = async (modelo: Modelo) => {
  setSelectedModelo(modelo);
  setModeloEditMarcaId(modelo.marca?.id?.toString() ?? "");
  setModeloEditCategoriaId(modelo.categoria?.id?.toString() ?? "");
  setShowEditModal(true);

  try {
    const [resMarcas, resCategorias] = await Promise.all([
      getAllMarca(),      // Debes tener esta función en tu servicio
      getAllCategoria()   // Igual para categorías
    ]);
    setMarcas(resMarcas);
    setCategorias(resCategorias);
  } catch (error) {
    console.error("Error al cargar marcas/categorías", error);
  }
};

  const handleDelete = async () => {
    if (!selectedModelo) return;
    try {
      const data = await deleteModelo(selectedModelo.id);
      Swal.fire("Modelo eliminado", data.message, "success");
      setShowDeleteModal(false);
      setSelectedModelo(null);

      const updatedData = await getPaginatedModelos(currentPage);
      if (updatedData.items.length === 0 && currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
      } else {
        setModelos(updatedData.items);
        setTotalPages(updatedData.meta.total_pages);
      }

      onDeleted?.();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      Swal.fire("Error", error.message || "No se pudo eliminar el modelo", "error");
    }
  };

  const handleEdit = async () => {
  if (!selectedModelo) return;
    try {
      const data = await updateModelo(selectedModelo.id, {
        marca_id: Number(modeloEditMarcaId),
        categoria_id: Number(modeloEditCategoriaId),
      });

      Swal.fire("Modelo actualizado", data.message, "success");
      setShowEditModal(false);
      setSelectedModelo(null);
      fetchModelos();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      Swal.fire("Error", error.message || "No se pudo actualizar el modelo", "error");
    }
  };
  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell isHeader className="px-5 py-3 text-theme-xs font-medium text-start text-gray-500 dark:text-gray-400">ID</TableCell>
                <TableCell isHeader className="px-5 py-3 text-theme-xs font-medium text-start text-gray-500 dark:text-gray-400">Nombre</TableCell>
                <TableCell isHeader className="px-5 py-3 text-theme-xs font-medium text-start text-gray-500 dark:text-gray-400">Marca</TableCell>
                <TableCell isHeader className="px-5 py-3 text-theme-xs font-medium text-start text-gray-500 dark:text-gray-400">Categoría</TableCell>
                <TableCell isHeader className="px-5 py-3 text-theme-xs font-medium text-start text-gray-500 dark:text-gray-400">Fecha creación</TableCell>
                <TableCell isHeader className="px-5 py-3 text-theme-xs font-medium text-start text-gray-500 dark:text-gray-400">Última actualización</TableCell>
                <TableCell isHeader className="px-5 py-3 text-theme-xs font-medium text-start text-gray-500 dark:text-gray-400">Acciones</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {modelos.map((modelo) => (
                <TableRow key={modelo.id}>
                  <TableCell className="px-5 py-4 text-start text-theme-sm text-gray-800 dark:text-white/90">{modelo.id}</TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-800 dark:text-white">{modelo.nombre}</TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-700 dark:text-white/80">{modelo.marca?.nombre ?? "-"}</TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-700 dark:text-white/80">{modelo.categoria?.nombre ?? "-"}</TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">{modelo.fecha_creacion}</TableCell>
                  <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">{modelo.fecha_actualizacion}</TableCell>
                  <TableCell className="px-4 py-3 text-start">
                    <div className="flex items-center space-x-3">
                      <button className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400" onClick={() => openEditModal(modelo)}>
                        <PencilSquareIcon className="h-5 w-5" />
                      </button>
                      <button className="text-gray-500 hover:text-red-600 dark:hover:text-red-400" onClick={() => openDeleteModal(modelo)}>
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="p-4">
          <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
        </div>
      </div>

      {/* Modal eliminación */}
      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} className="max-w-[400px] m-4">
        <div className="w-full p-6 bg-white rounded-3xl dark:bg-gray-900">
          <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">Confirmar eliminación</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            ¿Estás seguro de que deseas eliminar el modelo{" "}
            <span className="font-bold">{selectedModelo?.nombre}</span>?
          </p>
          <div className="flex justify-end gap-3 pt-6">
            <Button size="sm" onClick={handleDelete}>Eliminar</Button>
          </div>
        </div>
      </Modal>

      {/* Modal edición */}
      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)} className="max-w-[500px] m-4">
        <div className="w-full p-6 bg-white rounded-3xl dark:bg-gray-900">
          <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
            Editar Modelo
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Marca</label>
              <SelectModified
                options={marcas.map((marca) => ({
                  value: marca.id.toString(),
                  label: marca.nombre,
                }))}
                value={modeloEditMarcaId}
                onChange={(val) => setModeloEditMarcaId(val)}
                placeholder="Selecciona una marca"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Categoría</label>
              <SelectModified
                options={categorias.map((cat) => ({
                  value: cat.id.toString(),
                  label: cat.nombre,
                }))}
                value={modeloEditCategoriaId}
                onChange={(val) => setModeloEditCategoriaId(val)}
                placeholder="Selecciona una categoría"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button size="sm" variant="outline" onClick={() => setShowEditModal(false)}>
                Cancelar
              </Button>
              <Button size="sm" onClick={handleEdit}>
                Guardar Cambios
              </Button>
            </div>
          </div>
        </div>
      </Modal>

    </>
  );
};

export default TableModelo;
