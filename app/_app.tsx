import type { AppProps } from "next/app";
import "@/styles/globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Header from "@/components/header";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const hideHeaderRoutes = ["/perfil"]; // Rotas onde o header não deve aparecer

  return (
    <AuthProvider>
      {!hideHeaderRoutes.includes(router.pathname) && <Header />}
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
