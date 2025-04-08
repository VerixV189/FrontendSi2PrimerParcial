import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/ui/button/Button";
import ComponentCardModified from "./ComponentCardModified";
import TableCategoria from "./TableCategoria";


export const CategoriaPage = () => {
  return (
    <>

    {/* titulo de la pagina */}
      <PageMeta
        title="Bitacora de Usuario"
        description="Esta es la pagina de bitacora de usuario"
      />
      {/* esto es donde dinde Basic Tables o un header  */}
      <PageBreadcrumb pageTitle="Categoria" />
      <div className="space-y-6">
        {/* lo envuelve la tabla en un card */}
        <ComponentCardModified title="Tabla de Categorias"
            action={
              <Button onClick={() => console.log("Nueva Categoria")}>
                + Agregar
              </Button>
            }
        >
          
          {/* crea la tabla ya con todos los datos */}
          
          <TableCategoria/>
        </ComponentCardModified>
        
      </div>
    </>
  );
}
