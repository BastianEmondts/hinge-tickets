import { Ticket } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-zinc-900 border-t border-zinc-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Ticket className="w-5 h-5 text-amber-400" />
            <span className="text-white font-bold">the <span className="text-amber-400">hinge</span> tickets</span>
          </div>
          <p className="text-zinc-500 text-sm text-center">
            &copy; {new Date().getFullYear()} The Hinge. All rights reserved. For demonstration purposes only.
          </p>
          <div className="flex gap-4 text-zinc-500 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
