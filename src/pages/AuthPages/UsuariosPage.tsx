import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/ui/button/Button";
import ComponentCardModified from "./ComponentCardModified";
import UsuarioTable from "./UsuarioTable";

export const UsuarioPage = () => {
  return (
    <>

    {/* titulo de la pagina */}
      <PageMeta
        title="Usuarios"
        description="Esta es la pagina de usuarios para el administrador"
      />
    <PageBreadcrumb pageTitle="Usuarios" />
      {/* esto es donde dinde Basic Tables o un header  */}
      <div className="space-y-6">
        {/* lo envuelve la tabla en un card */}
          <ComponentCardModified
            title="Tabla de Usuarios"
            action={
              <Button onClick={() => console.log("Nuevo Usuario")}>
                + Agregar
              </Button>
            }
            >
            <UsuarioTable/>

          </ComponentCardModified>
      
      </div>
    </>
  );
}