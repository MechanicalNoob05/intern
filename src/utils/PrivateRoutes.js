import { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoutes() {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      fetch(`${process.env.REACT_APP_BASE_URL}user/verify`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(data => {
          if (data.sucess) {
            setAuth(true);
          } else {
            setAuth(false);
          }
        })
        .catch(() => {
          setAuth(false);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setAuth(false);
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div className='flex justify-center items-center h-screen bg-black/20'>

      <img className="mx-auto h-60 w-auto rounded-full shadow" src="https://i.pinimg.com/564x/fa/d8/4c/fad84c0600f456c599953847ab1448a9.jpg" alt="Your Company" />
    </div>;
  }

  return (
    auth ? <Outlet /> : <Navigate to="/login" />
  );
}
