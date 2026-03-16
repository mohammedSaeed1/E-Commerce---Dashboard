export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen bg-[#1b262c]" style={{fontFamily:'Segoe UI,sans-serif'}}>

      {/* NAVBAR */}
      <nav className="h-[60px] bg-[#0f4c75] border-b border-[rgba(50,130,184,0.25)] flex items-center justify-between px-5 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-[34px] h-[34px] bg-[#3282b8] rounded-lg flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#bbe1fa" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
              <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
            </svg>
          </div>
          <span className="text-base font-bold text-[#bbe1fa] tracking-wide">NexPanel</span>
          <div className="flex items-center gap-2 bg-[rgba(27,38,44,0.6)] border border-[rgba(50,130,184,0.2)] rounded-lg px-3 py-1.5 ml-4">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#bbe1fa" strokeWidth="2" className="opacity-45">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input type="text" placeholder="Search anything..." className="bg-transparent border-none outline-none text-[#bbe1fa] text-sm w-40 placeholder:text-[rgba(187,225,250,0.3)]" />
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="relative w-[34px] h-[34px] rounded-lg bg-[rgba(50,130,184,0.12)] border border-[rgba(50,130,184,0.2)] flex items-center justify-center cursor-pointer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#bbe1fa" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-5-5.917V4a1 1 0 00-2 0v1.083A6 6 0 006 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 01-6 0v-1m6 0H9"/>
            </svg>
            <span className="absolute top-[5px] right-[5px] w-[7px] h-[7px] bg-[#3282b8] rounded-full border-[1.5px] border-[#0f4c75]"></span>
          </div>
          <div className="w-[34px] h-[34px] rounded-lg bg-[rgba(50,130,184,0.12)] border border-[rgba(50,130,184,0.2)] flex items-center justify-center cursor-pointer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#bbe1fa" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><circle cx="12" cy="12" r="3"/>
            </svg>
          </div>
          <div className="w-px h-6 bg-[rgba(50,130,184,0.2)] mx-1"></div>
          <div className="w-[34px] h-[34px] rounded-full bg-[#3282b8] border-2 border-[rgba(187,225,250,0.25)] flex items-center justify-center text-xs font-bold text-[#bbe1fa] cursor-pointer">JD</div>
          <div className="flex flex-col">
            <span className="text-[13px] font-semibold text-[#bbe1fa]">John Doe</span>
            <span className="text-[11px] text-[rgba(187,225,250,0.45)]">Administrator</span>
          </div>
        </div>
      </nav>

      <div className="flex flex-1">

        {/* SIDEBAR */}
        <aside className="w-[220px] bg-[#0f4c75] border-r border-[rgba(50,130,184,0.2)] px-2.5 py-4 flex flex-col gap-1 flex-shrink-0">

          <span className="text-[10px] font-bold tracking-[1.4px] uppercase text-[rgba(187,225,250,0.3)] px-2.5 pt-2 pb-1">Main Menu</span>

          {/* Dashboard - Active */}
          <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer bg-[rgba(50,130,184,0.2)] border border-[rgba(50,130,184,0.25)]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3282b8" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
            <span className="text-[13px] font-medium text-[#bbe1fa]">Dashboard</span>
          </div>

          <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer hover:bg-[rgba(50,130,184,0.12)]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(187,225,250,0.45)" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
            <span className="text-[13px] font-medium text-[rgba(187,225,250,0.55)]">Orders</span>
            <span className="ml-auto bg-[#3282b8] text-[#bbe1fa] text-[10px] font-bold px-2 py-0.5 rounded-full">12</span>
          </div>

          <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer hover:bg-[rgba(50,130,184,0.12)]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(187,225,250,0.45)" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"/><path strokeLinecap="round" strokeLinejoin="round" d="M16 3H8a2 2 0 00-2 2v2h12V5a2 2 0 00-2-2z"/></svg>
            <span className="text-[13px] font-medium text-[rgba(187,225,250,0.55)]">Products</span>
          </div>

          <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer hover:bg-[rgba(50,130,184,0.12)]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(187,225,250,0.45)" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            <span className="text-[13px] font-medium text-[rgba(187,225,250,0.55)]">Customers</span>
          </div>

          <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer hover:bg-[rgba(50,130,184,0.12)]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(187,225,250,0.45)" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
            <span className="text-[13px] font-medium text-[rgba(187,225,250,0.55)]">Analytics</span>
          </div>

          <span className="text-[10px] font-bold tracking-[1.4px] uppercase text-[rgba(187,225,250,0.3)] px-2.5 pt-3 pb-1">Management</span>

          <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer hover:bg-[rgba(50,130,184,0.12)]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(187,225,250,0.45)" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>
            <span className="text-[13px] font-medium text-[rgba(187,225,250,0.55)]">Payments</span>
          </div>

          <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer hover:bg-[rgba(50,130,184,0.12)]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(187,225,250,0.45)" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/></svg>
            <span className="text-[13px] font-medium text-[rgba(187,225,250,0.55)]">Coupons</span>
            <span className="ml-auto bg-[#3282b8] text-[#bbe1fa] text-[10px] font-bold px-2 py-0.5 rounded-full">3</span>
          </div>

          <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer hover:bg-[rgba(50,130,184,0.12)]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(187,225,250,0.45)" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
            <span className="text-[13px] font-medium text-[rgba(187,225,250,0.55)]">Content</span>
          </div>

          <span className="text-[10px] font-bold tracking-[1.4px] uppercase text-[rgba(187,225,250,0.3)] px-2.5 pt-3 pb-1">Account</span>

          <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer hover:bg-[rgba(50,130,184,0.12)]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(187,225,250,0.45)" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
            <span className="text-[13px] font-medium text-[rgba(187,225,250,0.55)]">Profile</span>
          </div>

          <div className="mt-auto pt-3 border-t border-[rgba(50,130,184,0.15)]">
            <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer hover:bg-[rgba(50,130,184,0.12)]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(187,225,250,0.35)" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
              <span className="text-[13px] font-medium text-[rgba(187,225,250,0.4)]">Logout</span>
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 p-6 bg-[#1b262c] overflow-auto">

          {/* Page Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl font-bold text-[#bbe1fa]">Dashboard Overview</h1>
              <p className="text-[13px] text-[rgba(187,225,250,0.4)] mt-0.5">Welcome back, John — here's what's happening.</p>
            </div>
            <button className="flex items-center gap-2 bg-[#3282b8] border-none rounded-lg text-[#bbe1fa] text-[13px] font-semibold px-4 py-2.5 cursor-pointer">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#bbe1fa" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
              New Order
            </button>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-4 gap-3.5 mb-6">
            {[
              { icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>, val: "$48,295", label: "Total Revenue", badge: "+12.5%", up: true },
              { icon: <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>, val: "1,284", label: "Total Orders", badge: "+8.1%", up: true },
              { icon: <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>, val: "3,940", label: "Customers", badge: "-2.3%", up: false },
              { icon: <path strokeLinecap="round" strokeLinejoin="round" d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"/>, val: "862", label: "Products", badge: "+5.7%", up: true },
            ].map((s, i) => (
              <div key={i} className="bg-[#0f4c75] border border-[rgba(50,130,184,0.2)] rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-lg bg-[rgba(50,130,184,0.2)] flex items-center justify-center">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#3282b8" strokeWidth="2">{s.icon}</svg>
                  </div>
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${s.up ? "bg-[rgba(50,130,184,0.15)] text-[#3282b8]" : "bg-[rgba(27,38,44,0.8)] text-[rgba(187,225,250,0.4)]"}`}>{s.badge}</span>
                </div>
                <div className="text-[22px] font-bold text-[#bbe1fa]">{s.val}</div>
                <div className="text-[12px] text-[rgba(187,225,250,0.4)] mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Content Row */}
          <div className="grid grid-cols-[1.6fr_1fr] gap-4 mb-6">

            {/* Orders Table */}
            <div className="bg-[#0f4c75] border border-[rgba(50,130,184,0.2)] rounded-xl p-[18px]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-[#bbe1fa]">Recent Orders</span>
                <span className="text-xs text-[#3282b8] cursor-pointer">View all</span>
              </div>
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    {["Order","Customer","Amount","Status"].map(h => (
                      <th key={h} className="text-[11px] font-semibold tracking-[0.8px] uppercase text-[rgba(187,225,250,0.35)] pb-2.5 text-left">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id:"#ORD-0091", name:"Sarah Miller", amount:"$142.00", status:"Active" },
                    { id:"#ORD-0090", name:"James Wilson", amount:"$87.50", status:"Done" },
                    { id:"#ORD-0089", name:"Emily Chen", amount:"$310.00", status:"Pending" },
                    { id:"#ORD-0088", name:"Carlos Ruiz", amount:"$55.99", status:"Done" },
                    { id:"#ORD-0087", name:"Priya Nair", amount:"$220.00", status:"Active" },
                  ].map((o, i) => (
                    <tr key={i}>
                      <td className="text-[13px] font-medium text-[#bbe1fa] py-2.5 border-t border-[rgba(50,130,184,0.1)]">{o.id}</td>
                      <td className="text-[13px] text-[rgba(187,225,250,0.75)] py-2.5 border-t border-[rgba(50,130,184,0.1)]">{o.name}</td>
                      <td className="text-[13px] text-[rgba(187,225,250,0.75)] py-2.5 border-t border-[rgba(50,130,184,0.1)]">{o.amount}</td>
                      <td className="py-2.5 border-t border-[rgba(50,130,184,0.1)]">
                        <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                          o.status === "Active" ? "bg-[rgba(50,130,184,0.18)] text-[#3282b8]" :
                          o.status === "Done" ? "bg-[rgba(15,76,117,0.6)] text-[#bbe1fa]" :
                          "bg-[rgba(27,38,44,0.8)] text-[rgba(187,225,250,0.4)]"
                        }`}>{o.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Activity Feed */}
            <div className="bg-[#0f4c75] border border-[rgba(50,130,184,0.2)] rounded-xl p-[18px]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-[#bbe1fa]">Recent Activity</span>
                <span className="text-xs text-[#3282b8] cursor-pointer">Clear all</span>
              </div>
              {[
                { dot:"bg-[#3282b8]", text: <><strong className="text-[#bbe1fa] font-semibold">New order</strong> placed by Sarah Miller</>, time:"2 min ago" },
                { dot:"bg-[#bbe1fa]", text: <><strong className="text-[#bbe1fa] font-semibold">Payment</strong> received for #ORD-0090</>, time:"18 min ago" },
                { dot:"bg-[rgba(50,130,184,0.4)]", text: <><strong className="text-[#bbe1fa] font-semibold">Product</strong> stock updated — Blue Hoodie</>, time:"1 hr ago" },
                { dot:"bg-[#3282b8]", text: <><strong className="text-[#bbe1fa] font-semibold">New customer</strong> registered — Priya Nair</>, time:"3 hr ago" },
                { dot:"bg-[rgba(50,130,184,0.4)]", text: <><strong className="text-[#bbe1fa] font-semibold">Coupon</strong> SAVE20 reached usage limit</>, time:"5 hr ago" },
              ].map((a, i) => (
                <div key={i} className={`flex items-start gap-2.5 py-2.5 ${i !== 0 ? "border-t border-[rgba(50,130,184,0.1)]" : ""}`}>
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 mt-1 ${a.dot}`}></span>
                  <div>
                    <p className="text-[13px] text-[rgba(187,225,250,0.65)] leading-snug">{a.text}</p>
                    <p className="text-[11px] text-[rgba(187,225,250,0.3)] mt-0.5">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>, title:"Conversion Rate", val:"3.6%", label:"of visits convert", pct:36, from:"0%", to:"Target 5%" },
              { icon: <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>, title:"Avg. Order Value", val:"$37.62", label:"per transaction", pct:62, from:"$0", to:"Goal $60" },
              { icon: <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>, title:"Return Rate", val:"1.8%", label:"of orders returned", pct:18, from:"0%", to:"Max 5%" },
            ].map((m, i) => (
              <div key={i} className="bg-[#0f4c75] border border-[rgba(50,130,184,0.2)] rounded-xl p-[18px]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-bold text-[#bbe1fa]">{m.title}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[rgba(50,130,184,0.15)] border border-[rgba(50,130,184,0.2)] flex items-center justify-center flex-shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3282b8" strokeWidth="2">{m.icon}</svg>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-[#bbe1fa]">{m.val}</div>
                    <div className="text-[12px] text-[rgba(187,225,250,0.4)]">{m.label}</div>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="h-[5px] bg-[rgba(27,38,44,0.8)] rounded-full overflow-hidden">
                    <div className="h-full bg-[#3282b8] rounded-full" style={{width:`${m.pct}%`}}></div>
                  </div>
                  <div className="flex justify-between text-[11px] text-[rgba(187,225,250,0.35)] mt-1">
                    <span>{m.from}</span><span>{m.to}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </main>
      </div>
    </div>
  )
}