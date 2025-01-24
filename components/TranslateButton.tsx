import type React from "react"
import { Button } from "@/components/ui/button"

interface TranslateButtonProps {
  isSpanish: boolean
  toggleLanguage: () => void
}

const TranslateButton: React.FC<TranslateButtonProps> = ({ isSpanish, toggleLanguage }) => {
  return (
    <Button
      onClick={toggleLanguage}
      variant="outline"
      size="sm"
      className="bg-navy-blue text-gold hover:bg-blue-800 text-xs py-1 px-2"
    >
      {isSpanish ? "EN" : "ESP"}
    </Button>
  )
}

export default TranslateButton

