const Suits = async () => {
  return (
    <div className='w-10/12 mx-auto'>
      <div className='mt-14'>
        <div className='text-center pt-10 pb-20'>
          <h3 className='text-xl uppercase font-bold text-fourth'>
            Be inspired to meet, create, and innovate.
          </h3>
          <h1 className='text-5xl font-bold text-first mt-2'>
            Book a space that suits you
          </h1>
        </div>
        <div className='grid sm:grid-cols-3 grid-cols-1 gap-5'>
          <div>
            <img
              src='https://demo.webdevia.com/uspace-locations-and-venues-listing-wordpress-theme/wp-content/uploads/2023/03/Group-9.svg'
              alt=''
            />
            <h3 className='mb-3 mt-2 font-bold text-2xl'>
              Find the perfect space
            </h3>
            <p className='text-fifth'>
              Browse the marketplace and customize your search to suit your
              activity needs.
            </p>
          </div>
          <div>
            <img
              src='https://demo.webdevia.com/uspace-locations-and-venues-listing-wordpress-theme/wp-content/uploads/2023/03/Group-8.svg'
              alt=''
            />
            <h3 className='mb-3 mt-2 font-bold text-2xl'>Book it with ease</h3>
            <p className='text-fifth'>
              Once you find the ideal match, reserve the space and pay securely
              online with payment system.
            </p>
          </div>
          <div>
            <img
              src='https://demo.webdevia.com/uspace-locations-and-venues-listing-wordpress-theme/wp-content/uploads/2023/03/Group-5.svg'
              alt=''
            />
            <h3 className='mb-3 mt-2 font-bold text-2xl'>
              Meet, make or create
            </h3>
            <p className='text-fifth'>
              Create a memorable experience in a memorable space, and enjoy!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Suits;
