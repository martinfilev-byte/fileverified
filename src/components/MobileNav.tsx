{/* ГЛАВЕН КОНТЕЙНЕР С ПРОЗРАЧНОСТ И BLUR */}
      <div
        style={{ 
          position: 'fixed', 
          inset: 0, 
          zIndex: 9999, 
          // 0.95 е 95% плътност - почти не прозира, но пропуска светлина
          backgroundColor: 'rgba(255, 255, 255, 0.95)', 
          backdropFilter: 'blur(10px)', // Това прави ефекта "заскрежено стъкло"
          WebkitBackdropFilter: 'blur(10px)', // За поддръжка от iPhone (Safari)
          visibility: isOpen ? 'visible' : 'hidden',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease-in-out, visibility 0.3s'
        }}
      >
        {/* Махни bg-white от този вътрешен div, за да работи прозрачността отгоре */}
        <div className="flex flex-col h-full w-full">
          
          {/* Header вътре в менюто - нека той остане плътен за яснота */}
          <div className="flex items-center justify-between px-6 h-20 border-b border-slate-100">
            <span className="font-bold text-lg tracking-tight text-slate-900">МЕНЮ</span>
            <button onClick={() => setIsOpen(false)} className="p-2 bg-white shadow-sm rounded-full border border-slate-100">
              <X className="h-6 w-6 text-slate-900" />
            </button>
          </div>

          {/* Навигация */}
          <nav className="flex flex-col p-8 gap-1">
            {[
              { name: "НАЧАЛО", href: "/" },
              { name: "ПРОВЕРКА", href: "/services" },
              { name: "ДИАГНОСТИКА", href: "/diagnostics" },
              { name: "TPMS", href: "/tpms" },
              { name: "FAQ", href: "/faq" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`py-5 text-xl font-bold border-b border-slate-50/50 transition-colors ${
                  pathname === item.href ? "text-emerald-600" : "text-slate-900"
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            <Link 
              href="/book" 
              className="mt-10 w-full text-center rounded-xl bg-emerald-600 py-5 text-lg font-black text-white shadow-xl active:scale-95 transition-all"
            >
              ЗАПАЗИ ОГЛЕД
            </Link>
          </nav>
        </div>
      </div>