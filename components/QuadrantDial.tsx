import { group } from "console"
import type React from "react"
import { useState, useEffect } from "react"
import { text } from "stream/consumers"

interface QuadrantDialProps {
  onSelectQuadrant: (quadrant: string, group: string) => void
  onGoToServices: () => void
  buttonRadius?: number
  showWhiteBorders?: boolean
  language?: "en" | "es"
  setIsSelected: (value: boolean) => void
  onLiveHelp: () => void
  onContactUs: () => void
}

const QuadrantDial: React.FC<QuadrantDialProps> = ({
  onSelectQuadrant,
  onGoToServices,
  buttonRadius = 40,
  showWhiteBorders = false,
  language,
  setIsSelected,
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
      name: "Male",
      path: "M 0 0 L 101 0 L 101 28 A 75 75 0 0 1 26 101 L 0 101 Z",
      textX: 35,
      textY: 25,
      group: "male",
      isBackground: true,
      fontSize: 15,
      text: { en: "Male", es: "Masculino" }
    },
    {
      name: "M",
      textX: 33,
      textY: 45,
      group: "male",
      isBackground:true,
      isBold: true,
      fontSize: 20
    },
    {
      name: "35+",
      path: "M 101 101 L 26 101 A 75 75 0 0 1 48 48 L 103 101 Z",
      angle: 288,
      textX: 55,
      textY: 85,
      isBackground: false,
      group: "male",
    },
    {
      name: "18-34",
      path: "M 101 101 L 101 28 A 75 75 0 0 0 48 48 L 103 103 Z",
      angle: 348,
      textX: 83,
      textY: 55,
      group: "male",
    },


    {
      name: "Female",
      path: "M 204 0 L 103 0 L 103 28 A 75 75 0 0 1 178 101 L 204 101 L 204 0 Z",
      textX: 170,
      textY: 25,
      group: "female",
      isBackground: true,
      fontSize: 15,
      text: { en: "Female", es: "Femenino" }
    },
    {
      name: "F",
      textX: 170,
      textY: 45,
      group: "female",
      isBackground: true,
      isBold: true,
      fontSize: 20
    },
    {
      name: "35+",
      path: "M 103 101 L 156 48 A 75 75 0 0 1 178 101 L 103 101 Z",
      angle: 67,
      textX: 145,
      textY: 85,
      group: "female",
    },
    {
      name: "18-34",
      path: "M 103 103 L 103 28 A 75 75 0 0 1 156 48 L 103 103 Z",
      angle: 22,
      qAngle: 68,
      textX: 120,
      textY: 55,
      group: "female",
    },



    {
      name: "Vets",
      path: "M 103 103 L 26 103 A 75 75 0 0 0 46 154 L 103 98 Z",
      angle: 250,
      textX: 50,
      textY: 123,
      group: "other",
    },
    {
      name: "Immigrants",
      path: "M 101 103 L 48 157 A 75 75 0 0 0 101 178 L 101 103",
      angle: 203,
      textX: 82,
      textY: 147,
      group: "other",
      text: {en: "Immigrants",es: "Inmigrantes"}
    },
   





    {
      name: "Seniors",
      path: "M 104 102 L 104 178 A 75 75 0 0 0 156 158 L 104 102 Z",
      angle: 156,
      textX: 123,
      textY: 150,
      group: "other",
      text: { en: "Seniors", es: "Mayores" }
    },
    {
      name: "Families",
      path: "M 101 103 L 178 103 A 75 75 0 0 1 158 155 L 101 96 Z",
      angle: 112,
      textX: 150,
      textY: 123,
      group: "other",
      text: { en: "Families", es: "Familias" }
    }
  ]

  const handleSegmentClick = (segment: string, group: string) => {
    console.log("Clicked Segment:", segment, "Group:", group); // Debugging line
    const selectedSegment = segments.find((s) => s.name === segment && s.group === group);
    if (selectedSegment && !selectedSegment.isBackground) {
      setActiveSegment(segment);
      setActiveSegmentGroup(group);
      onSelectQuadrant(segment, group);
      setIsSelected(true);
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

  const getSegmentText = (segment: any, language: string | undefined) => {
    const textContent = segment.text ? segment.text[language || "en"] : segment.name;
    if (segment.name==="Immigrants"){
      const refugeestxt = language==="en" ? "& Refugees" : "y Refugiados" ;
      return (
        <>
          <tspan>{textContent}</tspan>
          <tspan dx="-6em" dy="1.2em">{refugeestxt}</tspan>
        </>
      );
    }
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
              <tspan x="102" dy="-2" fill="#1663cf">{language === "es" ? "Ir a" : "Go To"}</tspan>
              <tspan x="102" dy="1.5em" fill="#1663cf">{language === "es" ? "Servicios" : "Services"}</tspan>
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
            rx="5"  // Beveled corners on the right side
            className={isLiveHelpHovered ? "hovered" : ""} 
            fill={isLiveHelpHovered ? "#1663cf" : "#FFD700"} 
          />
          <text x={51} y={195} textAnchor="middle" fill="black" fontSize="8" fontFamily="Helvetica" fontWeight="bold">Live Help</text>
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
            rx="5"  // Beveled corners on the right side
            className={isContactUsHovered ? "hovered" : ""} 
            fill={isContactUsHovered ? "#1663cf" : "#FFD700"} 
          />
          <text x={153} y={195} textAnchor="middle" fill="black" fontSize="8" fontFamily="Helvetica" fontWeight="bold">Contact Us</text>
        </g>
      </svg>
    </div>
  )
}

export default QuadrantDial

