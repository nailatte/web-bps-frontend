import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const navItems = [
  { id: "publications", label: "Daftar Publikasi", path: "/publications" },
  { id: "add", label: "Tambah Publikasi", path: "/publications/add" },
  { id: "logout", label: "Logout", path: "/logout" },
];

function BpsLogo() {
  return (
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Lambang_Badan_Pusat_Statistik_%28BPS%29_Indonesia.svg/2560px-Lambang_Badan_Pusat_Statistik_%28BPS%29_Indonesia.svg.png"
      alt="BPS Logo"
      className="h-12 w-12"
    />
  );
}

export default function Navbar() {
  const location = useLocation();

  const { logoutAction } = useAuth();
const navigate = useNavigate();

const handleLogout = async () => {
  try {
    await logoutAction(); // Panggil logout dari context
    navigate("/login");   // Redirect ke halaman login
  } catch (error) {
    alert("Gagal logout: " + error.message);
  }
};

  if (location.pathname === "/login") return null;

  return (
    <nav className="bg-gradient-to-r from-[#002b6a] to-[#004899] shadow-lg/15 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo dan Nama */}
          <div className="flex items-center space-x-3">
            <BpsLogo />
            <span className="text-white text-base md:text-lg font-bold italic tracking-wider hidden sm:block">
              BPS PROVINSI JAWA BARAT
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {navItems.map((item) => {
              const isActive =
                location.pathname === item.path ||
                (item.id === "add" &&
                  location.pathname.startsWith("/publications/add")) ||
                (item.id === "publications" &&
                  location.pathname === "/publications");

              if (item.id === "logout") {
                return (
                  <button
                    key={item.id}
                    onClick={handleLogout}
                    className="px-3 py-2 rounded-md text-sm font-semibold bg-red-500 text-white hover:bg-red-600 transition-all duration-300 cursor-pointer shadow-sm"
                  >
                    {item.label}
                  </button>
                );
              }

              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-semibold transition-all duration-300 border border-transparent cursor-pointer ${
                    isActive
                      ? "bg-slate-200 text-sky-900 shadow-inner"
                      : "text-sky-100 hover:bg-sky-700 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
