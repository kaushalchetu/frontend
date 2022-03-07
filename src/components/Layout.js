import Footer from './Admin/Footer';
import Sidebar from './Admin/Sidebar';
import Header from './Admin/Header';

//Files to include seperate header, footer and sidebar code
function Layout({ children }) {
  return (
    <div className="wrapper">
      <Header />
      <Sidebar />
      {children}
      <Footer />
    </div>
  );
}

export default Layout;
