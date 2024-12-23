import React from 'react';
import { useAuthStore } from '../../stores/authStore';

export function Header() {
  const { user, signOut } = useAuthStore();

  return (
    <header className="bg-white shadow">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex items-center">
            <h2 className="text-2xl font-bold text-gray-900">TeamConnect</h2>
          </div>
          <div className="flex items-center">
            {user && (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">{user.full_name}</span>
                <button
                  onClick={() => signOut()}
                  className="rounded-md bg-gray-800 px-3 py-2 text-sm font-medium text-white hover:bg-gray-700"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}