'use client'
import { Button } from '@/components/ui/button';
import { useGetCallById } from '@/hooks/USeGetCallById';
import { useUser } from '@clerk/nextjs';
import { useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import React from 'react'
import toast from 'react-hot-toast';

const Table = ({ title, description,}: {title: string; description: string; }) => {
  return (
    <div className="flex flex-col items-start gap-2 xl:flex-row">
      <h1 className="text-base font-medium text-sky-1 lg:text-xl xl:min-w-32">
        {title}:
      </h1>
      <h1 className="truncate text-sm font-bold max-sm:max-w-[320px] lg:text-xl">
        {description}
      </h1>
    </div>
  );
};

const PersonalRoom = () => {
  const { user } = useUser()
  const meetingId = user?.id
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`
  const { call } = useGetCallById(meetingId!)
  const client  = useStreamVideoClient()
  const router = useRouter()

  const startRoom = async () => {
    if(!client || !user) return

    
    if(!call) {
      const newCall = client.call('default', meetingId!)
      await newCall.getOrCreate({
         data: {
           starts_at: new Date().toISOString(),
         }
       })
    }
    router.push(`/meeting/${meetingId!}?personal=true`)
  }
  return (
    <section className='flex flex-col size-full gap-10 text-white'>
      <h1 className='text-3xl font-bold'>
        PersonalRoom
      </h1>
      <div className='flex w-full flex-col gap-8 xl:max-w-[900px] '>
        <Table title='Topic' description={`${user?.fullName} meeting room`}/>
        <Table title='Meeting ID' description={`${meetingId!}`}/>
        <Table title='Invite Link' description={`${meetingLink}`}/>
      </div>
      <div className='flex gap-5'>
        <Button className='bg-blue-400' onClick={startRoom}>
          Start meeting
        </Button>
        <Button className='bg-dark-2' onClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast.success('Link copied')
        }}>
          Copy invitation
        </Button>
      </div>
    </section>
  )
}

export default PersonalRoom
