import React from "react";
import { ActionCard } from "./components";
import { actionCards } from "./data";


export default function MePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Account</h1>
          <p className="text-gray-600">
            Manage your profile, view your dashboard, and more
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {actionCards.map((card, index) => (
            <ActionCard key={index} {...card} />
          ))}
        </div>
      </div>
    </div>
  );
}
