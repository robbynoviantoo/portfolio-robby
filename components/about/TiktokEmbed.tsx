import Link from "next/link"
import { useEffect } from "react"

export default function TiktokEmbed() {
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://www.tiktok.com/embed.js"
    script.async = true
    document.body.appendChild(script)
  }, [])

  return (
    <div className="flex max-h-fit min-w-[250px] max-w-full items-center justify-center rounded-xl bg-zinc-200 dark:bg-zinc-800 p-3">
      <blockquote
        className="tiktok-embed rounded-xl"
        cite="https://www.tiktok.com/@robbynovianto_"
        data-unique-id="robbynovianto_"
        data-embed-type="creator"
      >
        <section>
          <Link
            target="_blank"
            href="https://www.tiktok.com/@robbynovianto_?refer=creator_embed"
          >
            @robbynovianto_
          </Link>
        </section>
      </blockquote>
    </div>
  )
}
