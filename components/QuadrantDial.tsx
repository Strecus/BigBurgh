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

  const segments = [
    {
      name: "M",
      path: "M 0 0 L 101 0 L 101 28 A 75 75 0 0 1 26 103 L 0 103 Z",
      angle: 67.5, // Midpoint between 23 and 112
      textX: 55,
      textY: 55,
      isBackground: true,
      group: "male",
    },
    {
      name: "M 35+",
      path: "M 101 103 L 26 103 A 75 75 0 0 1 50 48 L 101 103 Z",
      angle: 112,
      textX: 55,
      textY: 110,
      group: "male",
    },
    {
      name: "F 18-34",
      path: "M 103 103 L 103 28 A 75 75 0 0 0 48 48 L 103 103 Z",
      angle: 23,
      textX: 55,
      textY: 55,
      group: "female",
    },
    {
      name: "F 35-59",
      path: "M 103 103 L 156 48 A 75 75 0 0 1 178 103 L 103 103 Z",
      angle: 337,
      textX: 55,
      textY: 149,
      group: "female",
    },
    {
      name: "F",
      path: "M 204 0 L 103 0 L 103 28 A 75 75 0 0 1 178 103 L 204 103 L 204 0 Z",
      angle: 0, // Midpoint between 337 and 23
      textX: 55,
      textY: 149,
      isBackground: true,
      group: "female",
    },
    {
      name: "Vets",
      path: "M 102 102 L 8 106 A 96 96 0 0 0 30 170 L 102 102 Z",
      angle: 155,
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
      angle: 247,
      textX: 134,
      textY: 164,
      group: "other",
    },
    {
      name: "Families",
      path: "M 102 102 L 174 170 A 96 96 0 0 0 196 106 L 102 102 Z",
      angle: 293,
      textX: 164,
      textY: 134,
      group: "other",
    },
    {
      name: "F 60+",
      path: "M 204 0 L 204 103 L 178 103 A 75 75 0 0 0 103 28 L 103 0 Z",
      angle: 337,
      textX: 153,
      textY: 55,
      isBackground: true,
      group: "female",
    },
  ]

  const handleSegmentClick = (segment: string) => {
    const selectedSegment = segments.find((s) => s.name === segment)
    if (selectedSegment && !selectedSegment.isBackground) {
      setSelectedQuadrant(segment)
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
        <rect x="0" y="0" width="204" height="204" fill="#FF5733" />
        {segments.map((segment, index) => (
          <g key={index} onClick={segment.isBackground ? undefined : () => handleSegmentClick(segment.name)}>
            <path
              d={segment.path}
              fill={segment.isBackground ? "#FFCC00" : "#FFD700"}
              stroke={showWhiteBorders ? "#FFFFFF" : "#000080"}
              strokeWidth={showWhiteBorders ? "1" : "3"}
              cursor={segment.isBackground ? "default" : "pointer"}
            />
            {!segment.isBackground && (
              <text
                x={segment.textX}
                y={segment.textY}
                textAnchor="middle"
                fill="white"
                fontSize="6"
                pointerEvents="none"
              >
                {segment.name.split(" ").map((word, i, arr) => (
                  <tspan key={i} x={segment.textX} dy={i ? "1em" : "0"}>
                    {word}
                  </tspan>
                ))}
              </text>
            )}
          </g>
        ))}
        <circle cx="102" cy="102" r="15" fill="blue" stroke="#000000" strokeWidth="2" />
        <g transform={`rotate(${pointerAngle} 102 102)`}>
          <path d="M 98 87 L 102 82 L 104 87 Z" fill="#blue" stroke="#000080" strokeWidth="2" />
          
        </g>
        {selectedQuadrant && (
          <g onClick={onGoToServices} cursor="pointer">
            <circle cx="102" cy="102" r="15" fill="#red" opacity="1" />
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

