import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import TableRol from "./TableRol";
import TablePermiso from "./TablePermiso";
import Button from "../../components/ui/button/Button";
import ComponentCardModified from "./ComponentCardModified";

export const RolPermisoPage = () => {
  return (
    <>

    {/* titulo de la pagina */}
      <PageMeta
        title="Roles y Permisos"
        description="Esta es la pagina de Roles y permisos"
      />
    <PageBreadcrumb pageTitle="Roles y Permisos" />
      {/* esto es donde dinde Basic Tables o un header  */}
      <div className="space-y-6">
        {/* lo envuelve la tabla en un card */}
          <ComponentCardModified
            title="Roles"
            action={
              <Button onClick={() => console.log("Nuevo Rol")}>
                + Agregar
              </Button>
            }
            >
            <TableRol/>

          </ComponentCardModified>
            {/* crea la tabla ya con todos los datos */}
          
          <ComponentCardModified title="Permisos"
            action={
              <Button onClick={() => console.log("Nuevo Permiso")}>
                + Agregar
              </Button>
            }
          >
        
            <TablePermiso/>
          </ComponentCardModified>
        

        
          {/* <ComponentCard title="Asignacion de Roles y Permisos">  
            <BitacoraTable/>
          </ComponentCard> */}
      
      </div>
    </>
  );
}




