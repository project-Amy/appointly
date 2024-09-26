import { Link } from 'react-router-dom'

export default function PageNotFound() {
    return (
        <>
            <div className='flex flex-col  text-center gap-6'>
                <div className='mt-10'>
                    404 Page Not Found
                </div>
                <Link to={"/"} className='bg-[#212121] rounded-lg p-3 border-gray-400 border'>Return to Home</Link>
            </div>
        </>
    )
}
