import fs from "node:fs"
import path from "node:path"

export default function RootPage() {
  const htmlPath = path.join(process.cwd(), "Yogurtland R&D Portal.html")
  const html = fs.readFileSync(htmlPath, "utf8")

  return (
    <iframe
      title="Yogurtland R&D Portal"
      srcDoc={html}
      className="block w-screen h-screen border-0"
    />
  )
}
