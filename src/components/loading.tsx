import { Loader2 } from 'lucide-react'

export const GlobalLoading = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
    <div className="flex flex-col items-center space-y-4">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="text-lg font-semibold text-primary">
        Initializing Python and Aksharamukha
      </p>
    </div>
  </div>
)
