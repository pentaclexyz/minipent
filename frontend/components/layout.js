import Nav from "./nav";
import Footer from "./footer";

const Layout = ({children}) => {
  return (
    <>
      <Nav/>
      <main className="mx-auto max-w-7xl p-4 md:px-6 lg:px-8">
        {children}
      </main>
      <Footer/>
    </>
  );
};

export default Layout;
