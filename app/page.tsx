"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Star } from "lucide-react"
import QuadrantDial from "../components/QuadrantDial"
import AllServicesDial from "../components/AllServicesDial"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import TranslateButton from "../components/TranslateButton"
import { Button } from "@/components/ui/button"

export default function Home() {
  const [selectedDial, setSelectedDial] = useState<"forYou" | "allServices">("forYou")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isSpanish, setIsSpanish] = useState(false)
  const [forYouSelection, setForYouSelection] = useState<string | null>(null)
  const [allServicesSelection, setAllServicesSelection] = useState<string | null>(null)
  const [language, setLanguage] = useState<"en" | "es">("en")
  const router = useRouter()

  const handleQuadrantSelect = (quadrant: string) => {
    if (selectedDial === "forYou") {
      setForYouSelection(quadrant)
    } else {
      setAllServicesSelection(quadrant)
    }
  }

  const handleGoToServices = () => {
    setSelectedDial("allServices")
  }

  const handleFindInfo = () => {
    if (allServicesSelection) {
      const route = allServicesSelection.toLowerCase().replace(/\s+/g, "-").replace(/[()&]/g, "")
      router.push(`/landing-${route}?forYou=${forYouSelection || "All"}&allServices=${allServicesSelection}`)
    }
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "es" : "en"))
  }

  const goToFavorites = () => {
    router.push("/favorites")
  }

  useEffect(() => {
    setForYouSelection(null)
    setAllServicesSelection(null)
  }, [selectedDial])

  return (
    <div className="flex flex-col h-screen" style={{ backgroundColor: "#EDEEF0", color: "gold" }}>
      <header className="bg-white text-navy-blue p-2 flex justify-between items-center">
        <h1 className="text-lg font-bold">BigBurgh</h1>
        <div className="flex items-center space-x-2">
          <TranslateButton isSpanish={isSpanish} toggleLanguage={toggleLanguage} />
          <Button
            onClick={goToFavorites}
            variant="ghost"
            size="icon"
            className="text-navy-blue hover:text-blue-800 p-1 hover:text-yellow-500"
            aria-label="Favorites"
          >
            <Star className="h-4 w-4 hover:text-yellow-500" />
          </Button>
          <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} language={language} />
        </div>
      </header>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <main className="flex-grow flex flex-col items-center justify-between p-2">
        <div className="w-full max-w-xs">
          <div className="flex justify-center mb-2">
            <Button
              onClick={() => setSelectedDial("forYou")}
              variant={selectedDial === "forYou" ? "default" : "outline"}
              className={`text-xs py-1 px-2 rounded-tl-md rounded-br-md ${
                selectedDial === "forYou" ? "bg-gold text-navy-blue font-bold border-2 border-gold" : "bg-navy-blue text-gold border-2 border-b-0 border-r-0 border-gold"
              }`}
            >
              {language === "es" ? "Para Ti" : "For You"}
            </Button>
            <Button
              onClick={() => setSelectedDial("allServices")}
              variant={selectedDial === "allServices" ? "default" : "outline"}
              className={`text-xs py-1 px-2 rounded-tr-md rounded-bl-md ${
                selectedDial === "allServices" ? "bg-gold text-navy-blue font-bold border-2 border-gold" : "bg-navy-blue text-gold border-2 border-b-0 border-l-0 border-gold"
              }`}
            >
              {language === "es" ? "Todos los Servicios" : "All Services"}
            </Button>
          </div>
          <div
            className="aspect-square relative bg-navy-blue border-2 border-t-0 border-gold rounded-b-md overflow-hidden"
            style={{ marginTop: "-2px" }}
          >
            {selectedDial === "forYou" ? (
              <QuadrantDial
                onSelectQuadrant={handleQuadrantSelect}
                onGoToServices={handleGoToServices}
                buttonRadius={30}
                showWhiteBorders={true}
                language={language}
              />
            ) : (
              <AllServicesDial
                onSelectQuadrant={handleQuadrantSelect}
                onFindInfo={handleFindInfo}
                buttonRadius={30}
                showWhiteBorders={true}
              />
            )}
          </div>
        </div>
        <div className="mt-2 flex justify-center space-x-2">
          <Button className="bg-gold text-navy-blue hover:bg-yellow-400 text-xs py-1 px-2">
            {language === "es" ? "Ayuda en Vivo" : "Live Help"}
          </Button>
          <Button className="bg-gold text-navy-blue hover:bg-yellow-400 text-xs py-1 px-2">
            {language === "es" ? "Contáctenos" : "Contact Us"}
          </Button>
        </div>
      </main>
    </div>
  )
}

