import { HingeLogo } from './HingeLogo';

export function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <HingeLogo height={24} />
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


