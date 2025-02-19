"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const { user, logout } = useAuth();

  return (
    <header className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-[#3EA76F]">
            Ágio Imóveis
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/buscar" className="text-gray-600 hover:text-[#3EA76F]">
              Buscar Imóveis
            </Link>
            <Link href="/anunciar" className="text-gray-600 hover:text-[#3EA76F]">
              Anunciar
            </Link>
            <Link href="/sobre" className="text-gray-600 hover:text-[#3EA76F]">
              Sobre
            </Link>
            <Link href="/contato" className="text-gray-600 hover:text-[#3EA76F]">
              Contato
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                {/* Link para a página de perfil */}
                <Link href="/perfil">
                  <span className="text-gray-600 cursor-pointer">Olá, {user.name}</span>
                </Link>
                <Button variant="ghost" onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="ghost"
                  onClick={() => router.push('/auth/login')}
                >
                  Entrar
                </Button>
                <Button
                  onClick={() => router.push('/auth/register')}
                >
                  Cadastrar
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="px-4 pt-2 pb-4 space-y-2">
            <Link
              href="/buscar"
              className="block px-3 py-2 text-gray-600 hover:text-[#3EA76F]"
            >
              Buscar Imóveis
            </Link>
            <Link
              href="/anunciar"
              className="block px-3 py-2 text-gray-600 hover:text-[#3EA76F]"
            >
              Anunciar
            </Link>
            <Link
              href="/sobre"
              className="block px-3 py-2 text-gray-600 hover:text-[#3EA76F]"
            >
              Sobre
            </Link>
            <Link
              href="/contato"
              className="block px-3 py-2 text-gray-600 hover:text-[#3EA76F]"
            >
              Contato
            </Link>
            <div className="pt-2 space-y-2">
              {user ? (
                <>
                  {/* Link para a página de perfil */}
                  <Link href="/perfil/profile">
                    <span className="block text-gray-600 cursor-pointer">Olá, {user.name}</span>
                  </Link>
                  <Button 
                    variant="ghost" 
                    className="w-full"
                    onClick={logout}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="ghost" 
                    className="w-full"
                    onClick={() => router.push('/auth/login')}
                  >
                    Entrar
                  </Button>
                  <Button 
                    className="w-full"
                    onClick={() => router.push('/auth/register')}
                  >
                    Cadastrar
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
