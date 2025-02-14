const Footer = () => {
  return (
    <div className='bg-seventh  mt-14'>
      <div className='sm:w-10/12 mx-auto'>
        <div className='grid py-20 sm:grid-cols-2 lg:grid-cols-4 grid-cols-1 px-2 gap-6'>
          <div>
            <h1 className='text-3xl text-second font-extrabold'>USpace</h1>
            <hr className='my-2 w-1/12 h-1 bg-second' />
            <p className='text-white/70 mt-5'>
              Are you planning an important party or event? When it comes to
              making an occasion as special as possible, you want every detail
              to be perfect.
            </p>
          </div>
          <div>
            <h1 className='text-3xl text-second font-extrabold'>Address</h1>
            <hr className='my-2 w-1/12 h-1 bg-second' />
            <p className='text-white/70 mt-5'>
              Address: 52 Great Av, New York <br /> Phone: 0541 669 333 <br />{' '}
              Email: contact@example.com <br /> Social Media: Facebook, Twitter
            </p>
          </div>
          <div>
            <h1 className='text-3xl text-second font-extrabold'>Links</h1>
            <hr className='my-2 w-1/12 h-1 bg-second' />
            <p className='text-white/70 mt-5'>
              Online Payments <br /> Gift Cards <br /> Return Policy <br />{' '}
              Furniture Assembling
            </p>
          </div>
          <div>
            <h1 className='text-3xl text-second font-extrabold'>Shopping</h1>
            <hr className='my-2 w-1/12 h-1 bg-second' />
            <p className='text-white/70 mt-5'>
              Online Payments <br /> Gift Cards <br /> Return Policy <br />{' '}
              Furniture Assembling
            </p>
          </div>
        </div>
        <h6 className='text-center text-white/70'>
          © 2023 Uspace All rights reserved.
        </h6>
      </div>
    </div>
  );
};

export default Footer;
