import { Navigate, Route, Routes } from "react-router-dom"
import HomePage from "./Pages/Home/HomePage"
import LoginPage from "./Pages/LoginPage"
import SignupPage from "./Pages/SignupPage"
import Footer from "./components/footer"
import { Toaster } from "react-hot-toast"
import { useAuthStore } from "./store/authUser.js"
import { useEffect } from "react"
import { Loader } from "lucide-react"
import WatchPage from "./Pages/WatchPage.jsx"
import SearchPage from "./Pages/SearchPage.jsx"
import SearchHistoryPage from "./Pages/HistoryPage.jsx"
import NotFound from "./Pages/404.jsx"

function App() {
  const { user, authCheck, isCheckingAuth } = useAuthStore()

	useEffect(() => {
		authCheck();
	}, [authCheck]);

  if(isCheckingAuth){
    return(
      <div className="h-screen">
        <div className="flex items-center justify-center bg-black h-full">
          <Loader className="animate-spin text-red-600 size-12" />
        </div>
      </div>
    )
  }
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={!user? <LoginPage /> : <Navigate to={'/'} />} />
      <Route path="/signup" element={!user? <SignupPage /> : <Navigate to={'/'} />} />
      <Route path="/watch/:id" element={user? <WatchPage /> : <Navigate to={'/login'} />} />
      <Route path="/search" element={user? <SearchPage /> : <Navigate to={'/login'} />} />
      <Route path="/history" element={user? <SearchHistoryPage /> : <Navigate to={'/login'} />} />

      <Route path='/*' element={<NotFound />} />
    </Routes>
    <Footer />

    <Toaster />
    </>
    
  )
}

export default App
