import { useState, useEffect, Suspense } from 'react'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs.tsx'
import { Button } from '@/components/ui/button.tsx'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card.tsx'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx'
import { Label } from '@/components/ui/label.tsx'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible.tsx'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog.tsx'
import { ReloadIcon } from '@radix-ui/react-icons'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'
import { transliterationApiAtom } from '@/state/transliteration.ts'
import { useAtomValue, useAtom } from 'jotai'
import {
  autoDetectedLanguageAtom,
  inputLanguageAtom,
  outputLanguageAtom,
} from '@/state/languageState.ts'
import { loadingAtom } from '@/state/appState.ts'

const tools = [
  {
    id: 'tokenizer',
    name: 'Tokenizer',
    description:
      'Tokenizes given brahmic text into *Akshara*s and its constituents.',
    examples: [
      {
        name: 'Kannada',
        caption: 'A text in Kannada',
        content:
          'This is an example input for Tool A. It demonstrates basic functionality.',
      },
      {
        name: 'Example 2',
        content:
          'Another example for Tool A, showing different use cases and potential outputs.',
        caption: 'Advanced use case',
      },
      {
        name: 'Example 3',
        content: 'Tool A can analyze the sentiment of this positive sentence.',
        caption: 'Sentiment analysis',
      },
      {
        name: 'Example 4',
        content:
          'This example will showcase how Tool A handles longer texts with multiple sentences. It can detect sentence boundaries and provide statistics on length complexity.',
        caption: 'Multi-sentence analysis',
      },
      {
        name: 'Example 5',
        content:
          'Special characters and numbers: 123!@#$%^&*() should be handled correctly by Tool A.',
        caption: 'Special character handling',
      },
      {
        name: 'Example 6',
        content:
          'Tool A should be able to identify and count unique words in this sentence with repeated words.',
        caption: 'Unique word counting',
      },
    ],
  },
  {
    id: 'prastara',
    name: 'Prastara',
    description:
      'Tool B specializes in named entity recognition. It can identify and classify entities text into predefined categories such as person names, organizations, locations, etc.',
    examples: [
      {
        name: 'Example 1',
        content:
          'Apple Inc. is planning to open a new store in New York City next month.',
        caption: 'Named Entity Recognition Example 1',
      },
      {
        name: 'Example 2',
        content:
          'The Eiffel Tower in Paris, France, attracts millions of visitors each year.',
        caption: 'Named Entity Recognition Example 2',
      },
      {
        name: 'Example 3',
        content:
          'Elon Musk, CEO of Tesla and SpaceX, announced new plans for Mars colonization.',
        caption: 'Multiple entity types',
      },
      {
        name: 'Example 4',
        content:
          'The United Nations headquarters is located on the East River in Manhattan, New York City.',
        caption: 'Organization and location entities',
      },
      {
        name: 'Example 5',
        content:
          'William Shakespeare wrote Romeo and Juliet in the late 16th century.',
        caption: 'Person and work of art entities',
      },
      {
        name: 'Example 6',
        content:
          'The 2024 Summer Olympics will be held in Paris, following the 2021 Tokyo Olympics.',
        caption: 'Event and date entities',
      },
    ],
  },
  {
    id: 'katapayadi-decoder',
    name: 'Katapayadi Decoder',
    description:
      'Tool C focuses on text summarization. It can generate concise and fluent summaries of longer texts while preserving key information overall meaning.',
    examples: [
      {
        name: 'Example 1',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat.',
        caption: 'Lorem Ipsum Summarization',
      },
      {
        name: 'Example 2',
        content:
          'The quick brown fox jumps over the lazy dog. This sentence contains every letter of alphabet and is often used for font demonstrations.',
        caption: 'Short Sentence Summarization',
      },
      {
        name: 'Example 3',
        content:
          'Artificial intelligence (AI) is demonstrated by machines, as opposed to natural displayed animals including humans. AI research has been defined the field of study intelligent agents, which refers any system that perceives its environment and takes actions maximize chance achieving goals.',
        caption: 'AI Definition Summarization',
      },
      {
        name: 'Example 4',
        content:
          "Climate change is a long-term in the average weather patterns that have come to define Earth's local, regional and global climates. These changes broad range of observed effects are synonymous with term. Changes climate since early 20th century primarily driven by human activities, particularly fossil fuel burning, which increases heat-trapping greenhouse gas levels atmosphere, raising surface temperature.",
        caption: 'Climate Change Explanation',
      },
      {
        name: 'Example 5',
        content:
          'The Internet is a global system of interconnected computer networks that use the standard Protocol Suite (TCP/IP) to serve billions users worldwide. It network consists millions private, public, academic, business, and government networks, local scope, are linked by broad array electronic, wireless, optical networking technologies.',
        caption: 'Internet Definition',
      },
      {
        name: 'Example 6',
        content:
          "Photosynthesis is a process used by plants and other organisms to convert light energy into chemical that can later be released fuel the organism's activities. This stored in carbohydrate molecules, such as sugars, which are synthesized from carbon dioxide water. Oxygen also byproduct. Most plants, algae, cyanobacteria perform photosynthesis; called photoautotrophs.",
        caption: 'Photosynthesis Explanation',
      },
    ],
  },
  {
    id: 'transliterate',
    name: 'Transliterate',
    description:
      'Tool D is for language translation. It can translate text from one to another, supporting a wide range of pairs.',
    examples: [
      {
        name: 'Example 1',
        content:
          'Hello, how are you? This is an example of English text to be translated.',
        caption: 'English to Other Language Translation',
      },
      {
        name: 'Example 2',
        content:
          'Bonjour, comment allez-vous? Ceci est un exemple de texte français à traduire.',
        caption: 'French to Other Language Translation',
      },
      {
        name: 'Example 3',
        content:
          'Hola, ¿cómo estás? Este es un ejemplo de texto en español para traducir.',
        caption: 'Spanish to Other Language Translation',
      },
      {
        name: 'Example 4',
        content:
          'Guten Tag, wie geht es Ihnen? Dies ist ein Beispiel für zu übersetzenden deutschen Text.',
        caption: 'German to Other Language Translation',
      },
      {
        name: 'Example 5',
        content:
          'Ciao, come stai? Questo è un esempio di testo italiano da tradurre.',
        caption: 'Italian to Other Language Translation',
      },
      {
        name: 'Example 6',
        content: '你好，你好吗？这是一个需要翻译的中文文本示例。',
        caption: 'Chinese to Other Language Translation',
      },
    ],
  },
]

const LanguageSelectList = () => {
  const transliterateApi = useAtomValue(transliterationApiAtom)
  return (
    <>
      <SelectGroup>
        <SelectLabel>Indian Main</SelectLabel>
        {(transliterateApi.languages.get('IndianMain') || []).map(
          (language) => (
            <SelectItem key={language} value={language}>
              {language}
            </SelectItem>
          ),
        )}
      </SelectGroup>
      <SelectSeparator />
      <SelectGroup>
        <SelectLabel>Roman Diacritic</SelectLabel>
        {(transliterateApi.languages.get('RomanDiacritic') || []).map(
          (language) => (
            <SelectItem key={language} value={language}>
              {language}
            </SelectItem>
          ),
        )}
      </SelectGroup>
      <SelectSeparator />
      <SelectGroup>
        <SelectLabel>Roman Non-Diacritic</SelectLabel>
        {(transliterateApi.languages.get('RomanNonDiacritic') || []).map(
          (language) => (
            <SelectItem key={language} value={language}>
              {language}
            </SelectItem>
          ),
        )}
      </SelectGroup>
    </>
  )
}

const LanguageSelectors = () => {
  const [inputLanguage, setInputLanguage] = useAtom(inputLanguageAtom)
  const [outputLanguage, setOutputLanguage] = useAtom(outputLanguageAtom)
  const autoDetectedLanguage = useAtomValue(autoDetectedLanguageAtom)
  return (
    <div className="flex flex-wrap items-center justify-start gap-x-4 gap-y-2">
      <Label className="flex items-center gap-x-2">
        <p>Input Language</p>
        <Select value={inputLanguage} onValueChange={setInputLanguage}>
          <SelectTrigger className="w-[140px] h-8">
            <SelectValue placeholder="Select Input Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="autodetect">Auto Detect</SelectItem>
            <SelectSeparator />
            <LanguageSelectList />
          </SelectContent>
        </Select>
      </Label>

      <Label className="flex items-center gap-x-2">
        <p>Output Language</p>
        <Select value={outputLanguage} onValueChange={setOutputLanguage}>
          <SelectTrigger className="w-[140px] h-8">
            <SelectValue placeholder="Select Output Language" />
          </SelectTrigger>
          <SelectContent>
            <LanguageSelectList />
          </SelectContent>
        </Select>
      </Label>

      <Label className="flex items-center gap-x-2">
        <p>Auto detected Language: </p>
        <span>{autoDetectedLanguage}</span>
      </Label>
    </div>
  )
}

const StatusIndicator = () => {
  const loading = useAtomValue(loadingAtom)
  return (
    <div className="flex items-center text-sm">
      {loading ? (
        <>
          <ReloadIcon className="mr-2 h-3 w-3 animate-spin" />
          Processing
        </>
      ) : (
        <span className="text-green-500">Idle</span>
      )}
    </div>
  )
}

const StatusBar = () => (
  <div className="border-t p-2 flex flex-wrap  gap-x-4 gap-y-2 justify-between text-sm text-neutral-500 mt-auto dark:text-neutral-400">
    <LanguageSelectors />
    <StatusIndicator />
  </div>
)

export const App = () => {
  const [activeTool, setActiveTool] = useState('A')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [setting1, setSetting1] = useState('default')
  const [setting2, setSetting2] = useState('default')
  const [isLoading, setIsLoading] = useState(false)
  const [isDescriptionOpen] = useState(false)

  const [language, setLanguage] = useState('')

  useEffect(() => {
    const processInput = async () => {
      if (input) {
        setIsLoading(true)
        // Simulate processing delay
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setOutput(`Processed by ${activeTool}: ${input}`)
        setIsLoading(false)
      } else {
        setOutput('')
      }
    }

    processInput()
  }, [input, activeTool, setting1, setting2])

  const handleExampleSelect = (example: string) => {
    setInput(example)
  }
  const { pathname } = useLocation()

  return (
    <div className="h-full flex flex-col p-4 gap-4 overflow-hidden">
      <h1 className="text-2xl font-bold px-1">Akshara Tools</h1>
      {/*TODO: Add a loading fallback and error overlay*/}
      <Suspense>
        <Tabs value={pathname}>
          <TabsList className="w-full justify-start">
            {tools.map((tool) => (
              <TabsTrigger
                asChild
                key={tool.id}
                value={`/${tool.id}`}
                className="flex-1 max-w-[200px] data-[state=active]:bg-neutral-900 data-[state=active]:text-neutral-50 dark:data-[state=active]:bg-neutral-50 dark:data-[state=active]:text-neutral-900"
              >
                <NavLink to={tool.id}>{tool.name}</NavLink>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <div className="flex-grow overflow-hidden">
          <Outlet />
        </div>

        {/*{tools.map((tool) => (*/}
        {/*  <TabsContent*/}
        {/*    key={tool.id}*/}
        {/*    value={tool.id}*/}
        {/*    className="flex-grow overflow-auto"*/}
        {/*  >*/}
        {/*    <div className="p-8">*/}
        {/*      <h2 className="text-2xl font-bold mb-4">{tool.name}</h2>*/}
        {/*      <Collapsible defaultOpen={true} className="mb-4">*/}
        {/*        <CollapsibleTrigger asChild>*/}
        {/*          <Button variant="link" className="p-0">*/}
        {/*            {isDescriptionOpen*/}
        {/*              ? 'Hide Description'*/}
        {/*              : 'Show Description'}*/}
        {/*          </Button>*/}
        {/*        </CollapsibleTrigger>*/}
        {/*        <CollapsibleContent>*/}
        {/*          <ReactMarkdown className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">*/}
        {/*            {tool.description}*/}
        {/*          </ReactMarkdown>*/}
        {/*        </CollapsibleContent>*/}
        {/*      </Collapsible>*/}

        {/*      <div className="grid grid-cols-2 gap-4 mt-4">*/}
        {/*        <div>*/}
        {/*          <Label htmlFor={`input-${tool.id}`}>Input</Label>*/}
        {/*          <textarea*/}
        {/*            id={`input-${tool.id}`}*/}
        {/*            placeholder="Enter text to process..."*/}
        {/*            value={input}*/}
        {/*            onChange={(e) => setInput(e.target.value)}*/}
        {/*            className="w-full h-40 p-2 border border-neutral-200 rounded dark:border-neutral-800"*/}
        {/*          />*/}
        {/*        </div>*/}
        {/*        <div>*/}
        {/*          <Label htmlFor={`output-${tool.id}`}>Output</Label>*/}
        {/*          <div*/}
        {/*            id={`output-${tool.id}`}*/}
        {/*            className="w-full h-40 p-2 border border-neutral-200 rounded bg-neutral-100 overflow-auto dark:border-neutral-800 dark:bg-neutral-800"*/}
        {/*          >*/}
        {/*            {output}*/}
        {/*          </div>*/}
        {/*        </div>*/}
        {/*      </div>*/}

        {/*      <Dialog>*/}
        {/*        <DialogTrigger asChild>*/}
        {/*          <Button variant="outline" className="mt-4">*/}
        {/*            Load Example*/}
        {/*          </Button>*/}
        {/*        </DialogTrigger>*/}
        {/*        <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">*/}
        {/*          <DialogHeader>*/}
        {/*            <DialogTitle>Select an Example</DialogTitle>*/}
        {/*          </DialogHeader>*/}
        {/*          <div className="flex-grow overflow-y-auto pr-6">*/}
        {/*            <div className="grid gap-4 md:grid-cols-2">*/}
        {/*              {tool.examples.map((example, index) => (*/}
        {/*                <Card key={index}>*/}
        {/*                  <CardHeader>*/}
        {/*                    <CardTitle>{example.name}</CardTitle>*/}
        {/*                    <CardDescription>*/}
        {/*                      {example.caption}*/}
        {/*                    </CardDescription>*/}
        {/*                  </CardHeader>*/}
        {/*                  <CardContent>*/}
        {/*                    <p className="text-sm">{example.content}</p>*/}
        {/*                  </CardContent>*/}
        {/*                  <CardFooter>*/}
        {/*                    <Button*/}
        {/*                      onClick={() =>*/}
        {/*                        handleExampleSelect(example.content)*/}
        {/*                      }*/}
        {/*                    >*/}
        {/*                      Use Example*/}
        {/*                    </Button>*/}
        {/*                  </CardFooter>*/}
        {/*                </Card>*/}
        {/*              ))}*/}
        {/*            </div>*/}
        {/*          </div>*/}
        {/*        </DialogContent>*/}
        {/*      </Dialog>*/}
        {/*    </div>*/}
        {/*  </TabsContent>*/}
        {/*))}*/}

        <StatusBar />
      </Suspense>
    </div>
  )
}
