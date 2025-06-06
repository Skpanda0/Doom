import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

interface homeCardProp {
    img:string,
    title:string, 
    description:string, 
    handelClick:() => void, 
    className:string
}

const HomeCard = ( {img, title, description, handelClick, className}: homeCardProp) => {
    return (
        <div className={cn('px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer', className)}
            onClick={handelClick}
        >
            <div className="bg-white/25 backdrop-blur-md flex-center size-12 rounded-[10px]">
                <Image
                    src={img}
                    height={27}
                    width={27}
                    alt="meeting"
                />
            </div>
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold">
                    {title}
                </h1>
                <p className="text-lg font-normal">
                    {description}
                </p>
            </div>
        </div>
    )
}

export default HomeCard