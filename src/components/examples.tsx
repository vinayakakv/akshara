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

export type Example<T> = {
  name: string
  content: string
  caption: string
  data: T
}

type ExamplesDialogProps<T> = {
  examples: Example<T>[]
  onSelect: (content: T) => void
}

export function ExamplesDialog<T>({
  examples,
  onSelect,
}: ExamplesDialogProps<T>) {
  return (
    <Dialog>
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
          <div className="grid gap-4 md:grid-cols-2">
            {examples.map((example, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{example.name}</CardTitle>
                  <CardDescription>{example.caption}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{example.content}</p>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => onSelect(example.data)}>
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
