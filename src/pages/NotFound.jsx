import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className='bg-okip-700 h-screen flex flex-col'>
      <div className='absolute top-0 left-0 p-5'>
        <Link to="/" className='flex items-center justify-center'>
          <button className='bg-zinc-800 p-4 rounded-full h-16 w-16 text-3xl flex items-center justify-center mr-5 text-white'>
            <IoIosArrowBack />
          </button>
          <span className='text-3xl font-bold'>Back to home</span>
        </Link>
      </div>
      <div className='flex flex-grow justify-center items-center'>
        <div className="flex flex-col justify-center items-center">
          <h1 className='text-9xl font-bold'>404</h1>
          <p className='text-6xl'>Not Found</p>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
