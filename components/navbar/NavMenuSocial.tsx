"use client"

import useIsomorphicLayoutEffect from "@/hooks/UseIsomorphicLayoutEffect"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import Link from "next/link"
import { useEffect, useRef } from "react"

interface NavMenuSocialProps {
  title: string
  active: boolean
  duration: number
  classes: string
  link: string
}

export default function NavMenuSocial({
  title,
  active,
  duration,
  classes,
  link,
}: NavMenuSocialProps) {
  const el = useRef<HTMLDivElement | null>(null)
  const tl = useRef<GSAPTimeline | null>(gsap.timeline({ paused: true }))


  useEffect(() => {
    if (active) {
      tl.current?.play()
    } else {
      tl.current?.reverse()
    }
  }, [active])

  return (
    <Link
      href={link}
      target={title === "email" ? "_self" : "_blank"}
      className={cn("group", classes)}
    >
      <p className="text-zinc-200 dark:text-zinc-800">{title}</p>
      <div className="h-[2px] w-full origin-center -translate-y-2 scale-x-0 rounded-full bg-zinc-200 transition group-hover:translate-y-0 group-hover:scale-x-100 dark:bg-zinc-800" />
    </Link>
  )
}
