import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import Header from '@/components/header';
import Footer from '@/components/footer';
import WhatsAppButton from '@/components/whatsapp-button';
import { AuthProvider } from '@/context/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ágio Imóveis | Seu Próximo Imóvel Está Aqui',
  description: 'Encontre as melhores oportunidades de ágio de imóveis',
  icons: {
    icon: '/favicon.ico', // Caminho padrão no Next.js
  },
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="light">
            <Header />
            <main>{children}</main>
            <WhatsAppButton />
            <Footer />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

