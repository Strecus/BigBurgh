import type React from "react"
import { useState, useEffect } from "react"

interface AllServicesDialProps {
  onSelectQuadrant: (section: string) => void
  onFindInfo: () => void
  buttonRadius?: number
  showWhiteBorders?: boolean
}

const AllServicesDial: React.FC<AllServicesDialProps> = ({
  onSelectQuadrant,
  onFindInfo,
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
                fill="#FFD700"
                stroke={showWhiteBorders ? "#FFFFFF" : "#000080"}
                strokeWidth={showWhiteBorders ? "1" : "3"}
                cursor="pointer"
              />
              <text
                x={section.textX}
                y={section.textY}
                textAnchor="middle"
                fill="white"
                fontSize="10"
                pointerEvents="none"
              >
                {section.name.split(" ").map((word, i) => (
                  <tspan key={i} x={section.textX} dy={i ? "1.2em" : "0"}>
                    {word}
                  </tspan>
                ))}
              </text>
            </g>
          )
        })}
        <circle cx="102" cy="102" r="15" fill="white" stroke="#000080" strokeWidth="2" />
        <g transform={`rotate(${pointerAngle} 102 102)`}>
          <path d="M 102 102 L 98 82 L 102 78 L 106 82 Z" fill="#FFD700" stroke="#000080" strokeWidth="1" />
          <rect x="101" y="82" width="2" height="20" fill="#FFD700" stroke="#000080" strokeWidth="1" />
        </g>
        {selectedSection && (
          <g onClick={onFindInfo} cursor="pointer">
            <circle cx="102" cy="102" r={buttonRadius} fill="#FF0000" opacity="0.8" />
            <text
              x="102"
              y="102"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="white"
              fontSize="8"
              fontWeight="bold"
            >
              Find Info
            </text>
          </g>
        )}
      </svg>
    </div>
  )
}

export default AllServicesDial

