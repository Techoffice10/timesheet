import React from 'react';
import { format } from 'date-fns';
import { Schedule } from '../types';
import { useSchedules } from '../hooks/useSchedules';

export function SchedulePage() {
  const { schedules, loading } = useSchedules();

  if (loading) {
    return <div>Loading schedules...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Schedule</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Add Shift
        </button>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="divide-y divide-gray-200">
          {schedules.map((schedule: Schedule) => (
            <div key={schedule.id} className="p-4 hover:bg-gray-50">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{schedule.title}</h3>
                  <p className="text-sm text-gray-500">
                    {format(new Date(schedule.start_time), 'PPp')} - 
                    {format(new Date(schedule.end_time), 'PPp')}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}