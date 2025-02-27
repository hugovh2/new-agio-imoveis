"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { randomAvatar } from '@/lib/utils';

// Defina um avatar padrão, caso o usuário não tenha um



export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const { user, logout } = useAuth();
  const avatar = user?.avatar ? user.avatar : randomAvatar();

  return (
    <header className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-[#3EA76F]">
            Ágio Imóveis
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/buscar"
              className="text-gray-600 hover:text-[#3EA76F]"
            >
              Buscar Imóveis
            </Link>
            <Link
              href="/anunciar"
              className="text-gray-600 hover:text-[#3EA76F]"
            >
              Anunciar
            </Link>
            <Link href="/sobre" className="text-gray-600 hover:text-[#3EA76F]">
              Sobre
            </Link>
            <Link
              href="/contato"
              className="text-gray-600 hover:text-[#3EA76F]"
            >
              Contato
            </Link>
            {user && (
              <Link
                href="/meus-imoveis"
                className="text-gray-600 hover:text-[#3EA76F]"
              >
                Meus Imóveis
              </Link>
            )}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-2">
                <Link href="/perfil" className="flex items-center space-x-2">
                  <img
                    src={user.avatar || avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-gray-600 cursor-pointer">
                    Olá, {user.name}
                  </span>
                </Link>
                <Button variant="ghost" onClick={logout}>
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={() => router.push("/auth/login")}
                >
                  Entrar
                </Button>
                <Button onClick={() => router.push("/auth/register")}>
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
            {user && (
              <Link
                href="/meus-imoveis"
                className="block px-3 py-2 text-gray-600 hover:text-[#3EA76F]"
              >
                Meus Imóveis
              </Link>
            )}
            <div className="pt-2 space-y-2">
              {user ? (
                <div className="flex flex-col space-y-2">
                  <Link href="/perfil/profile" className="flex items-center space-x-2">
                    <img
                      src={user.avatar || defaultAvatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-gray-600 cursor-pointer">
                      Olá, {user.name}
                    </span>
                  </Link>
                  <Button
                    variant="ghost"
                    className="w-full"
                    onClick={logout}
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    className="w-full"
                    onClick={() => router.push("/auth/login")}
                  >
                    Entrar
                  </Button>
                  <Button
                    className="w-full"
                    onClick={() => router.push("/auth/register")}
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
