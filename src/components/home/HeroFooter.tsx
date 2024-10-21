'use client';

const row1 = [
  '/asset 2.png',
  '/asset 3.png',
  '/asset 4.png',
  '/asset 5.png',
  '/asset 6.png',
];

const HeroFooter = () => {
  return (
    <div className='main'>
      <div className='child'>
        {row1.map((el, i) => (
          <div className='imgGroup' key={i}>
            <img className='image' src={el} />
          </div>
        ))}
      </div>
      <div className='child'>
        {row1.map((el, i) => (
          <div className='imgGroup' key={i}>
            <img className='image' src={el} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroFooter;
