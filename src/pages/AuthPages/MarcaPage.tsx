import ComponentCardModified from './ComponentCardModified';
import PageBreadcrumb from '../../components/common/PageBreadCrumb';
import PageMeta from '../../components/common/PageMeta';
import TableMarca from './TableMarca';
import Button from '../../components/ui/button/Button';

export const MarcaPage = () => {
  return (
    <>

    {/* titulo de la pagina */}
      <PageMeta
        title="Bitacora de Usuario"
        description="Esta es la pagina de bitacora de usuario"
      />
      {/* esto es donde dinde Basic Tables o un header  */}
      <PageBreadcrumb pageTitle="Marcas" />
      <div className="space-y-6">
        {/* lo envuelve la tabla en un card */}
        <ComponentCardModified title="Tabla de Marcas"
            action={
              <Button onClick={() => console.log("Nueva Marca")}>
                + Agregar
              </Button>
            }
        >
          
          {/* crea la tabla ya con todos los datos */}
          
          <TableMarca/>
        </ComponentCardModified>
        
      </div>
    </>
  );
}
