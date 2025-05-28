import React from 'react';

function PlanCard({ day, activities }) {
  return (
    <div className="bg-white shadow rounded-lg p-4 mb-6">
      <h2 className="text-xl font-bold mb-2">Day {day}</h2>
      <ul className="space-y-2">
        {activities.map((act, idx) => (
          <li key={idx} className="border-b pb-2">
            <span className="font-semibold text-blue-600">{act.time}</span>: {act.placeName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PlanCard;