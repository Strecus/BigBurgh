import type React from "react"
import { useState, useEffect } from "react"

interface AllServicesDialProps {
  onSelectQuadrant: (section: string) => void
  onFindInfo: () => void
  onLiveHelp: () => void
  onContactUs: () => void
  buttonRadius?: number
  showWhiteBorders?: boolean
}

const AllServicesDial: React.FC<AllServicesDialProps> = ({
  onSelectQuadrant,
  onFindInfo,
  onLiveHelp,
  onContactUs,
  buttonRadius = 40,
  showWhiteBorders = false,
}) => {
  const [selectedSection, setSelectedSection] = useState<string | null>(null)
  const [pointerAngle, setPointerAngle] = useState(0)

  const sections = [
    {
      name: "Basics",
      angle: 0,
      textX: 150,
      textY: 70,
    },
    {
      name: "Experts",
      angle: 90,
      textX: 150,
      textY: 150,
    },
    {
      name: "Housing",
      angle: 180,
      textX: 50,
      textY: 150,
    },
    {
      name: "Health",
      angle: 270,
      textX: 50,
      textY: 70,
    },
  ]

  const handleSectionClick = (sectionName: string) => {
    setSelectedSection(sectionName)
    onSelectQuadrant(sectionName)
  }

  useEffect(() => {
    let animationFrameId: number

    const animatePointer = () => {
      const targetAngle = sections.find((s) => s.name === selectedSection)?.angle || 0
      const diff = targetAngle - pointerAngle
      if (Math.abs(diff) > 1) {
        setPointerAngle((prevAngle) => prevAngle + diff * 0.1)
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
  }, [selectedSection, sections, pointerAngle])

  return (
    <div className="relative w-full h-full">
      <svg viewBox="0 0 204 204" className="w-full h-full">
        <rect x="0" y="0" width="204" height="204" fill="#000080" />
        {sections.map((section, index) => {
          const startAngle = index * 90
          const endAngle = (index + 1) * 90
          const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1"

          const startX = 102 + 96 * Math.cos((startAngle * Math.PI) / 180)
          const startY = 102 + 96 * Math.sin((startAngle * Math.PI) / 180)
          const endX = 102 + 96 * Math.cos((endAngle * Math.PI) / 180)
          const endY = 102 + 96 * Math.sin((endAngle * Math.PI) / 180)

          const path = `M 102 102 L ${startX} ${startY} A 96 96 0 ${largeArcFlag} 1 ${endX} ${endY} Z`

          return (
            <g key={index} onClick={() => handleSectionClick(section.name)}>
              <path
                d={path}
                fill="#EDEEF0"
                stroke="#000000"
                strokeWidth={showWhiteBorders ? "1" : "3"}
                cursor="pointer"
              />
              <text
                x={section.textX}
                y={section.textY}
                textAnchor="middle"
                fill={selectedSection === section.name ? "gold" : "black"}
                fontSize="6"
                fontFamily="Arial"
                fontWeight={selectedSection === section.name ? "bold" : "normal"}
              >
                {section.name}
              </text>
            </g>
          )
        })}
        <g transform={`rotate(${pointerAngle} 102 102)`}>
          <path 
            d="M 98 90 L 102 81 L 106 90 Z" 
            fill="#FFD700"
          />
        </g>
        <g onClick={onLiveHelp} cursor="pointer">
          <rect x={0} y={184} width="102" height="20" fill="#FFD700" />
          <text x={51} y={195} textAnchor="middle" fill="black" fontSize="8">Live Help</text>
        </g>
        <g onClick={onContactUs} cursor="pointer">
          <rect x={102} y={184} width="102" height="20" fill="#FFD700" />
          <text x={153} y={195} textAnchor="middle" fill="black" fontSize="8">Contact Us</text>
        </g>
      </svg>
    </div>
  )
}

export default AllServicesDial

