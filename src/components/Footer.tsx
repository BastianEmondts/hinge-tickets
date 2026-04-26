export function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-baseline gap-1">
            <span className="text-white font-semibold text-xs tracking-[0.2em] uppercase">THE</span>
            <span
              className="font-black text-xl italic"
              style={{
                background: 'linear-gradient(to right, #E8196C, #FF5214)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              hinge
            </span>
            <span className="text-white/50 font-medium text-xs tracking-widest uppercase ml-1">tickets</span>
          </div>
          <p className="text-zinc-500 text-sm text-center">
            &copy; {new Date().getFullYear()} The Hinge. Alle Rechte vorbehalten. Nur zu Demonstrationszwecken.
          </p>
          <div className="flex gap-4 text-zinc-500 text-sm">
            <a href="#" className="hover:text-white transition-colors">Datenschutz</a>
            <a href="#" className="hover:text-white transition-colors">AGB</a>
            <a href="#" className="hover:text-white transition-colors">Kontakt</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

