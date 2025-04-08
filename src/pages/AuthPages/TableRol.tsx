import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import Pagination from "../Tables/PaginacionT";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";

interface Role {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

const rolesData: Role[] = [
  {
    id: 1,
    name: "Administrador",
    createdAt: "2024-01-12",
    updatedAt: "2024-03-22",
  },
  {
    id: 2,
    name: "Editor",
    createdAt: "2024-01-20",
    updatedAt: "2024-03-10",
  },
  {
    id: 3,
    name: "Usuario",
    createdAt: "2024-02-05",
    updatedAt: "2024-03-15",
  },
];

const TableRol = () => {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                ID
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Nombre
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Fecha creación
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Última actualización
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Acciones
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {rolesData.map((role) => (
              <TableRow key={role.id}>
                <TableCell className="px-5 py-4 sm:px-6 text-start text-theme-sm text-gray-800 dark:text-white/90">
                  {role.id}
                </TableCell>
                <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-800 dark:text-white">
                  {role.name}
                </TableCell>
                <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                  {role.createdAt}
                </TableCell>
                <TableCell className="px-4 py-3 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                  {role.updatedAt}
                </TableCell>
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
        <Pagination totalPages={5} currentPage={1} />
      </div>
    </div>
  );
};

export default TableRol;
