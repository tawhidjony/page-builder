"use client"

import dynamic from "next/dynamic"
import { Suspense } from "react"
const EditorComponent = dynamic(() => import("@/components/editor/editor.component"), { ssr: false })

export default function EditorPage() {
  return (
    <Suspense>
      <EditorComponent />
    </Suspense>
  )
}
