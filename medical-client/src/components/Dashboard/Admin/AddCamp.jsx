import { useState } from 'react'
// import { imageUpload } from '../../../api/utils'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../../hook/useAuth'
import useAxiosSecure from '../../../hook/useAxiosSecure'
import { Helmet } from 'react-helmet'
import AddCampFrom from './AddCampFrom'

const AddCamp
 = () => {
  const navigate = useNavigate()
  const axiosSecure = useAxiosSecure()
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()
  const [startDate, setStartDate] = useState(new Date());

  const { mutateAsync } = useMutation({
    mutationFn: async campData => {
      const { data } = await axiosSecure.post(`/camps`, campData)
      return data
    },
    onSuccess: () => {
      console.log('Data Saved Successfully')
      toast.success('Camp Added Successfully!')
      navigate('/dashboard/manageCamp')
      setLoading(false)
    },
  })

  //   Form handler
  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    const form = e.target
    const location = form.location.value
    const professional_name = form.professional_name.value
    const campName = form.campName.value
    const image = form.image.value
    const price = form.price.value
    const guests = form.total_participant.value
    const description = form.description.value
    const date = new Date(form.date.value)
 
   try {

      const campData = {
        location,
        professional_name,
        campName,
        date,
        price,
        guests,
        description,
        image,
      }
      console.table(campData)

      //   Post request to server
      await mutateAsync(campData)
    } catch (err) {
      console.log(err)
      toast.error(err.message)
      setLoading(false)
    }
  }

  const handleDateChange = (date) => {
    setStartDate(date)
  }

  return (
    <>
      <Helmet>
        <campName>Add camp | Dashboard</campName>
      </Helmet>

      {/* Form */}
      <AddCampFrom
         Form
        handleSubmit={handleSubmit}
        startDate={startDate}
        loading={loading}
        handleDateChange={handleDateChange} 
      />
    </>
  )
}

export default AddCamp
