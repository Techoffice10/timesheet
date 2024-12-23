import React, { useState } from 'react';
import { format } from 'date-fns';
import { useTimeClock } from '../hooks/useTimeClock';

export function TimeClock() {
  const { clockIn, clockOut, currentEntry, entries } = useTimeClock();
  const [notes, setNotes] = useState('');

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4">Time Clock</h1>
        
        <div className="flex items-center space-x-4 mb-6">
          {!currentEntry ? (
            <button
              onClick={() => clockIn(notes)}
              className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700"
            >
              Clock In
            </button>
          ) : (
            <button
              onClick={() => clockOut()}
              className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700"
            >
              Clock Out
            </button>
          )}
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add notes (optional)"
            className="flex-1 border rounded-md px-3 py-2"
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Recent Time Entries</h2>
          {entries.map((entry) => (
            <div key={entry.id} className="border rounded-md p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">
                    {format(new Date(entry.start_time), 'PPp')}
                    {entry.end_time && ` - ${format(new Date(entry.end_time), 'PPp')}`}
                  </p>
                  {entry.notes && <p className="text-sm text-gray-500">{entry.notes}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}