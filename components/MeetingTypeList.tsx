'use client'
import { useState } from "react"
import HomeCard from "./HomeCard"
import { useRouter } from "next/navigation"
import MeetingModal from "./MeetingModal"
import { useUser } from "@clerk/nextjs"
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk"
import toast from "react-hot-toast"
import { Textarea } from "./ui/textarea"
import ReactDatePicker from 'react-datepicker'
import { Input } from "./ui/input"

const MeetingTypeList = () => {
   const router = useRouter()
   const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>() 
   const { user } = useUser()
   const client = useStreamVideoClient()
   const [values, setValues] = useState({
    dateTime: new Date(),
    description: '',
    link:''
   })

   const [callDetails, setCallDetails] = useState<Call>()

   const createMeeting = async () => {
    if(!client || !user) return

     try {
       if(!values.dateTime){
        toast.error("Please select date and time")
        return
       }
       const id = crypto.randomUUID()
       const call = client.call("default", id)
       if (!call) throw new Error('Failed to create a call')

       const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString()
       const description = values.description || 'Instant meeting'

       await call.getOrCreate({
         data: {
           starts_at: startsAt,
           custom: {
             description
           }
         }
       })
       setCallDetails(call)
       if(!values.description){
        router.push(`/meeting/${call.id}`)
       }
       toast.success("Meeting created")
     } catch (error) {
       toast.error('Failed to create a meeting')
       console.log(error)
     }
   }

   const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`
  return (
    <section className='grid grid-cols-1 gap-5 mid:grid-cols-2 xl:grid-cols-4'>
      <HomeCard 
        img="/icons/add-meeting.svg"
        title = "New meeting"
        description = "Start a instance meeting"
        handelClick ={() => setMeetingState('isInstantMeeting')}
        className = "bg-[#FF742E]"
      />
      <HomeCard 
        img="/icons/schedule.svg"
        title = "Schedule meeting"
        description = "Plan your meeting"
        handelClick ={() => setMeetingState('isScheduleMeeting')}
        className = "bg-[#0E78F9]"
      />
      <HomeCard 
        img="/icons/recordings.svg"
        title = "View recordings"
        description = "Check out your recordings"
        handelClick ={() => router.push('/recordings')}
        className = "bg-[#830EF9]"
      />
      <HomeCard 
        img="/icons/join-meeting.svg"
        title = "Join meeting"
        description = "Via invitation"
        handelClick ={() => setMeetingState('isJoiningMeeting')}
        className = "bg-[#F9A90E]"
      />

    {!callDetails ? (
        <MeetingModal
          isOpen={meetingState === 'isScheduleMeeting'}
          onClose={() => setMeetingState(undefined)}
          title="Create Meeting"
          handelClick={createMeeting}
        >
          <div className="flex flex-col gap-2.5">
            <label className="text-base font-normal leading-[22.4px] text-sky-2">
              Add a description
            </label>
            <Textarea
              className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(e) =>
                setValues({ ...values, description: e.target.value })
              }
            />
          </div>
          <div className="flex w-full flex-col gap-2.5">
            <label className="text-base font-normal leading-[22.4px] text-sky-2">
              Select Date and Time
            </label>
            <ReactDatePicker
              selected={values.dateTime}
              onChange={(date) => setValues({ ...values, dateTime: date! })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full rounded bg-dark-3 p-2 focus:outline-none"
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === 'isScheduleMeeting'}
          onClose={() => setMeetingState(undefined)}
          title="Meeting Created"
          handelClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast.success("Copied the link")
          }}
          image={'/icons/checked.svg'}
          buttonIcon="/icons/copy.svg"
          className="text-center"
          buttonText="Copy Meeting Link"
        />
      )}

      <MeetingModal 
        isOpen ={meetingState === 'isInstantMeeting'}
        onClose = {() => setMeetingState(undefined)}
        title ="Start a instant meeting"
        className = "text-center"
        buttonText = "Start meeting"
        handelClick = {createMeeting}
      />

      <MeetingModal
        isOpen={meetingState === 'isJoiningMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Type the link here"
        className="text-center"
        buttonText="Join meeting"
        handelClick={() => router.push(values.link)}
      >
        <Input 
          className="bg-dark-2 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
          placeholder="meeting link"
          onChange={(e) => setValues({...values, link: e.target.value})}
        />
      </MeetingModal>


    </section>
  )
}

export default MeetingTypeList