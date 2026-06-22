import fs from "node:fs"
import path from "node:path"

export default function RootPage() {
  const htmlPath = path.join(process.cwd(), "Yogurtland R&D Portal.html")
  const html = fs.readFileSync(htmlPath, "utf8")
  const patch = `
<script>
(function () {
  const name = 'Niru';
  const title = 'Director of Research & Development';

  function replaceText(root) {
    if (!root || !root.body) return false;
    let changed = false;
    const walker = document.createTreeWalker(root.body, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const node = walker.currentNode;
      const value = node.nodeValue || '';
      if (value.indexOf('Alyssa Lam') !== -1) {
        node.nodeValue = value.replace(/Alyssa Lam/g, name);
        changed = true;
      }
      if (value.indexOf('R&D QA Specialist') !== -1) {
        node.nodeValue = node.nodeValue.replace(/R&D QA Specialist/g, title);
        changed = true;
      }
      if (value === 'AL') {
        node.nodeValue = 'N';
        changed = true;
      }
    }
    return changed;
  }

  function tick() {
    try {
      if (replaceText(document)) return;
    } catch (err) {}
    window.setTimeout(tick, 120);
  }

  window.addEventListener('load', function () {
    window.setTimeout(tick, 120);
  });
}());
</script>
`
  const srcDoc = html.includes("</body>") ? html.replace("</body>", `${patch}</body>`) : html + patch

  return (
    <iframe
      title="Yogurtland R&D Portal"
      srcDoc={srcDoc}
      className="block w-screen h-screen border-0"
    />
  )
}
