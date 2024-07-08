import React, { useEffect, useState } from 'react';
import pb from '../server/Connection';
import { toast, ToastContainer, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

interface Lodging {
  id: string;
  title: string;
  description: string;
  type: string;
  status: string;
  price: number;
  available: string;
  coexistenceRules: string;
  owner: string;
  location: string;
  extras: string[];
  image: string;
}

interface Location {
  id: string;
  name: string;
}

const MyAds: React.FC = () => {
  const [lodgings, setLodgings] = useState<Lodging[]>([]);
  const toastOptions: ToastOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  useEffect(() => {
    const fetchLodgings = async () => {
      try {
        const userId = pb.authStore.model?.id;
        if (!userId) throw new Error('User not authenticated');

        const records = await pb.collection('lodging').getFullList<Lodging>({
          filter: `owner='${userId}'`,
          sort: '-created',
        });
        setLodgings(records);
      } catch (error) {
        console.error('Error fetching lodgings:', error);
      }
    };

    fetchLodgings();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await pb.collection('lodging').delete(id);
      setLodgings((prevLodgings) => prevLodgings.filter((lodging) => lodging.id !== id));
      toast.success('Anuncio eliminado con éxito', {
        ...toastOptions,
        style: { backgroundColor: 'white', color: 'green' },
        progressStyle: { backgroundColor: 'green' }
      });
    } catch (error) {
      console.error('Error deleting lodging:', error);
      toast.error('Error al eliminar el anuncio', {
        ...toastOptions,
        style: { backgroundColor: 'white', color: 'red' },
        progressStyle: { backgroundColor: 'red' }
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Mis Anuncios</h2>
        <Link to="/publish" className="bg-custom-purple text-white px-4 py-2 rounded hover:bg-hover_colors">
          Crear Anuncio
        </Link>
      </div>
      {lodgings.map((lodging) => (
        <div key={lodging.id} className="bg-white p-4 rounded-lg shadow-md mb-4 flex items-center">
          <img
            src={pb.files.getUrl(lodging, lodging.image)}
            alt={lodging.title}
            className="w-20 h-20 object-cover rounded-md mr-4"
          />
          <div className="flex-1">
            <h3 className="font-bold text-custom-purple mb-2">{lodging.title}</h3>
            <p className="text-gray-600">Estado: {lodging.status}</p>
            <p className="text-gray-600">Precio: ${lodging.price}</p>
          </div>
          <button
            onClick={() => handleDelete(lodging.id)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Eliminar
          </button>
        </div>
      ))}
      <ToastContainer />
    </div>
  );
};

export default MyAds;



