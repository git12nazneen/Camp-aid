


import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import toast from 'react-hot-toast';

const UpdateCamp = () => {
    const items = useLoaderData();
    console.log(items)
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            campName: items.campName,
            location: items.location,
            professionalName: items.professional_name,
            price: items.price,
        }
    });

    const onSubmit = async (data) => {
        console.log(data)
        try {
            console.log(data);
            const response = await axiosSecure.patch(`/camps/${items._id}`, data);
            console.log(response.data);
            if (response.data.modifiedCount > 0) {
                toast.success('Data updated successfully');
            }
        } catch (error) {
            console.error("Error updating data:", error);
            toast.error('Failed to update data');
        }
    };

    return (
        <div className='my-20'>
            <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
                <h2 className="text-lg text-center mx-auto font-semibold text-sky-700 pb-10 capitalize dark:text-white">You can update information</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                        <div>
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="campName">Camp name</label>
                            <input
                                id="campName"
                                type="text"
                                {...register('campName', { required: true })}
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                            />
                            {errors.campName && <span className="text-red-500">Camp name is required</span>}
                        </div>

                        <div>
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="location">Location</label>
                            <input
                                id="location"
                                type="text"
                                {...register('location', { required: true })}
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                            />
                            {errors.location && <span className="text-red-500">Location is required</span>}
                        </div>

                        <div>
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="professionalName">Doctor name</label>
                            <input
                                id="professionalName"
                                type="text"
                                {...register('professionalName', { required: true })}
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                            />
                            {errors.professionalName && <span className="text-red-500">Doctor name is required</span>}
                        </div>

                        <div>
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="fees">Fees</label>
                            <input
                                id="fees"
                                type="number"
                                {...register('price', { required: true })}
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                            />
                            {errors.fees && <span className="text-red-500">Fees are required</span>}
                        </div>
                    </div>

                    <div className="flex justify-end mt-6">
                        <button
                            type="submit"
                            className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default UpdateCamp;
