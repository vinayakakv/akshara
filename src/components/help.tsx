import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { HelpCircle, Globe } from 'lucide-react'
import {
  SiGithub as Github,
  SiX as Twitter,
  SiBluesky as Bluesky,
} from '@icons-pack/react-simple-icons'
import { ScrollArea } from '@/components/ui/scroll-area'

export const Help = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" variant="secondary">
          <HelpCircle className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Help</DialogTitle>
        </DialogHeader>
        <ScrollArea className="pr-4 max-h-[60vh]">
          <section className="flex flex-col gap-4 my-4">
            <p>
              Akshara Tools is a collection of programs to analyze Indic Text
              and Poetry.
            </p>
            <ol className="list-decimal list-inside space-y-2">
              <li>Select a tool from the tabs above</li>
              <li>Enter your text in the input field</li>
              <li>View the processed output in the output field</li>
              <li>Use the "Load Example" button to try pre-defined examples</li>
              <li>Adjust settings using the gear icon if needed</li>
            </ol>
          </section>
          <section className="my-4">
            <p>
              Transliteration powered by{' '}
              <a
                href="https://www.aksharamukha.com/"
                target="_blank"
                className="underline"
                rel="noopener noreferrer"
              >
                Aksharamukha
              </a>{' '}
              python library, running in browser with{' '}
              <a
                href="https://pyodide.org/en/stable/"
                target="_blank"
                className="underline"
                rel="noopener noreferrer"
              >
                Pyodide
              </a>
            </p>
          </section>
          <section className="my-4">
            <h3 className="font-semibold text-lg mb-2">Social</h3>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://github.com/vinayakakv/akshara"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-blue-500 hover:text-blue-600"
              >
                <Github className="h-5 w-5" />
                <span>GitHub</span>
              </a>
              <a
                href="https://vinayakakv.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-blue-500 hover:text-blue-600"
              >
                <Globe className="h-5 w-5" />
                <span>Website</span>
              </a>
              <a
                href="https://bsky.app/profile/vinayakakv.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-blue-500 hover:text-blue-600"
              >
                <Bluesky className="h-5 w-5" />
                <span>Bluesky</span>
              </a>
              <a
                href="https://x.com/me.vinayakakv"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-blue-500 hover:text-blue-600"
              >
                <Twitter className="h-5 w-5" />
                <span>X</span>
              </a>
            </div>
          </section>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
