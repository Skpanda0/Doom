import MeetingTypeList from '@/components/MeetingTypeList';

const Home = () => {

const now = new Date();
  const optionsTime: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  };
  const optionsDate: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const timeString = now.toLocaleTimeString('en-US', optionsTime); 
  const date = now.toLocaleDateString('en-US', optionsDate)

  return (
    <section className='flex flex-col size-full gap-10 text-white'>
      <div className='w-full h-[300px] rounded-[20px] bg-[url(/images/hero-background.png)] bg-cover'>
        <div className='flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11' >
          <h2 className='bg-white/25 backdrop-blur-md max-w-[270px] rounded py-2 text-center text-base font-normal'>
            Upcoming meeting at : 12:00 AM
          </h2>
          <div className='flex flex-col gap-2'>
            <h1 className='text-4xl font-extrabold lg:text-7xl'>
              {timeString}
            </h1>
            <p className='text-lg font-medium text-sky-1 lg:text-2xl'>
              {date}
            </p>
            <p></p>
          </div>
        </div>
      </div>
      <MeetingTypeList />
    </section>
  )
}

export default Home