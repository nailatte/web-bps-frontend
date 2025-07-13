import React, { createContext, useState, useEffect } from 'react';
import { publicationService } from '../services/publicationService';

export const PublicationContext = createContext(null);

export const PublicationProvider = ({ children }) => {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const backendData = await publicationService.getPublications();
        setPublications(backendData);
      } catch (err) {
        console.error('Gagal ambil dari backend:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const addPublication = async (newPub) => {
    const saved = await publicationService.addPublication(newPub);
    setPublications((prev) => [saved, ...prev]);
  };

  const editPublication = async (updatedPub) => {
    const saved = await publicationService.updatePublication(updatedPub.id, updatedPub);
    setPublications((prev) =>
      prev.map((pub) => (pub.id === saved.id ? saved : pub))
    );
  };

  const deletePublication = async (id) => {
    await publicationService.deletePublication(id);
    setPublications((prev) => prev.filter((pub) => pub.id !== id));
  };

  const getPublication = async (id) => {
    const publication = await publicationService.getPublicationById(id);
    return publication;
  };


  return (
    <PublicationContext.Provider
      value={{
        publications,
        addPublication,
        editPublication,
        deletePublication,
        getPublication,
        loading,
        error,
      }}
    >
      {children}
    </PublicationContext.Provider>
  );
};