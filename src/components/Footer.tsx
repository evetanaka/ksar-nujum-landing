export default function Footer() {
  return (
    <footer className="bg-secondary text-white py-16">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <h3 className="font-serif text-2xl mb-4">KSAR NUJUM</h3>
            <p className="text-white/60 text-sm">
              Marrakech, Morocco
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Explore</h4>
            <ul className="space-y-2 text-white/60 text-sm">
              <li><a href="#vision" className="hover:text-white">The Vision</a></li>
              <li><a href="#residences" className="hover:text-white">Residences</a></li>
              <li><a href="#experience" className="hover:text-white">Experience</a></li>
              <li><a href="#longevity" className="hover:text-white">Longevity</a></li>
              <li><a href="#gallery" className="hover:text-white">Gallery</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Connect</h4>
            <ul className="space-y-2 text-white/60 text-sm">
              <li>+212 XXX XXX XXX</li>
              <li>sales@ksarnujum.com</li>
              <li><a href="#" className="hover:text-white">WhatsApp</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Legal</h4>
            <ul className="space-y-2 text-white/60 text-sm">
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Terms of Use</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-8 text-center text-white/40 text-sm">
          © 2026 Ksar Nujum. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
