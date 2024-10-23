import { CiFacebook, CiInstagram, CiTwitter } from 'react-icons/ci';

const ClientPart = () => {
  return (
    <div className='bg-[#FBF8EF] pb-28'>
      <div className='grid sm:grid-cols-4 grid-cols-1 pt-28 gap-6 w-10/12 mx-auto'>
        <div>
          <h1 className='text-4xl font-bold'>Trusted by over 250 clients</h1>
          <p className='text-fourth pt-6'>Experts to level up your business</p>
        </div>
        <div className='flex flex-col justify-between items-center '>
          <img
            className='h-28 w-28'
            src='https://demo.webdevia.com/uspace-locations-and-venues-listing-wordpress-theme/wp-content/uploads/2023/03/icon.svg'
            alt=''
          />
          <h1 className='text-2xl font-bold'>44</h1>
          <h4 className='text-xl font-bold'>Projects</h4>
        </div>
        <div className='flex flex-col justify-between items-center '>
          <img
            className='h-28 w-28'
            src='https://demo.webdevia.com/uspace-locations-and-venues-listing-wordpress-theme/wp-content/uploads/2023/03/icon-2.svg'
            alt=''
          />
          <h1 className='text-2xl font-bold'>1024</h1>
          <h4 className='text-xl font-bold'>Happy clients</h4>
        </div>
        <div className='flex flex-col justify-between items-center '>
          <img
            className='h-28 w-28'
            src='https://demo.webdevia.com/uspace-locations-and-venues-listing-wordpress-theme/wp-content/uploads/2023/03/icon.svg'
            alt=''
          />
          <h1 className='text-2xl font-bold'>99</h1>
          <h4 className='text-xl font-bold'>Rental Tents</h4>
        </div>
      </div>
      <div className='grid sm:grid-cols-4 grid-cols-1 mt-16 gap-10 w-10/12 mx-auto'>
        <div className='hover:bg-[#fdf8f2] transition-all duration-300 hover:-translate-y-4 hover:shadow-lg'>
          <div className='relative overflow-hidden group'>
            <img src='/asset 29.jpeg' alt='' />
            <div className='absolute translate-x-full group-hover:translate-x-0 transition-all duration-300 right-0 flex justify-around items-center gap-5 p-3 top-3 bg-red-600 w-3/5 '>
              <span className='text-second text-xl'>
                <CiFacebook />
              </span>
              <span className='text-second text-xl'>
                <CiInstagram />
              </span>
              <span className='text-second text-xl'>
                <CiTwitter />
              </span>
            </div>
          </div>
          <div className='pt-6 pl-6 pb-5'>
            <h1 className='text-2xl font-bold'>Alex Valdemir </h1>
            <h3 className='text-sm mt-2 font-bold uppercase text-fourth'>
              Senior Director
            </h3>
          </div>
        </div>
        <div className='hover:bg-[#fdf8f2] transition-all duration-300 hover:-translate-y-4 hover:shadow-lg'>
          <div className='relative overflow-hidden group'>
            <img src='/asset 30.jpeg' alt='' />
            <div className='absolute translate-x-full group-hover:translate-x-0 transition-all duration-300 right-0 flex justify-around items-center gap-5 p-3 top-3 bg-red-600 w-3/5 '>
              <span className='text-second text-xl'>
                <CiFacebook />
              </span>
              <span className='text-second text-xl'>
                <CiInstagram />
              </span>
              <span className='text-second text-xl'>
                <CiTwitter />
              </span>
            </div>
          </div>
          <div className='pt-6 pl-6 pb-5'>
            <h1 className='text-2xl font-bold'>John Harris </h1>
            <h3 className='text-sm mt-2 font-bold uppercase text-fourth'>
              PROJECT MANAGER
            </h3>
          </div>
        </div>
        <div className='hover:bg-[#fdf8f2] transition-all duration-300 hover:-translate-y-4 hover:shadow-lg'>
          <div className='relative overflow-hidden group'>
            <img src='/asset 31.jpeg' alt='' />
            <div className='absolute translate-x-full group-hover:translate-x-0 transition-all duration-300 right-0 flex justify-around items-center gap-5 p-3 top-3 bg-red-600 w-3/5 '>
              <span className='text-second text-xl'>
                <CiFacebook />
              </span>
              <span className='text-second text-xl'>
                <CiInstagram />
              </span>
              <span className='text-second text-xl'>
                <CiTwitter />
              </span>
            </div>
          </div>
          <div className='pt-6 pl-6 pb-5'>
            <h1 className='text-2xl font-bold'>Amine Jazouli </h1>
            <h3 className='text-sm mt-2 font-bold uppercase text-fourth'>
              DESIGNER
            </h3>
          </div>
        </div>
        <div className='hover:bg-[#fdf8f2] transition-all duration-300 hover:-translate-y-4 hover:shadow-lg'>
          <div className='relative overflow-hidden group'>
            <img src='/asset 32.jpeg' alt='' />
            <div className='absolute translate-x-full group-hover:translate-x-0 transition-all duration-300 right-0 flex justify-around items-center gap-5 p-3 top-3 bg-red-600 w-3/5 '>
              <span className='text-second text-xl'>
                <CiFacebook />
              </span>
              <span className='text-second text-xl'>
                <CiInstagram />
              </span>
              <span className='text-second text-xl'>
                <CiTwitter />
              </span>
            </div>
          </div>
          <div className='pt-6 pl-6 pb-5'>
            <h1 className='text-2xl font-bold'>Aleen Valzac </h1>
            <h3 className='text-sm mt-2 font-bold uppercase text-fourth'>
              CEO
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientPart;
