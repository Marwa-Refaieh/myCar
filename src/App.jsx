import './App.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Home from './pages/home/Home'
import { SidebarProvider } from './context/SidebarContext'
import Sidebar from './components/Sidebar'
import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom'
import Favorite from './pages/favorite/favorite'
import Profile from './pages/profile/profile'
import Setting from './pages/setting/setting'
import Signin from './pages/signin/signin'
import Vercode from './pages/verCode/verCode'
import Signin2 from './pages/signin2/signin2'
import CarDetails from './pages/carDetails/CarDetails' 
import { useEffect } from 'react'
import Filters from './pages/filters/Filters'
import PopularCategories from './pages/popularCategories/PopularCategories'
import Cars from './pages/cars/Cars'
import NewArrival from './pages/newArrival/NewArrival'
import SellerProfile from './pages/sellerProfile/SellerProfile'
import Brand from './pages/brand/Brand'
import SearchResultsPage from './pages/search/SearchResults'
import ComplaintDetails from './components/setting/complaintDatials'
import EditProfile from './pages/editProfile/editProfile'
import CreateCarPage from './pages/CreateCar/createCar'
import '../src/i18/index.js';
import BestSeller from './pages/bestSeller/BestSeller'
import CompleteInfo from './pages/complete-info/completeInfo'
import UpdateCar from './pages/updateCar/updateCar'
import AboutUs from './pages/AboutUs/AboutUs'
import Services from './pages/Services/Services'
import ContactUs from './pages/ContactUs/ContactUs'

function App() {
  // useEffect(() => {
  //   localStorage.clear();
  // }, []);
  const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  };

  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>

          <Route element={
            <SidebarProvider>
              <Navbar />
              <Sidebar />
              <Outlet />
              {/* <Footer /> */}
            </SidebarProvider>
          }>
            <Route path='/' element={<Home />} />
            <Route path='/favorite' element={<Favorite />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/sellerProfile/:id' element={<SellerProfile />} />
            <Route path='/setting' element={<Setting />} />
            <Route path='/filters' element={<Filters />} />
            <Route path='/brand/:id' element={<Brand />} />
            <Route path='/popular' element={<PopularCategories />} />
            <Route path='/new' element={<NewArrival />} />
            <Route path='/best' element={<BestSeller />} />
            <Route path='/cars' element={<Cars />} />
            <Route path='/details/:id' element={<CarDetails />} />
            <Route path='/search' element={<SearchResultsPage />} />
            <Route path='/complaint/:id' element={<ComplaintDetails />} />
            <Route path='/editprofile' element={<EditProfile />} />
            <Route path='/create' element={<CreateCarPage />} />
            <Route path='/updatecar/:id' element={<UpdateCar />} />
            <Route path='/aboutUs' element={<AboutUs/>}/>
            <Route path='/services' element={<Services/>}/>
            <Route path='/contactUs' element={<ContactUs/>}/>
          </Route> 


          <Route path='/signin' element={<Signin />} />
          <Route path='/completeinfo' element={<CompleteInfo />} />
          <Route path='/signin2' element={<Signin2 />} />
          <Route path='/code' element={<Vercode />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
