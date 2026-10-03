import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-main">
          {/* Sobre Trimly */}
          <div className="footer-column footer-about">
            <h3>Trimly</h3>

            <p>Encontrá tu próximo turno de forma simple, rápida y segura.</p>
          </div>

          {/* Legal */}
          <div className="footer-column">
            <h4>Legal</h4>

            <nav className="footer-links">
              <a href="#">Política de privacidad</a>
              <a href="#">Términos de servicio</a>
              <a href="#">Términos de uso</a>
              <a href="#">Cookies</a>
            </nav>
          </div>

          {/* Para negocios */}
          <div className="footer-column">
            <h4>Para negocios</h4>

            <nav className="footer-links">
              <a href="#">Registrá tu negocio</a>
              <a href="#">Iniciar sesión</a>
              <a href="#">Sobre Trimly para negocios</a>
              <a href="#">Ayuda</a>
            </nav>
          </div>

          {/* Redes sociales */}
          <div className="footer-column">
            <h4>Seguinos</h4>

            <div className="footer-social">
              <a href="#" aria-label="Instagram">
                <i className="bi bi-instagram"></i>
              </a>

              <a href="#" aria-label="Facebook">
                <i className="bi bi-facebook"></i>
              </a>

              <a href="#" aria-label="TikTok">
                <i className="bi bi-tiktok"></i>
              </a>

              <a href="#" aria-label="LinkedIn">
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Línea inferior */}
        <div className="footer-bottom">
          <p>© 2026 Trimly. Todos los derechos reservados.</p>

          <span>Hecho para simplificar tus turnos.</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
