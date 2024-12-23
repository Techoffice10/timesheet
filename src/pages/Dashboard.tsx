import React from 'react';
import { useAuthStore } from '../stores/authStore';

export function Dashboard() {
  const { user } = useAuthStore();

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4">Welcome back, {user?.full_name}!</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-900">Today's Schedule</h3>
            <p className="text-blue-700">No shifts scheduled</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-900">Active Tasks</h3>
            <p className="text-green-700">No pending tasks</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-semibold text-purple-900">Time Tracked Today</h3>
            <p className="text-purple-700">0 hours</p>
          </div>
        </div>
      </div>
    </div>
  );
}