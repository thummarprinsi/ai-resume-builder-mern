import Footer from "../components/layout/Footer"
import Navbar from "../components/layout/Navbar"


const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {children}
      </main>
      
      <Footer />
    </div>
  )
}

export default MainLayout