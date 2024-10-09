import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Spin } from 'antd';
import useAuthStore from '../stores/useAuthStore';

export default function AuthWrapper() {
  const { user, initialized, initialize } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    if (initialized && !user) {
      navigate('/auth');
    }
  }, [initialized, user, navigate]);

  if (!initialized) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Spin size="large" />
      </div>
    );
  }

  return <Outlet />;
}