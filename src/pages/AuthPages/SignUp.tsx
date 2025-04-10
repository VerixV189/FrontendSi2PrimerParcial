import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignUpForm from "../../components/auth/SignUpForm";

export default function SignUp() {
  return (
    <>
      <PageMeta
        title="Registro de usuarios"
        description="Esta es la pagina para registro de usuarios"
      />
      <AuthLayout>
        <SignUpForm />
      </AuthLayout>
    </>
  );
}
