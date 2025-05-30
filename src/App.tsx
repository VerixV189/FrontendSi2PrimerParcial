import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import PublicLayout from "./pages/WelcomePage/PublicLayout";
import Welcome from "./pages/WelcomePage/Welcome";
import { BitacoraUsuario } from "./pages/AuthPages/BitacoraUsuario";
import { RolPermisoPage } from "./pages/AuthPages/RolPermisoPage";
import { MarcaPage } from "./pages/AuthPages/MarcaPage";
import { CategoriaPage } from "./pages/AuthPages/CategoriaPage";
import { ModeloPage } from "./pages/AuthPages/ModeloPage";
import { UsuarioPage } from "./pages/AuthPages/UsuariosPage";

import { PermisoAsignacionPage } from "./pages/AuthPages/PermisoAsignacionPage";
import UserAdminProfiles from "./pages/AuthPages/UsuarioEditPage";
import RegistrarUsuario from "./pages/AuthPages/RegistroPage";
import { ProductoAdminPage } from "./pages/AuthPages/ProductoAdminPage";
import { ProductosMainPage } from "./pages/AuthPages/ProductoMainPage";
import EditarProductoPage from "./pages/AuthPages/ProductoEditPage";
import { ProtectedRoute } from "./pages/AuthPages/logic-routes/ProtectedRoute";
import Unauthorized from "./pages/OtherPage/Unauthorized";
// import { AuthProvider } from "./context/AuthContext.tsx";


export default function App() {
  return (
    <>
      
        <Router>
          <ScrollToTop />
          <Routes>
            <Route element={<PublicLayout />}>
              <Route index path="/" element={<Welcome />} />
            </Route>
            {/* Dashboard Layout */}
            {/* <AuthProvider> */}
              <Route element={<AppLayout />}>
              

              {/* <Route path="/usuarios" element={
                      <ProtectedRoute rolesAllowed={["ADMINISTRADOR"]}>
                        <UsuarioPage />
                      </ProtectedRoute>
                    } /> otra manera de hacerlo*/}
                    <Route
                      element={
                        <ProtectedRoute rolesAllowed={["ADMINISTRADOR","CLIENTE"]}>
                          <Outlet />
                        </ProtectedRoute>
                      }
                    >
                      <Route index path="/home" element={<Home />} />
                      <Route path="/profile" element={<UserProfiles />} />

                    </Route>
                    

                    <Route
                      element={
                        <ProtectedRoute rolesAllowed={["ADMINISTRADOR"]}>
                          <Outlet />
                        </ProtectedRoute>
                      }
                    >
                      {/* <Route index path="/home" element={<Home />} /> */}
                      <Route path="/profile/usuario/:id" element={<UserAdminProfiles />} />
                      <Route path="/bitacora-usuario" element={<BitacoraUsuario />} />
                      <Route path="/roles-permisos" element={<RolPermisoPage />} />
                      <Route path="/roles-permisos/rol/:id" element={<PermisoAsignacionPage />} />
                      <Route path="/registrar-usuario" element={<RegistrarUsuario />} />
                      <Route path="/marcas" element={<MarcaPage />} />
                      <Route path="/categorias" element={<CategoriaPage />} />
                      <Route path="/modelos" element={<ModeloPage />} />
                      <Route path="/usuarios" element={<UsuarioPage />} />
                      <Route path="/productos" element={<ProductosMainPage />} />
                      <Route path="/productos/:id/edit" element={<EditarProductoPage />} />
                      <Route path="/crear-producto" element={<ProductoAdminPage />} />
                      <Route path="/producto/:id/get" element={<ProductoAdminPage />} />
                      
                    </Route>

                                        

                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/blank" element={<Blank />} />

                    {/* Forms */}
                    <Route path="/form-elements" element={<FormElements />} />

                    {/* Tables */}
                    <Route path="/basic-tables" element={<BasicTables />} />

                    {/* Ui Elements */}
                    <Route path="/alerts" element={<Alerts />} />
                    <Route path="/avatars" element={<Avatars />} />
                    <Route path="/badge" element={<Badges />} />
                    <Route path="/buttons" element={<Buttons />} />
                    <Route path="/images" element={<Images />} />
                    <Route path="/videos" element={<Videos />} />

                    {/* Charts */}
                    <Route path="/line-chart" element={<LineChart />} />
                    <Route path="/bar-chart" element={<BarChart />} />
              </Route>
            {/* </AuthProvider> */}

            {/* Auth Layout */}
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Fallback Route */}
            {/* ruta de errores, se dispara cuando accedemos a una ruta no definida */}
            <Route path="*" element={<NotFound />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
          </Routes>
        </Router>
        
    </>
  );
}
