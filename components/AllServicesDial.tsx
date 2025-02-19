import { group } from "console"
import type React from "react"
import { useState, useEffect } from "react"
import { text } from "stream/consumers"

interface AllServiceDialProps {
  onSelectQuadrant: (quadrant: string, group: string) => void
  onGoToServices: () => void
  buttonRadius?: number
  showWhiteBorders?: boolean
  language?: "en" | "es"
  onLiveHelp: () => void
  onContactUs: () => void
}

const AllServiceDial: React.FC<AllServiceDialProps> = ({
  onSelectQuadrant,
  onGoToServices,
  buttonRadius = 40,
  showWhiteBorders = false,
  language,
  onLiveHelp,
  onContactUs,
}) => {
  
  const [pointerAngle, setPointerAngle] = useState(0)
  const [activeSegment, setActiveSegment] = useState<string | null>(null)
  const [activeSegmentGroup, setActiveSegmentGroup] = useState<string | null>(null)
  const [isLiveHelpHovered, setLiveHelpHovered] = useState(false);
  const [isContactUsHovered, setContactUsHovered] = useState(false);

  const segments = [


    {
      name: "Jobs + School",
      translations: { en: "Jobs + School", es: "Trabajos + Escuela" },
      angle: 25,
      textX: 125,
      textY: 60,
      path: "M 104 102 L 104 27 A 75 75 0 0 1 157 51 L 100 100 Z",
      group: "Experts",
    },
    {
      name: "Acts + Events",
      translations: { en: "Acts + Events", es: "Actos + Eventos" },
      angle: 60,
      textX: 160,
      textY: 80,
      path: "M 102 97 L 157 51 A 75 75 0 0 1 176 93 L 102 99 Z",
      group: "Experts",
    },
    {
      name: "Finicial + legal help",
      translations: { en: "Financial + Legal Help", es: "Ayuda Financiera + Legal" },
      angle: 90,
      textX: 160,
      textY: 110,
      path: "M 100 98 L 176 93 A 75 75 0 0 1 168 138 L 97 97 Z",
      group: "Experts",
    },

    {
      name: "Experts",
      translations: { en: "Experts", es: "Expertos" },
      path: "M 104 102 L 104 76 A 26 26 0 0 1 124.5 113 L 97 97 Z",
      isBackground: true,
    },






    {
      name: "OverNight",
      translations: { en: "OverNight", es: "Noche" },
      angle: 215,
      textX: 65,
      textY: 145,
      path: "M 102 102 L 38 142.5 A 75 75 0 0 0 77 173.9 L 100 102",
      group: "Housing",
    },
    {
      name: "DayTime",
      translations: { en: "DayTime", es: "Día" },
      angle: 180,
      textX: 102,
      textY: 160,
      path: "M 100 102 L 77 173.9 A 75 75 0 0 0 126 173.7 L 100 102",
      group: "Housing",
    },
    {
      name: "Crisis",
      translations: { en: "Crisis", es: "Crisis" },
      angle: 145,
      textX: 135,
      textY: 145,
      path: "M 100 102 L 126 173.7 A 75 75 0 0 0 166 142 L 100 102",
      group: "Housing",
    },

    {
      name: "Housing",
      translations: { en: "Housing", es: "Vivienda" },
      path: "M 123 116 A 26 26 0 0 1 80 116 L 101 102 Z",
      isBackground: true,
    },






    {
      name: "Goceries",
      translations: { en: "Groceries", es: "Abarrotes" },
      angle: 260,
      textX: 50,
      textY: 112,
      path: "M 101 102 L 28 93.5 A 75 75 0 0 0 36 138 L 98 102",
      group: "Basics",
    },
    {
      name: "Health",
      translations: { en: "Health", es: "Salud" },
      angle: 330,
      textX: 80,
      textY: 60,
      path: "M 101 102 L 101 27 A 75 75 0 0 0 47 52 L 98 102",
      group: "Basics",
    },{
      name: "Meals",
      translations: { en: "Meals", es: "Comidas" },
      angle: 295,
      textX: 55,
      textY: 85,
      path: "M 101 102 L 47 52 A 75 75 0 0 0 28 93.5 L 98 102",
      group: "Basics",
    },

    {
      name: "Basics",
      translations: { en: "Basics", es: "Básicos" },
      path: "M 101 102 L 101 76 A 26 26 0 0 0 79 113 L 100 100 Z",
      isBackground: true,
    },
  ]

  const handleSegmentClick = (segment: string, group: string) => {
    console.log("Clicked Segment:", segment, "Group:", group); // Debugging line
    const selectedSegment = segments.find((s) => s.name === segment && s.group === group);
    if (selectedSegment && !selectedSegment.isBackground) {
      setActiveSegment(segment);
      setActiveSegmentGroup(group);
      onSelectQuadrant(segment, group);
    }
  }

  useEffect(() => {
    let animationFrameId: number

    const animatePointer = () => {
      const targetAngle = segments.find((s) => s.name === activeSegment && s.group === activeSegmentGroup )?.angle || 0
      
      // Calculate the shortest path to the target angle
      let diff = targetAngle - pointerAngle
      
      // Adjust the difference to take the shortest path
      if (diff > 180) {
        diff -= 360
      } else if (diff < -180) {
        diff += 360
      }

      // Smoother animation with smaller step size
      const step = diff * 0.08  // Reduced from 0.1 to 0.08 for smoother motion

      if (Math.abs(diff) > 0.5) {  // Reduced threshold for smoother finish
        setPointerAngle((prevAngle) => {
          let newAngle = prevAngle + step
          // Normalize angle to stay within 0-360 range
          if (newAngle < 0) newAngle += 360
          if (newAngle >= 360) newAngle -= 360
          return newAngle
        })
        animationFrameId = requestAnimationFrame(animatePointer)
      } else {
        setPointerAngle(targetAngle)
      }
    }

    animationFrameId = requestAnimationFrame(animatePointer)

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [ segments, pointerAngle])

  useEffect(() => {
    // This effect will run whenever the language changes
    setActiveSegment(null); // Reset active segment when language changes
  }, [language]);

  const getSegmentText = (segment: any, language: string | undefined) => {
    const textContent = segment.translations ? segment.translations[language || "en"] : segment.name;
    return <tspan>{textContent}</tspan>;
  }

  return (
    <div className="relative w-full h-full">
      <svg viewBox="0 0 204 204" className="w-full h-full">
        <rect x="0" y="0" width="204" height="204" fill="#EDEEF0" />
        {segments.map((segment, index) => (
          <g key={index} onClick={segment.isBackground ? undefined : () => handleSegmentClick(segment.name, segment.group)}>
            <path
              d={segment.path}
              fill={segment.isBackground ? "#EDEEF8" : (activeSegment === segment.name && activeSegmentGroup === segment.group) ? "#000000" : "#FFFFFF"}
              stroke="#000000"
              strokeWidth={showWhiteBorders ? "1" : "3"}
              cursor={segment.isBackground ? "default" : "pointer"}
            />
            <text
              x={segment.textX}
              y={segment.textY}
              textAnchor="middle"
              fill={activeSegment === segment.name && segment.group === activeSegmentGroup ? "gold" : "black"}
              fontSize={segment.fontSize ? segment.fontSize : "6"}
              fontFamily="Arial"
              fontWeight={segment.isBold ? "bold" : "normal"}
            >
              {getSegmentText(segment, language)}
            </text>
          </g>
        ))}
        <g transform={`rotate(${pointerAngle} 102 102)`}>
          <path 
            d="M 98 90 L 102 81 L 106 90 Z" 
            fill="#FFD700"
          />
        </g>
        {activeSegment ? (
          <g onClick={onGoToServices} cursor="pointer">
            <circle cx="102" cy="102" r="15" fill="#FFD700" opacity="1" />
            <text
              x="102"
              y="102"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="black"
              fontSize="4"
              fontWeight="bold"
            >
              <tspan x="102" dy="-2" fill="#1663cf">Go To</tspan>
              <tspan x="102" dy="1.5em" fill="#1663cf">Page</tspan>
            </text>
          </g>
        ) : (
          <circle 
            cx="102" 
            cy="102" 
            r="15" 
            fill="#FFD700"
          />
        )}
        <g 
          onClick={onLiveHelp} 
          cursor="pointer" 
          onMouseEnter={() => setLiveHelpHovered(true)} 
          onMouseLeave={() => setLiveHelpHovered(false)}
        >
          <rect 
            x={0} 
            y={184} 
            width="102" 
            height="20" 
            className={isLiveHelpHovered ? "hovered" : ""} 
            fill={isLiveHelpHovered ? "#1663cf" : "#FFD700"} 
          />
          <text x={51} y={195} textAnchor="middle" fill="black" fontSize="8" fontFamily="Helvetica" fontWeight="bold">{language === "es" ? "Ayuda en Vivo" : "Live Help"}</text>
        </g>
        <g 
          onClick={onContactUs} 
          cursor="pointer" 
          onMouseEnter={() => setContactUsHovered(true)} 
          onMouseLeave={() => setContactUsHovered(false)}
        >
          <rect 
            x={103} 
            y={184} 
            width="101" 
            height="20" 
            className={isContactUsHovered ? "hovered" : ""} 
            fill={isContactUsHovered ? "#1663cf" : "#FFD700"} 
          />
          <text x={153} y={195} textAnchor="middle" fill="black" fontSize="8" fontFamily="Helvetica" fontWeight="bold">{language === "es" ? "Contáctanos" : "Contact Us"}</text>
        </g>
        <g>
          <defs>
            <path id="circle-path" d="M 102 87 A 15 15 0 1 1 102 117 A 15 15 0 1 1 102 87" />
          </defs>
          <text fontSize="6" fontFamily="Arial" fontWeight="normal" dy="-3">
            <textPath href="#circle-path" startOffset="84%" textAnchor="middle">
              {language === "es" ? "Básicos" : "Basics"}
            </textPath>
          </text>
          <text fontSize="6" fontFamily="Arial" fontWeight="normal" dy="-3">
            <textPath href="#circle-path" startOffset="18%" textAnchor="middle">
              {language === "es" ? "Expertos" : "Experts"}
            </textPath>
          </text>

        </g>
        <defs>
            <path id="circle-path" d="M 102 87 A 15 15 0 1 1 102 117 A 15 15 0 1 1 102 87" />
          </defs>
        <text fontSize="6" fontFamily="Arial" fontWeight="normal" dy="-3">
            <textPath href="#circle-path" startOffset="50%" textAnchor="middle">
              {language === "es" ? "Cama" : "Housing"}
            </textPath>
          </text>
      </svg>
    </div>
  )
}

export default AllServiceDial

