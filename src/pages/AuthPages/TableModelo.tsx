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
import { getPaginatedModelos } from "../../services/Gestion_de_Productos/modeloService";
import { Modelo } from "../../services/interfaces/modelo";

const TableModelo = () => {
  const [modelos, setModelos] = useState<Modelo[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchModelos = async () => {
      try {
        const data = await getPaginatedModelos(currentPage);
        setModelos(data.items);
        setTotalPages(data.meta.total_pages);
      } catch (error) {
        console.error("Error al obtener modelos paginados", error);
      }
    };

    fetchModelos();
  }, [currentPage]);

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell isHeader className="px-5 py-3 text-theme-xs text-start font-medium text-gray-500 dark:text-gray-400">ID</TableCell>
              <TableCell isHeader className="px-5 py-3 text-theme-xs text-start font-medium text-gray-500 dark:text-gray-400">Nombre</TableCell>
              <TableCell isHeader className="px-5 py-3 text-theme-xs text-start font-medium text-gray-500 dark:text-gray-400">Marca</TableCell>
              <TableCell isHeader className="px-5 py-3 text-theme-xs text-start font-medium text-gray-500 dark:text-gray-400">Categoría</TableCell>
              <TableCell isHeader className="px-5 py-3 text-theme-xs text-start font-medium text-gray-500 dark:text-gray-400">Fecha creación</TableCell>
              <TableCell isHeader className="px-5 py-3 text-theme-xs text-start font-medium text-gray-500 dark:text-gray-400">Última actualización</TableCell>
              <TableCell isHeader className="px-5 py-3 text-theme-xs text-start font-medium text-gray-500 dark:text-gray-400">Acciones</TableCell>
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
                    <button className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400">
                      <PencilSquareIcon className="h-5 w-5" />
                    </button>
                    <button className="text-gray-500 hover:text-red-600 dark:hover:text-red-400">
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
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default TableModelo;
