import React, { createContext, useState, useEffect } from 'react';
import { publicationService } from '../services/publicationService';

export const PublicationContext = createContext(null);


const initialPublications = [
    {
        id: 1,
        title: 'Provinsi Jawa Barat Dalam Angka 2025',
        releaseDate: '2025-02-28',
        description: 'Publikasi ini menyajikan data dan analisis mengenai Provinsi Jawa Barat selama tahun 2025...',
        coverUrl: 'https://jabar.bps.go.id/_next/image?url=https%3A%2F%2Fweb-api.bps.go.id%2Fcover.php%3Ff%3DGucNXSu4RS7j1BsophI%2BTmVFWjF1Wm0rR1hSZGRoSldJekp6Y3NxUTNXSXZoTzdaeERtUjRld2NtbElZbzZVN1FWL0pkc0tOR3hTYW5RbGRqNkZGeVhxNW1aOHFndWNYSVUzMkRYWnVyUytYcllzWXkwenJ4WFpqV1BYVlBEWTB2S3VCcTRmL3FUd1drWWx5&w=3840&q=75',
    },
    {
        id: 2,
        title: 'Kemiskinan Kabupaten/Kota di Provinsi Jawa Barat 2019-2024',
        releaseDate: '2025-02-28',
        description: 'Publikasi ini menyajikan data dan analisis mengenai kemiskinan di Provinsi Jawa Barat pada tahun 2019-2024...',
        coverUrl: 'https://jabar.bps.go.id/_next/image?url=https%3A%2F%2Fweb-api.bps.go.id%2Fcover.php%3Ff%3DCxUq3ImqvTzDsH2pxZeTfE83Y05NdmFRUml4NW14ekNoYWNqSVREMm8zU2hCMTNjc0JTL3kzNVJxakpDSm5XNmtMRTBhZjFQK09HM3A1a1BmMkpzQ24yTUNyL1A2R2xvaWdNQkM3WGtUdCtNN3dMdXJSd3B6WjVYd09UQzFIS25CVXpJRnJCbUdWNTNGR1Ir&w=3840&q=75',
    },
    {
        id: 3,
        title: 'Statistik Industri Manufaktur 2022 Provinsi Jawa Barat',
        releaseDate: '2025-02-28',
        description: 'Publikasi ini menyajikan data dan analisis mengenai industri manufaktur di Provinsi Jawa Barat pada tahun 2022...',
        coverUrl: 'https://jabar.bps.go.id/_next/image?url=https%3A%2F%2Fweb-api.bps.go.id%2Fcover.php%3Ff%3DdAu8zIL5eoI6EYug5QcL2zB0eDBsOXdqakdRcGFobk5yMElhTjF6RVU4RGRJOXdsOGhuWHNxRVFtM0E4TmxGT1FIbllsanA0THB3d2Q4UnkreXI1eG9BZ3cyK2lDSDE4RWo2MHM1Nm5RbEdGS1dWN05MdktibWZDeDRzOG82bEZHTnIzQ3UzNGtKUkhtazZw&w=3840&q=75',
    },
    {
        id: 4,
        title: 'Pekerja Formal dan Informal Provinsi Jawa Barat 2024',
        releaseDate: '2025-06-23',
        description: 'Publikasi ini memuat gambaran mengenai berbagai karakteristik dari pekerja formal dan informal di Jawa Barat kondisi Agustus 2024...',
        coverUrl: 'https://jabar.bps.go.id/_next/image?url=https%3A%2F%2Fweb-api.bps.go.id%2Fcover.php%3Ff%3DwoE6jSat45tpd6b8JT98OithdnR4NXpCaUgvSjNpOWV1cTFkQlNWS3JBMGNROFRQQU4wZDloMDY2WE5zall1KzdhY1NZNUphUlBmR1MyRGNpc0RGeWlKRFFQMkJUaW9NLzhPZzBxaER1ZlJwUnNqZGZCOUw5SS81Z0YrY3RxdUJEcHI4eVFqTUdUN0dsWVow&w=3840&q=75',
    },
    {
        id: 5,
        title: 'Indikator Ekonomi Provinsi Jawa Barat 2024',
        releaseDate: '2025-06-05',
        description: 'Publikasi ini memuat tabel-tabel statistik ekonomi yang dibutuhkan konsumen data untuk keperluan pengamatan dan analisis ekonomi...',
        coverUrl: 'https://jabar.bps.go.id/_next/image?url=https%3A%2F%2Fweb-api.bps.go.id%2Fcover.php%3Ff%3D%2FNdGIm0P4348qPST04Jw62g5dHpIWExHT3REeFFaZ0FSaDhwajFnU1E0V01FZnpXRTFzUlo4T3lsdTZEbXAva2FENmY0RUg5bVhZaW9GL0xOTkNySkdaWW5hcy9uN0w0ZG10eWhZWkpjUHRJTE1YbXB3SC8rdzZwRWFBSDBYTUhTeCt2WE80b2d0Z0ZOeUdC&w=3840&q=75',
    },
];

export const PublicationProvider = ({ children }) => {
    const [publications, setPublications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Ambil semua publikasi dari backend saat load pertama
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await publicationService.getPublications();
                setPublications(data);
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const addPublication = async (newPub) => {
        const savedPub = await publicationService.addPublication(newPub);
        setPublications(prev => [savedPub, ...prev]);
    };

    const editPublication = async (updatedPub) => {
        const saved = await publicationService.updatePublication(updatedPub.id, updatedPub);
        setPublications(prev =>
            prev.map(pub => pub.id === saved.id ? saved : pub)
        );
    };

    const deletePublication = async (id) => {
        await publicationService.deletePublication(id);
        setPublications(prev => prev.filter(pub => pub.id !== id));
    };

    return (
        <PublicationContext.Provider
            value={{
                publications,
                addPublication,
                editPublication,
                deletePublication,
                loading,
                error,
            }}
        >
            {children}
        </PublicationContext.Provider>
    );
};
