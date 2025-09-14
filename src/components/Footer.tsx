export default function Footer() {
  return (
    <footer className="py-10 px-6 border-t border-gray-800 text-center text-gray-400">
      <p>© {new Date().getFullYear()} YourBrand. All rights reserved.</p>
      <div className="mt-4 space-x-4">
        <a href="/about" className="hover:text-emerald-400">
          About
        </a>
        <a href="/pricing" className="hover:text-emerald-400">
          Pricing
        </a>
        <a href="/contact" className="hover:text-emerald-400">
          Contact
        </a>
        <a href="/privacy" className="hover:text-emerald-400">
          Privacy Policy
        </a>
      </div>
    </footer>
  );
}
