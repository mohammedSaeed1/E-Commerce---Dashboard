import { useState } from "react"
import { Outlet, NavLink } from "react-router-dom"

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  

  const navItems = [
    {
      to: "/dashboard",
      label: "Dashboard",
      badge: null,
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
        </svg>
      ),
    },
    {
      to: "/dashboard/categories",
      label: "Categories",
      badge: "12",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      to: "/dashboard/subcategories",
      label: "SubCategories",
      badge: "12",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h10M4 18h6" />
        </svg>
      ),
    },
    {
      to: "/dashboard/orders",
      label: "Orders",
      badge: "12",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
    },
    {
      to: "/dashboard/products",
      label: "Products",
      badge: null,
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 3H8a2 2 0 00-2 2v2h12V5a2 2 0 00-2-2z" />
        </svg>
      ),
    },
    {
      to: "/dashboard/coupons",
      label: "Coupons",
      badge: "3",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      ),
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-[#1b262c]" style={{ fontFamily: "Segoe UI,sans-serif" }}>

      {/* NAVBAR */}
      <nav className="h-[60px] bg-[#0f4c75] border-b border-[rgba(50,130,184,0.25)] flex items-center justify-between px-4 md:px-5 sticky top-0 z-20">
        <div className="flex items-center gap-3">

          {/* Hamburger — mobile only */}
          <div
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-[34px] h-[34px] rounded-lg bg-[rgba(50,130,184,0.12)] border border-[rgba(50,130,184,0.2)] flex items-center justify-center cursor-pointer lg:hidden"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#bbe1fa" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>

          <div className="w-[34px] h-[34px] bg-[#3282b8] rounded-lg flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#bbe1fa" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
            </svg>
          </div>
          <span className="text-base font-bold text-[#bbe1fa] tracking-wide">Dashboard</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative w-[34px] h-[34px] rounded-lg bg-[rgba(50,130,184,0.12)] border border-[rgba(50,130,184,0.2)] flex items-center justify-center cursor-pointer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#bbe1fa" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-5-5.917V4a1 1 0 00-2 0v1.083A6 6 0 006 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 01-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-[5px] right-[5px] w-[7px] h-[7px] bg-[#3282b8] rounded-full border-[1.5px] border-[#0f4c75]"></span>
          </div>

          <div className="w-[34px] h-[34px] rounded-lg bg-[rgba(50,130,184,0.12)] border border-[rgba(50,130,184,0.2)] items-center justify-center cursor-pointer hidden sm:flex">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#bbe1fa" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </div>

          <div className="w-px h-6 bg-[rgba(50,130,184,0.2)] mx-1 hidden sm:block"></div>

          <div className="w-[34px] h-[34px] rounded-full bg-[#3282b8] border-2 border-[rgba(187,225,250,0.25)] flex items-center justify-center text-xs font-bold text-[#bbe1fa] cursor-pointer">
            JD
          </div>
          <div className="flex flex-col hidden sm:flex">
            <span className="text-[13px] font-semibold text-[#bbe1fa]">John Doe</span>
            <span className="text-[11px] text-[rgba(187,225,250,0.45)]">Administrator</span>
          </div>
        </div>
      </nav>

      <div className="flex flex-1 relative">

        {/* OVERLAY — mobile */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-[rgba(0,0,0,0.5)] z-10 lg:hidden"
          />
        )}

        {/* SIDEBAR */}
        <aside className={`
          fixed top-[60px] left-0 h-[calc(100vh-60px)] z-10
          w-[220px] bg-[#0f4c75] border-r border-[rgba(50,130,184,0.2)]
          px-2.5 py-4 flex flex-col gap-1 flex-shrink-0
          transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:sticky lg:top-[60px] lg:h-[calc(100vh-60px)]
        `}>

          <span className="text-[10px] font-bold tracking-[1.4px] uppercase text-[rgba(187,225,250,0.3)] px-2.5 pt-2 pb-1">
            Main Menu
          </span>

          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/dashboard"}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer transition-all ${
                  isActive
                    ? "bg-[rgba(50,130,184,0.2)] border border-[rgba(50,130,184,0.25)] [&>svg]:stroke-[#3282b8] [&>span:first-of-type]:text-[#bbe1fa]"
                    : "hover:bg-[rgba(50,130,184,0.12)] [&>svg]:stroke-[rgba(187,225,250,0.45)] [&>span:first-of-type]:text-[rgba(187,225,250,0.55)]"
                }`
              }
            >
              {item.icon}
              <span className="text-[13px] font-medium">{item.label}</span>
              {item.badge && (
                <span className="ml-auto bg-[#3282b8] text-[#bbe1fa] text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}

          <span className="text-[10px] font-bold tracking-[1.4px] uppercase text-[rgba(187,225,250,0.3)] px-2.5 pt-3 pb-1">
            Account
          </span>

          <NavLink
            to="/dashboard/profile"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer transition-all ${
                isActive
                  ? "bg-[rgba(50,130,184,0.2)] border border-[rgba(50,130,184,0.25)]"
                  : "hover:bg-[rgba(50,130,184,0.12)]"
              }`
            }
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(187,225,250,0.45)" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-[13px] font-medium text-[rgba(187,225,250,0.55)]">Profile</span>
          </NavLink>

          <div className="mt-auto pt-3 border-t border-[rgba(50,130,184,0.15)]">
            <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer hover:bg-[rgba(50,130,184,0.12)]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(187,225,250,0.35)" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="text-[13px] font-medium text-[rgba(187,225,250,0.4)]">Logout</span>
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 min-w-0 overflow-auto">
          <Outlet />
        </main>

      </div>
    </div>
  )
}