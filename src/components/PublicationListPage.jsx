import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePublications } from '../hooks/usePublications';

export default function PublicationListPage() {
  const { publications, deletePublication } = usePublications(); // Gunakan context
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/publications/edit/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm('Yakin ingin menghapus publikasi ini?')) {
      deletePublication(id);
    }
  };

  const handleViewDetail = (id) => {
    navigate(`/publications/detail/${id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <header className="mb-8 text-center md:text-left">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
          Daftar Publikasi BPS Provinsi Jawa Barat
        </h1>
        <p className="text-gray-500 mt-1">Sumber data publikasi terkini</p>
      </header>

      <div className="relative overflow-x-auto shadow-xl rounded-lg">
        <table className="w-full text-sm text-gray-500 text-center">
          <thead className="text-xs text-white uppercase bg-[#004899]">
            <tr>
              <th className="px-6 py-3 w-16">No</th>
              <th className="px-6 py-3">Judul</th>
              <th className="px-6 py-3">Tanggal Rilis</th>
              <th className="px-6 py-3">Sampul</th>
              <th className="px-6 py-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {publications.map((pub, idx) => (
              <tr key={pub.id} className="odd:bg-white even:bg-[#f4faff] hover:bg-gray-100 transition duration-200">
                <td className="px-6 py-4 font-medium text-gray-900">{idx + 1}</td>
                <td className="px-6 py-4 font-semibold text-gray-800">{pub.title}</td>
                <td className="px-6 py-4 text-gray-600">{pub.releaseDate}</td>
                <td className="px-6 py-4 flex justify-center items-center">
                  <img
                    src={pub.coverUrl}
                    alt={`Sampul ${pub.title}`}
                    className="h-24 w-auto object-cover rounded shadow-md"
                    onError={e => {
                      e.target.onerror = null;
                      e.target.src = 'https://placehold.co/100x140/cccccc/ffffff?text=Error';
                    }}
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center items-center gap-3">
                    <img
                      src="https://www.freeiconspng.com/thumbs/edit-icon-png/edit-new-icon-22.png"
                      alt="Edit"
                      onClick={() => handleEdit(pub.id)}
                      className="h-8 w-8 cursor-pointer transition duration-300 transform hover:scale-110"
                    />
                    <img
                      src="https://icons.veryicon.com/png/o/construction-tools/coca-design/delete-189.png"
                      alt="Hapus"
                      onClick={() => handleDelete(pub.id)}
                      className="h-8 w-8 cursor-pointer transition duration-300 transform hover:scale-110"
                    />
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/709/709496.png"
                      alt="Detail"
                      onClick={() => handleViewDetail(pub.id)}
                      className="h-8 w-8 cursor-pointer transition duration-300 transform hover:scale-110"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}