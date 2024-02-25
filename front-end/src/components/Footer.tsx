export const Footer = () => {
  const currenYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p className="footer-text">Copyright {currenYear} Argent Bank</p>
    </footer>
  );
};
