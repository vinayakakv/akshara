import ReactMarkdown from 'react-markdown'

export const Markdown = ({ children }: { children?: string }) => (
  <ReactMarkdown
    className="text-sm text-neutral-500 dark:text-neutral-400"
    components={{
      a: (props) => <a {...props} target="_blank" className="underline" />,
    }}
  >
    {children}
  </ReactMarkdown>
)
