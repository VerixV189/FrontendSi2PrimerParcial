import PageMeta from '../../components/common/PageMeta';
import PageBreadcrumb from '../../components/common/PageBreadCrumb';
import TableModelo from './TableModelo';
import ComponentCardModified from './ComponentCardModified';
import Button from '../../components/ui/button/Button';

export const ModeloPage = () => {
  return (
    <>

    {/* titulo de la pagina */}
      <PageMeta
        title="Categoria"
        description="Esta es la pagina de categoria"
      />
      {/* esto es donde dinde Basic Tables o un header  */}
      <PageBreadcrumb pageTitle="Modelos" />
      <div className="space-y-6">
        {/* lo envuelve la tabla en un card */}
        <ComponentCardModified title="Tabla de Modelos"
            action={
              <Button onClick={() => console.log("Nuevo Modelo")}>
                + Agregar
              </Button>
            }>
          
          {/* crea la tabla ya con todos los datos */}
          
          <TableModelo/>
        </ComponentCardModified>
        
      </div>
    </>
  );
}
