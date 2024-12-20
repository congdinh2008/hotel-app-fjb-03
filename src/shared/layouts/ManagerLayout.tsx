import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const ManagerLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 flex">
                <Sidebar />
                <div className="main-content p-4 w-full">
                    {children}
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default ManagerLayout;