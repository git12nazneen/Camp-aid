import { Swiper, SwiperSlide } from 'swiper/react';
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import '../HomePage/banner.css'
// import required modules
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

// img
import banner1 from '../assets/banner1.jpg'
import banner2 from '../assets/banner2.jpg'
import banner3 from '../assets/banner3.jpg'
import banner4 from '../assets/banner4.jpg'


const Banner = () => {
    return (
        <>
          <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
            <SwiperSlide>
                <div className="slide-container overflow-x-hidden">
                    <img src={banner1} alt="Banner 1" />
                    <div className="overlay">
                        <div  className="max-w-md text-white ">
                       
                          <p className="mb-5">Our medical camps have changed lives. Join us as we celebrate the milestones and impactful moments from our journey.</p>
                         
                             <AwesomeButton type="primary">Get Started</AwesomeButton>
                        </div>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="slide-container">
                    <img src={banner2} alt="Banner 2" />
                    <div className="overlay">
                    <div  className="max-w-md text-white">
                       
                       <p className="mb-5">Experience the transformative impact of our healthcare initiatives through the inspiring stories of those we’ve helped. </p>
                       
                       <AwesomeButton type="primary">Get Started</AwesomeButton>
                     </div>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="slide-container">
                    <img src={banner3} alt="Banner 3" />
                    <div className="overlay">
                    <div  className="max-w-md text-white">
                       
                       <p className="mb-5"> Discover the success stories of our medical camps and see the smiles we’ve brought to countless faces.</p>
                     
                          <AwesomeButton type="primary">Get Started</AwesomeButton>
                     </div>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="slide-container">
                    <img src={banner4} alt="Banner 4" />
                    <div className="overlay">
                    <div  className="max-w-md text-white">
                       
                       <p className="mb-5">Industrial parks are areas zoned and developed specifically for industrial activities.</p>
                       <a href="#_" class="relative px-5 py-3 overflow-hidden font-medium text-gray-600 bg-gray-100 border border-gray-100 rounded-lg shadow-inner group">
                       <span class="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
                       <span class="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
                       <span class="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
                       <span class="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
                       <span class="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
                       <AwesomeButton type="primary">Get Started</AwesomeButton>;
                       </a>
                     </div>
                    </div>
                </div>
            </SwiperSlide>
        </Swiper>
        </>
      );
};
export default Banner;