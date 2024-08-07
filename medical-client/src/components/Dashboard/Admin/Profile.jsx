
import { Helmet } from 'react-helmet'
import useAuth from '../../../hook/useAuth'
import useAdmin from '../../../hook/useAdmin'
import { Link } from 'react-router-dom'

const Profile = () => {
  const { user, loading } = useAuth() || {}
  const [isAdmin, isAdminLoading] = useAdmin()

  console.log(user)
  if (isAdminLoading || loading) return <span className="loading loading-spinner loading-lg"></span>
//   if ( loading) return <span className="loading loading-spinner loading-lg"></span>
 

  return (
    <div className='flex justify-center items-center h-screen'>
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <div className='bg-white shadow-lg rounded-2xl w-60 lg:w-3/5'>
        <img
          alt='profile'
          src='https://images.pexels.com/photos/3367931/pexels-photo-3367931.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          className='w-full mb-4 rounded-t-lg h-36'
        />
        <div className='flex flex-col items-center justify-center p-4 -mt-16'>
          <a href='#' className='relative block'>
            <img
              alt='profile'
              src={user?.photoURL}
              className='mx-auto object-cover rounded-full h-24 w-24  border-2 border-white '
            />
          </a>

          <p className='p-2 uppercase px-4 text-xs text-white bg-blue-400 rounded-full'>
            {isAdmin ? 'Admin' : 'User'}
          </p>
          <p className='mt-2 text-sm lg:text-xl w-56 lg:w-auto mx-auto font-medium text-gray-800 break-words '>
            User Id: {user?.uid}
          </p>
          <div className='w-full p-2 mt-4 rounded-lg'>
            <div className='flex flex-wrap items-center justify-between text-sm text-gray-600 '>
              <p className='flex flex-col'>
                Name
                <span className='font-bold text-black '>
                  {user?.displayName}
                </span>
              </p>
              <p className='flex flex-col'>
                Email
                <span className='font-bold text-black '>{user?.email}</span>
              </p>

              <div>
              <Link to='/dashboard/updateProfile'>
              <button className='bg-blue-400 px-10 py-1 rounded-lg text-white cursor-pointer hover:bg-blue-600 block mb-1'>
                  Update Profile
                </button>
                 </Link>
               
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
