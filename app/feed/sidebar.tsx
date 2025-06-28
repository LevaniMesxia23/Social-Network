"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Users, X } from "lucide-react";
import UserCard from "./UserCard";

export function CollapsibleUserSidebar({
  users,
  currentUserEmail,
}: CollapsibleUserSidebarProps) {
  const [isOpen, setIsOpen] = useState(false); 
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  if (isMobile && isOpen) {
    return (
      <>
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        />

        <div className="fixed left-0 top-0 h-full w-80 bg-white z-50 transform transition-transform duration-300 ease-in-out md:hidden">
          <div className="flex items-center justify-between p-4 border-b border-slate-200">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-slate-600" />
              <h2 className="text-lg font-semibold text-slate-900">
                Community
              </h2>
            </div>
            <button
              onClick={toggleSidebar}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5 text-slate-600" />
            </button>
          </div>

          <div className="h-full overflow-y-auto pb-20">
            <div className="p-4">
              <p className="text-sm text-slate-600 mb-4">
                {users.length} active{" "}
                {users.length === 1 ? "member" : "members"}
              </p>

              <div className="space-y-3">
                {users.map((user) => (
                  <UserCard
                    key={user.id}
                    user={user}
                    currentUserEmail={currentUserEmail}
                  />
                ))}
              </div>

              {users.length === 0 && (
                <div className="text-center py-8">
                  <div className="w-12 h-12 mx-auto mb-3 bg-slate-100 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-slate-400" />
                  </div>
                  <p className="text-sm text-slate-500">No members found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div
      className={`relative bg-white border-r border-slate-200 transition-all duration-300 ease-in-out hidden md:block ${
        isOpen ? "w-80" : "w-16"
      }`}
    >
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-6 z-10 bg-white border border-slate-200 rounded-full p-1.5 shadow-sm hover:shadow-md transition-shadow duration-200"
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isOpen ? (
          <ChevronLeft className="w-4 h-4 text-slate-600" />
        ) : (
          <ChevronRight className="w-4 h-4 text-slate-600" />
        )}
      </button>

      <div className="h-screen overflow-y-auto">
        {isOpen ? (
          <div className="p-6">
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-2">
                <Users className="w-5 h-5 text-slate-600" />
                <h2 className="text-xl font-semibold text-slate-900">
                  Community
                </h2>
              </div>
              <p className="text-sm text-slate-600">
                {users.length} active{" "}
                {users.length === 1 ? "member" : "members"}
              </p>
            </div>

            <div className="space-y-3">
              {users.map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                  currentUserEmail={currentUserEmail}
                />
              ))}
            </div>

            {users.length === 0 && (
              <div className="text-center py-8">
                <div className="w-12 h-12 mx-auto mb-3 bg-slate-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-slate-400" />
                </div>
                <p className="text-sm text-slate-500">No members found</p>
              </div>
            )}
          </div>
        ) : (
          <div className="p-3 pt-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="p-2 bg-slate-100 rounded-lg">
                <Users className="w-6 h-6 text-slate-600" />
              </div>

              <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                {users.length}
              </div>

              <div className="flex flex-col space-y-2">
                {users.slice(0, 4).map((user) => (
                  <div
                    key={user.id}
                    className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0"
                    title={user.name || user.email}
                  >
                    <span className="text-white font-semibold text-xs">
                      {user.name?.charAt(0).toUpperCase() ||
                        user.email?.charAt(0).toUpperCase() ||
                        "U"}
                    </span>
                  </div>
                ))}
                {users.length > 4 && (
                  <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
                    <span className="text-slate-600 font-semibold text-xs">
                      +{users.length - 4}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function MobileSidebarTrigger({
  users,
  currentUserEmail,
}: CollapsibleUserSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-30 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 md:hidden"
        aria-label="Open community sidebar"
      >
        <Users className="w-6 h-6" />
        {users.length > 0 && (
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
            {users.length > 99 ? "99+" : users.length}
          </div>
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />

          <div className="fixed left-0 top-0 h-full w-80 bg-white z-50 transform transition-transform duration-300 ease-in-out md:hidden">
            <div className="flex items-center justify-between p-4 border-b border-slate-200">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-slate-600" />
                <h2 className="text-lg font-semibold text-slate-900">
                  Community
                </h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                aria-label="Close sidebar"
              >
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            <div className="h-full overflow-y-auto pb-20">
              <div className="p-4">
                <p className="text-sm text-slate-600 mb-4">
                  {users.length} active{" "}
                  {users.length === 1 ? "member" : "members"}
                </p>

                <div className="space-y-3">
                  {users.map((user) => (
                    <UserCard
                      key={user.id}
                      user={user}
                      currentUserEmail={currentUserEmail}
                    />
                  ))}
                </div>

                {users.length === 0 && (
                  <div className="text-center py-8">
                    <div className="w-12 h-12 mx-auto mb-3 bg-slate-100 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-slate-400" />
                    </div>
                    <p className="text-sm text-slate-500">No members found</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
