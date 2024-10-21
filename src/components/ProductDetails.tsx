import DatePick from './productDetails/DatePick';
import { Table, TableBody, TableCell, TableRow } from './ui/table';

const ProductDetails = ({ data }: { data: any }) => {
  return (
    <div>
      <div>
        <div className='w-full h-[85vh] grid gap-2 grid-cols-4 grid-rows-2'>
          <div className='col-span-2 row-span-2'>
            <img className='w-full h-full' src={data?.image[0]} alt='' />
          </div>
          <div className='col-span-1 row-span-1'>
            <img className='w-full h-full' src={data?.image[1]} alt='' />
          </div>
          <div className='col-span-1 row-span-2'>
            <img className='w-full h-full' src={data?.image[2]} alt='' />
          </div>
          <div className='col-span-1 row-span-1'>
            <img className='w-full h-full' src={data?.image[3]} alt='' />
          </div>
        </div>
        <div className='w-10/12 mx-auto'>
          <div className='grid grid-cols-12 gap-10 my-10'>
            <div className='col-span-8 '>
              <h1 className='text-4xl font-semibold text-first'>
                {data?.name}
              </h1>
              <div className='mt-4 mb-8'>
                {data?.description
                  ?.split('. ')
                  .map((sentence: any, index: any) => (
                    <p key={index} className='mb-4 text-fifth'>
                      {sentence.trim() +
                        (index < data.description.split('. ').length - 1
                          ? '.'
                          : '')}
                    </p>
                  ))}
              </div>
              <hr className='mb-4 bg-first' />
              <h2 className='text-3xl font-semibold mb-6'>Awesome Features</h2>
              <div className='grid grid-cols-2 gap-x-4 gap-y-5'>
                {data?.features?.map((feature: any, index: any) => (
                  <div className='flex items-center gap-4' key={index}>
                    <img
                      className='w-10 h-10'
                      src='https://demo.webdevia.com/partytent-event-eental-wordPress-theme/wp-content/uploads/2022/06/kitchen.svg'
                      alt=''
                    />
                    <p className='mb-4 text-fifth'>{feature}</p>
                  </div>
                ))}
              </div>
              <hr className='mb-4 mt-14 bg-first' />
              <h2 className='text-3xl font-semibold mb-6'>Renting rules</h2>
              <div className=' space-y-5'>
                {data?.renting_roles?.map((rent: any, index: any) => (
                  <p key={index} className='mb-4 list-item text-fifth'>
                    {rent}
                  </p>
                ))}
              </div>
              <hr className='mb-4 mt-14 bg-first' />
              <h2 className='text-3xl font-semibold mb-6'>Dimensions</h2>
              <div className=' space-y-5'>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className='font-medium'>
                        General Dimensions
                      </TableCell>
                      <TableCell>{data?.dimensions[0]}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className='font-medium'>Marble Top</TableCell>
                      <TableCell>{data?.dimensions[1]}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className='font-medium'>Wood Top</TableCell>
                      <TableCell>{data?.dimensions[2]}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className='font-medium'>Glass Top</TableCell>
                      <TableCell>{data?.dimensions[3]}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className='font-medium'>
                        Base Material
                      </TableCell>
                      <TableCell>{data?.dimensions[4]}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <hr className='mb-4 mt-14 bg-first' />
              <h2 className='text-3xl font-semibold mb-6'>Amenities</h2>
              <div className=' space-y-5'>
                {data?.amenities?.map((amnt: any, index: any) => (
                  <p key={index} className='mb-4 list-item text-fifth'>
                    Amenities: {amnt}
                  </p>
                ))}
              </div>
              <hr className='mb-4 mt-14 bg-first' />
              <h2 className='text-3xl font-semibold mb-6'>Video</h2>
              <div className='w-full h-96 relative'>
                <div className='absolute inset-0 z-10 bg-black opacity-80'></div>
                <video
                  controls
                  loop
                  muted
                  className='w-full z-20 relative h-full object-cover'
                  src={data?.video}
                ></video>
              </div>
            </div>
            <div className='col-span-4 border h-fit border-fourth p-10'>
              <h3 className='text-2xl font-semibold'>${data?.price}.00/Hour</h3>
              {/* <p className='mt-6 text-first font-medium'>Pick a date</p> */}
              <DatePick data={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
