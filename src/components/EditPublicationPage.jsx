import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePublications } from '../hooks/usePublications';

export default function EditPublicationPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { publications, editPublication } = usePublications();

  const selectedPublication = publications.find(pub => pub.id === parseInt(id));
  const [title, setTitle] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState('');

  useEffect(() => {
    if (selectedPublication) {
      setTitle(selectedPublication.title);
      setReleaseDate(selectedPublication.releaseDate);
      setCoverPreview(selectedPublication.coverUrl);
    }
  }, [selectedPublication]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !releaseDate) {
      alert('Judul dan Tanggal Rilis harus diisi!');
      return;
    }

    const updatedPublication = {
      ...selectedPublication,
      title,
      releaseDate,
      coverUrl: coverFile ? URL.createObjectURL(coverFile) : coverPreview,
    };

    editPublication(updatedPublication);
    navigate('/publications');
  };

  if (!selectedPublication) return <p className="text-center mt-12">Publikasi tidak ditemukan.</p>;

  return (
    <div className="max-w-4xl mx-auto bg-[#f2f6fc] p-8 rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Edit Publikasi</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-4 items-center gap-4">
          <label htmlFor="title" className="text-sm font-medium text-gray-700">Judul</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="col-span-3 px-3 py-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <label htmlFor="releaseDate" className="text-sm font-medium text-gray-700">Tanggal Rilis</label>
          <input
            type="date"
            id="releaseDate"
            value={releaseDate}
            onChange={e => setReleaseDate(e.target.value)}
            className="col-span-3 px-3 py-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <label className="text-sm font-medium text-gray-700">Sampul Lama</label>
          <img
            src={coverPreview}
            alt="Sampul Lama"
            className="col-span-3 h-40 w-auto object-cover rounded shadow"
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <label htmlFor="cover" className="text-sm font-medium text-gray-700">Ganti Sampul</label>
          <input
            type="file"
            id="cover"
            accept="image/*"
            onChange={e => setCoverFile(e.target.files[0])}
            className="col-span-3 px-3 py-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-[#004899] hover:bg-[#002b6a] text-white font-bold py-2 px-6 rounded-lg transition duration-300"
          >
            Simpan Perubahan
          </button>
        </div>
      </form>
    </div>
  );
}