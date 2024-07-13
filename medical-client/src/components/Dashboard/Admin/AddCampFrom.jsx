
import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { TbFidgetSpinner } from 'react-icons/tb'
const AddCampFrom = ({
  handleSubmit,
  startDate,
  loading,
  handleDateChange
}) => {

  return (
    <div className='w-full p-20 min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50'>
      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
          <div className='space-y-6'>
            <div className='space-y-1 text-sm'>
              <label htmlFor='location' className='block text-gray-600'>
                Location
              </label>
              <input
                className='w-full px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-500 rounded-md '
                name='location'
                id='location'
                type='text'
                placeholder='Location'
                required
              />
            </div>

            <div className='space-y-1 text-sm'>
              <label htmlFor='category' className='block text-gray-600'>
                Healthcare Professional Name
              </label>
              <input
                  className='w-full px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-500 rounded-md '
                  name='professional_name'
                  id='professional_name'
                  type='text'
                  placeholder='Professional Name'
                  required
                />
            </div>

            <div className='space-y-1'>
              <label htmlFor='date' className='block text-gray-600'>
                Select Date
              </label>
              {/* Calender */}
              <DatePicker selected={startDate}  onChange={handleDateChange} />
              <input
            type="hidden"
            name="date"
            // value={startDate.toISOString()} // Convert the date to ISO string
            value={`${startDate.toISOString().slice(0, 16)}:00`}
          />
            </div>
          </div>
          <div className='space-y-6'>
            <div className='space-y-1 text-sm'>
              <label htmlFor='campName' className='block text-gray-600'>
                Camp Name
              </label>
              <input
                className='w-full px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-500 rounded-md '
                name='campName'
                id='campName'
                type='text'
                placeholder='Camp Name'
                required
              />
            </div>

            <div className=' p-4 bg-white w-full  m-auto rounded-lg flex justify-between items-center'>
          
              <div className='file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg'>
              <label htmlFor="image" className="text-sm text-left">
                 Img url
                </label>
                <div className='flex flex-col w-max mx-auto text-center'>
                    <input
                     type="text"
                     placeholder="Image url"
                      name="image"
                      className="w-full rounded-md focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-violet-400 border-gray-700 p-3"  
                    />
                
                </div>
              </div>
            
            </div>
            <div className='flex justify-between gap-2'>
              <div className='space-y-1 text-sm'>
                <label htmlFor='price' className='block text-gray-600'>
                  Camp Fees
                </label>
                <input
                  className='w-full px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-500 rounded-md '
                  name='price'
                  id='price'
                  type='number'
                  placeholder='Price'
                  required
                />
              </div>

              <div className='space-y-1 text-sm'>
                <label htmlFor='participant' className='block text-gray-600'>
                  Total participant
                </label>
                <input
                  className='w-full px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-500 rounded-md '
                  name='total_participant'
                  id='participant'
                  type='number'
                  placeholder='Total participant'
                  required
                />
              </div>
            </div>

        

            <div className='space-y-1 text-sm'>
              <label htmlFor='description' className='block text-gray-600'>
                Description
              </label>

              <textarea
                id='description'
                className='block rounded-md focus:blue-300 w-full h-32 px-4 py-3 text-gray-800  border border-blue-300 focus:outline-blue-500 '
                name='description'
              ></textarea>
            </div>
          </div>
        </div>

        <button
          disabled={loading}
          type='submit'
          className='w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-blue-500'
        >
          {loading ? (
            <TbFidgetSpinner className='animate-spin m-auto' />
          ) : (
            ' Save & Continue'
          )}
        </button>
      </form>
    </div>
  )
}

export default AddCampFrom



