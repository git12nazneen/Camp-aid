import bfImg from "../assets/bg-1.png";
import patient from "../assets/patient/4.jpg";
import patient1 from "../assets/patient/5.jpg";
import patient2 from "../assets/patient/6.jpg";
const Facility = () => {
  return (
    <div className="mb-16 ">
      <div className="hero " style={{ backgroundImage: `url(${bfImg})` }}>
        <div className="hero-overlay bg-[#bae6fd] bg-opacity-80 "></div>

        <div className="max-w-6xl mx-auto">
          <div className="pt-10">
            <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl dark:text-white">
              explore and
              <br /> See <span className="text-blue-500">What we do?</span>
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 -pb-20 pt-20">
            <div class="w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
              <img
                class="object-cover object-center w-full h-56"
                src={patient}
                alt="avatar"
              />

              <div class="flex items-center px-6 py-3 bg-gray-900">
                <h1 class="mx-3 text-lg font-semibold text-white">
                  Doctors conversation
                </h1>
              </div>

              <div class="px-6 py-4 -mb-44" >
                <h1 class="text-xl font-semibold text-gray-800 dark:text-white">
                  Neurology
                </h1>

                <p class="py-2 text-gray-700 dark:text-gray-400">
                  There are many variants patients here, All are take there
                  services and give a poor money to the doctors , so that many
                  people help this found because of their satisfaction.
                </p>
              </div>
            </div>
            <div class="w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
              <img
                class="object-cover object-center w-full h-56"
                src={patient1}
                alt="avatar"
              />

              <div class="flex items-center px-6 py-3 bg-gray-900">
                <h1 class="mx-3 text-lg font-semibold text-white">
                  Doctors conversation
                </h1>
              </div>

              <div class="px-6 py-4">
                <h1 class="text-xl font-semibold text-gray-800 dark:text-white">
                  Endriocionology
                </h1>

                <p class="py-2 text-gray-700 dark:text-gray-400">
                  There are many variants patients here, All are take there
                  services and give a poor money to the doctors , so that many
                  people help this found because of their satisfaction.
                </p>
              </div>
            </div>
            <div class="w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
              <img
                class="object-cover object-center w-full h-56"
                src={patient2}
                alt="avatar"
              />

              <div class="flex items-center px-6 py-3 bg-gray-900">
                <h1 class="mx-3 text-lg font-semibold text-white">
                  Doctors conversation
                </h1>
              </div>

              <div class="px-6 py-4">
                <h1 class="text-xl font-semibold text-gray-800 dark:text-white">
                  Cardiology
                </h1>

                <p class="py-2 text-gray-700 dark:text-gray-400">
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
