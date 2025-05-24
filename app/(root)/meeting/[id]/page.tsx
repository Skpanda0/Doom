'use client'

import Loader from "@/components/Loader"
import MeetingRoom from "@/components/MeetingRoom"
import MeetingSetup from "@/components/MeetingSetup"
import { useGetCallById } from "@/hooks/USeGetCallById"
import { useUser } from "@clerk/nextjs"
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk"
import { useParams } from "next/navigation"
import { useState } from "react"

const Meeting = () => {
  const { user, isLoaded } = useUser()
  console.log(user?.fullName)
  const [isSetupComplete, setIsSetupComplete] = useState(false)
  const params = useParams()
  const id = params?.id as string  // 👈 this gives you the ID from the URL

  const { call, isCallLoading } = useGetCallById(id)

  if (!isLoaded || isCallLoading) return <Loader />

  return (
    <main className="h-screen w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup setIsSetupComplete={setIsSetupComplete}/>
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  )
}

export default Meeting
