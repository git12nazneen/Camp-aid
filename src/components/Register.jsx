import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaFacebook, FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import swal from "sweetalert";
import { getAuth } from "firebase/auth";
import { app } from "../../firebase.config";


import useAuth from "../hook/useAuth";
import PageTitle from "./PageTitle";


const Register = () => {

  // const {createUser,  updateUserProfile} = useContext(AuthContext)
  const {createUser,  updateUserProfile}= useAuth()
  const auth = getAuth(app);
  const [showPassword, setShowpassword] = useState(false);
  const [ success , setSuccess ] = useState('')
  const [loading, setLoading] = useState(true)
  const location = useLocation();
  const navigate = useNavigate();
  console.log('location in login', location)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const {email, password ,image, name} = data;
        setLoading(true);
        if(password.length < 6){
            swal({
                text: "Length must be at least 6 character",
                icon: "error"
              });
            return;
        }
        if(!/[A-Z]/.test(password)){
          
            swal({
                text: "Your password should have one uppercase character",
                icon: "error"
              });
            return;
        }
        if(!/[a-z]/.test(password)){
            

            swal({
                text: "Your password should have one lowercase character",
                icon: "error"
              });
            return;
        }
        // create user and update profile
        createUser(email, password, image, name)
        .then(result =>{
            updateUserProfile(name, image)
            .then( ()=>{
                if(result.user){
                    swal({
                        text: "Success fully login",
                        icon: "success"
                      });
                    navigate(location?.state ? location.state : '/');
                }
            })
			
		})
        .catch(error => {
            swal({
                text: "Sign in failed!",
                icon: "error"
              });
            console.error('Sign in error:', error);
          })
          
            // reset error and success
            setSuccess('');
            // setError('');
    }
    
  return (
    <div className="max-w-6xl mx-auto  my-20">
       <PageTitle title='Register'></PageTitle>
      <section className="bg-white dark:bg-gray-900">
        <div className="flex justify-center">
          <div
            className="hidden bg-cover lg:block lg:w-2/5"
            style={{
              backgroundImage:
                "url('https://images.pexels.com/photos/57690/pexels-photo-57690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
            }}
          ></div>

          <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
            <div className="w-full">
              <h1 className="text-2xl font-semibold tracking-wider text-gray-800 capitalize dark:text-white">
                Get your free account now.
              </h1>

              <p className="mt-4 text-gray-500 dark:text-gray-400">
                Let’s get you all set up so you can verify your personal account
                and begin setting up your profile.
              </p>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2"
              >
                <div>
                  <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="John"
                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    {...register("name", { required: true })}
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                    Email address
                  </label>
                  <input
                    type="email"
                    placeholder="johnsnow@example.com"
                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    {...register("email", { required: true })}
                  />
                </div>

                <div className="relative mb-3">
                  <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    {...register("password", { required: true })}
                  />
                   <span
                    className="absolute top-3 right-2"
                    // onClick={() => setShowpassword(!showPassword)}
                  >
                    {/* {showPassword ? <IoEyeOutline /> : <FaRegEyeSlash />} */}
                  </span>
                </div>

                <div>
                  <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                    Photo url
                  </label>
                  <input
                    type="text"
                    placeholder="Photo url"
                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    {...register("photo", { required: true })}
                  />
                </div>

                <button className="flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-black capitalize transition-colors duration-300 transform bg-blue-400 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                  <span>Register </span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 rtl:-scale-x-100"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <br />
                <p className="text-center my-4 text-gray-800">
                  Already have an account{" "}
                  <Link className="text-purple-600 font-bold" to="/login">
                    Login
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
