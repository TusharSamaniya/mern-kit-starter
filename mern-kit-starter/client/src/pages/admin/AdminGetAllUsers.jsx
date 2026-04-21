import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../contexts/ThemeContext'
import { useAlert } from '../../contexts/AlertContext'
import { getAllUserByAdmin } from '../../redux/admin/adminServices'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import Loader from '../../components/Loader'

const AdminGetAllUsers = () => {
    const { theme } = useTheme()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { showAlert } = useAlert()
    const { allUsers, message, loading } = useSelector(state => state.admin)
    useEffect(() => {
        dispatch(getAllUserByAdmin(showAlert))
    }, [])

    const handleEditUser = (id) => {
        navigate('/getUser/' + id)
    }
    if (loading) {
        return <Loader />
    }

    return (
        <div className={`overflow-x-auto min-h-screen ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>

            <table className={`min-w-full divide-y divide-gray-200 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
                <thead className={`${theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                            Phone
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody className={`${theme === 'dark' ? 'divide-gray-600 bg-gray-900' : 'divide-gray-200 bg-white'}`}>
                    {allUsers && allUsers.map((row, index) => (
                        <tr key={index} className="hover:bg-indigo-400">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{row.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">{row.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">{row.phone}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <button
                                    onClick={() => handleEditUser(row._id)}
                                    className="flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
                                >
                                    <PencilSquareIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                    {console.log(message)}
                </tbody>
            </table>
        </div>
    );
}

export default AdminGetAllUsers