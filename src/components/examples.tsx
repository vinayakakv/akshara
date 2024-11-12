import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useState } from 'react'
import { Markdown } from '@/components/markdown.tsx'

export type Example<T> = {
  name: string
  content: string
  caption?: string
} & (T extends null | undefined ? { data?: null } : { data: T })

type ExamplesDialogProps<T> = {
  examples: Example<T>[]
  onSelect: (content: string, data: T) => void
}

export function ExamplesDialog<T>({
  examples,
  onSelect,
}: ExamplesDialogProps<T>) {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="mt-4">
          Load Example
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Select an Example</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="grid gap-2 md:grid-cols-2">
            {examples
              .map((example) => ({
                ...example,
                content: example.content.replaceAll(/^\s+/gm, ''),
              }))
              .map((example, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{example.name}</CardTitle>
                    <CardDescription>
                      <Markdown>{example.caption}</Markdown>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <pre className="text-sm overflow-auto">
                      {example.content}
                    </pre>
                  </CardContent>
                  <CardFooter>
                    <Button
                      onClick={() => {
                        onSelect(example.content, example.data as never)
                        setOpen(false)
                      }}
                    >
                      Use Example
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
