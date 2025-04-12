

import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import { adminGetUserMethod } from "../../services/Gestion_de_usuario/usuarioService";
import { Usuario } from "../../services/interfaces/usuarios";
// import UserAdminInfoCard from "./Usuario/InformacionUsuarioCard";
import UserAdminMetaCard from "./Usuario/UsuarioMetaCard";


import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserAdminInfoCard from "./Usuario/InformacionUsuarioCard";



export default function UserAdminProfiles() {
  const { id } = useParams();
  const [user, setUser] = useState<Usuario | null>(null);

   useEffect(() => {
    const fetchUsuario = async () => {
      try {
        if (id) {
          const data = await adminGetUserMethod(Number(id));
          setUser(data.usuario ?? null);
        }
      } catch (err) {
        console.error("Error al obtener usuario", err);
      }
    };

    fetchUsuario();
  }, [id]);

  return (
    <>
      <PageMeta
        title="Perfil de Usuario"
        description="Estamos en la página de Perfil de Usuario"
      />
      <PageBreadcrumb pageTitle="Perfil de Usuario" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Perfil
        </h3>
        <div className="space-y-6">
          <UserAdminMetaCard user={user} />
          <UserAdminInfoCard user={user} setUser={setUser} />
        </div>
      </div>
    </>
  );
}
