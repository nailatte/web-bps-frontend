import React from 'react';

export default function Footer() {
  return (
    <footer className="text-center py-8 bg-gradient-to-r from-[#002b6a] to-[#004899] shadow-lg/15 text-white">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8 px-8">
        {/* Kolom 1 */}
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-3">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Lambang_Badan_Pusat_Statistik_%28BPS%29_Indonesia.svg/2560px-Lambang_Badan_Pusat_Statistik_%28BPS%29_Indonesia.svg.png"
              alt="Logo BPS"
              className="h-10 w-auto"
            />
            <h3 className="text-white text-base md:text-lg font-bold italic">
              BADAN PUSAT STATISTIK
            </h3>
          </div>
          <p className="text-sm text-gray-300 text-left">
            Badan Pusat Statistik Provinsi Jawa Barat<br />
            Jl. PHH. Mustofa No. 43 Bandung 40124<br />
            Jawa Barat - Indonesia<br />
            Telp +62 22 7272595<br />
            Email:{' '}
            <a
              href="mailto:bps3200@bps.go.id"
              className="hover:text-blue-400"
            >
              bps3200@bps.go.id
            </a>
          </p>
        </div>

        {/* Kolom 2 */}
        <div className="flex-1 text-left">
          <h4 className="font-semibold text-white mb-2">Tentang Kami</h4>
          <ul className="text-sm space-y-1">
            {[
              ['Profil BPS', 'https://ppid.bps.go.id/app/konten/0000/Profil-BPS.html'],
              ['PPID', 'https://ppid.bps.go.id/'],
              ['Kebijakan Diseminasi', 'https://ppid.bps.go.id/app/konten/0000/Layanan-BPS.html'],
            ].map(([label, link], i) => (
              <li key={i}>
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline hover:text-blue-300"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Kolom 3 */}
        <div className="flex-1 text-left">
          <h4 className="font-semibold text-white mb-2">Tautan Lainnya</h4>
          <ul className="text-sm space-y-1">
            {[
              ['ASEAN Stats', 'https://www.aseanstats.org/'],
              ['Forum Statistik', 'https://fmsindonesia.id/'],
              ['Reformasi Birokrasi', 'https://rb.bps.go.id/'],
              ['Layanan Pengadaan Secara Elektronik', 'https://lpse.bps.go.id/eproc4'],
              ['Politeknik Statistika STIS', 'https://www.stis.ac.id/'],
              ['Pusdiklat BPS', 'https://pusdiklat.bps.go.id/'],
              ['JDIH BPS', 'https://jdih.web.bps.go.id/'],
            ].map(([label, link], i) => (
              <li key={i}>
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline hover:text-blue-300"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="text-gray-400 text-xs mt-8">
        Created by Naila Hanifa (222313282@stis.ac.id)
      </p>
    </footer>
  );
}