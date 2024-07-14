import bfImg from "../assets/bg-1.png";
import patient from "../assets/patient/4.jpg";
import patient1 from "../assets/patient/5.jpg";
import patient2 from "../assets/patient/6.jpg";
import { IoPeopleSharp } from "react-icons/io5";
const Facility = () => {
  return (
    <div className="mb-60 ">
      <div className="hero " style={{ backgroundImage: `url(${bfImg})` }}>
        <div className="hero-overlay bg-[#bae6fd] bg-opacity-80 "></div>

        <div className="max-w-6xl mx-auto">
          <div className="pt-14">
            <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl dark:text-white">
                Our services
              <br /> What <span className="text-blue-500">Facilities we provide?</span>
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 -pb-20 pt-20 -mb-56">
            <div class="w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
              <div className="relative">
                <img
                  class="object-cover object-center w-full h-56 "
                  src={patient}
                  alt="avatar"
                />
                <div class="flex items-center mx-6 py-3 bg-[#3b8cf9]  w-20 absolute bottom-0">
                  <h1 class=" mx-auto text-5xl  font-medium text-white">
                    <IoPeopleSharp />
                  </h1>
                </div>
              </div>

              <div class="px-6 py-10 ">
                <h1 class="text-xl font-normal text-gray-800 dark:text-white">
                  Neurology
                </h1>

                <p class="py-2 font-light text-gray-700 dark:text-gray-400">
                  There are many variants patients here, All are take there
                  services and give a poor money to the doctors , so that many
                  people help this found because of their satisfaction.
                </p>
              </div>
            </div>
            <div class="w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
              <div className="relative">
                <img
                  class="object-cover object-center w-full h-56 "
                  src={patient2}
                  alt="avatar"
                />
                <div class="flex items-center mx-6 py-3 bg-[#3b8cf9]  w-20 absolute bottom-0">
                  <h1 class=" mx-auto text-5xl  font-medium text-white">
                    <IoPeopleSharp />
                  </h1>
                </div>
              </div>

              <div class="px-6 py-10 ">
                <h1 class="text-xl font-normal text-gray-800 dark:text-white">
                  Neurology
                </h1>

                <p class="py-2 font-light text-gray-700 dark:text-gray-400">
                  There are many variants patients here, All are take there
                  services and give a poor money to the doctors , so that many
                  people help this found because of their satisfaction.
                </p>
              </div>
            </div>
            <div class="w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
              <div className="relative">
                <img
                  class="object-cover object-center w-full h-56 "
                  src={patient1}
                  alt="avatar"
                />
                <div class="flex items-center mx-6 py-3 bg-[#3b8cf9]  w-20 absolute bottom-0">
                  <h1 class=" mx-auto text-5xl  font-medium text-white">
                    <IoPeopleSharp />
                  </h1>
                </div>
              </div>
              <div class="px-6 py-10">
                <h1 class="text-xl font-normal text-gray-800 dark:text-white">
                  Neurology
                </h1>

                <p class="py-2 font-light text-gray-700 dark:text-gray-400">
                  There are many variants patients here, All are take there
                  services and give a poor money to the doctors , so that many
                  people help this found because of their satisfaction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Facility;
