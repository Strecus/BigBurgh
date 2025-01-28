import { group } from "console"
import type React from "react"
import { useState, useEffect } from "react"

interface QuadrantDialProps {
  onSelectQuadrant: (quadrant: string) => void
  onGoToServices: () => void
  buttonRadius?: number
  showWhiteBorders?: boolean
}

const QuadrantDial: React.FC<QuadrantDialProps> = ({
  onSelectQuadrant,
  onGoToServices,
  buttonRadius = 40,
  showWhiteBorders = false,
}) => {
  const [selectedQuadrant, setSelectedQuadrant] = useState<string | null>(null)
  const [pointerAngle, setPointerAngle] = useState(0)
  const [activeSegment, setActiveSegment] = useState<string | null>(null)

  const segments = [
    {
      name: "Male",
      path: "M 0 0 L 101 0 L 101 28 A 75 75 0 0 1 26 103 L 0 103 Z",
      textX: 28,
      textY: 25,
      group: "male",
      isBackground: true,
      fontSize: 15

    },
    {
      name: "M",
      textX: 25,
      textY: 45,
      group: "male",
      isBold: true,
      fontSize: 20
    },
    {
      name: "35+",
      path: "M 101 103 L 26 103 A 75 75 0 0 1 48 48 L 103 103 Z",
      angle: 288,
      qAngle: 150,
      textX: 55,
      textY: 85,
      isBackground: false,
      group: "male",
    },
    {
      name: "18-34",
      path: "M 103 103 L 103 28 A 75 75 0 0 0 48 48 L 103 103 Z",
      angle: 348,
      textX: 83,
      textY: 55,
      group: "male",
    },


    {
      name: "F",
      path: "M 204 0 L 103 0 L 103 28 A 75 75 0 0 1 178 103 L 204 103 L 204 0 Z",
      textX: 179,
      textY: 25,
      isBackground: true,
      group: "female",
    },
    {
      name: "35-59",
      path: "M 103 103 L 156 48 A 75 75 0 0 1 178 103 L 103 103 Z",
      angle: 67,
      textX: 145,
      textY: 85,
      group: "female",
    },
    {
      name: "18 and below",
      path: "M 103 103 L 103 28 A 75 75 0 0 1 156 48 L 103 103 Z",
      angle: 22,
      qAngle: 68,
      textX: 120,
      textY: 50,
      group: "female",
    },



    {
      name: "Vets",
      path: "M 103 103 L 0 103 0 170 L 102 102 Z",
      angle: 250,
      textX: 40,
      textY: 134,
      group: "other",
    },
    {
      name: "Immigrants & Refugees",
      path: "M 102 102 L 30 170 A 96 96 0 0 0 98 196 L 102 102 Z",
      angle: 203,
      textX: 70,
      textY: 164,
      group: "other",
    },





    {
      name: "Seniors 60+",
      path: "M 102 102 L 106 196 A 96 96 0 0 0 174 170 L 102 102 Z",
      angle: 156,
      textX: 134,
      textY: 164,
      group: "other",
    },
    {
      name: "Families",
      path: "M 102 102 L 174 170 A 96 96 0 0 0 196 106 L 102 102 Z",
      angle: 112,
      textX: 164,
      textY: 134,
      group: "other",
    }
  ]

  const handleSegmentClick = (segment: string) => {
    const selectedSegment = segments.find((s) => s.name === segment)
    if (selectedSegment && !selectedSegment.isBackground) {
      setSelectedQuadrant(segment)
      setActiveSegment(segment)
      onSelectQuadrant(segment)
    }
  }

  useEffect(() => {
    let animationFrameId: number

    const animatePointer = () => {
      const targetAngle = segments.find((s) => s.name === selectedQuadrant)?.angle || 0
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
  }, [selectedQuadrant, segments, pointerAngle])

  return (
    <div className="relative w-full h-full">
      <svg viewBox="0 0 204 204" className="w-full h-full">
        <rect x="0" y="0" width="204" height="204" fill="#FFFFFF" />
        {segments.map((segment, index) => (
          <g key={index} onClick={segment.isBackground ? undefined : () => handleSegmentClick(segment.name)}>
            <path
              d={segment.path}
              fill={segment.isBackground ? "#CCCCCC" : (activeSegment === segment.name ? "#000000" : "#AAAAAA")}
              stroke={showWhiteBorders ? "#000000" : "#000000"}
              strokeWidth={showWhiteBorders ? "1" : "3"}
              cursor={segment.isBackground ? "default" : "pointer"}
            />
            <text
              x={segment.textX}
              y={segment.textY}
              textAnchor="middle"
              fill="black"
              fontSize={segment.fontSize ? segment.fontSize : "6"}
              fontFamily="Arial"
              fontWeight={segment.isBold ? "bold" : "normal"}
            >
              {segment.name}
            </text>
          </g>
        ))}
        <circle cx="102" cy="102" r="15" fill="black" stroke="#000000" strokeWidth="2" />
        <g transform={`rotate(${pointerAngle} 102 102)`}>
          <path d="M 98 87 L 102 82 L 104 87 Z" fill="#000000" stroke="#000000" strokeWidth="2" />
          
        </g>
        {selectedQuadrant && (
          <g onClick={onGoToServices} cursor="pointer">
            <circle cx="102" cy="102" r="15" fill="black" opacity="1" />
            <text
              x="102"
              y="102"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="white"
              fontSize="4"
              fontWeight="bold"
            >
              <tspan x="102" dy="-2">Go To</tspan>
              <tspan x="102" dy="1.5em">Services</tspan>
            </text>
          </g>
        )}
      </svg>
    </div>
  )
}

export default QuadrantDial

