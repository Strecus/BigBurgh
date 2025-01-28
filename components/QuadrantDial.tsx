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
      isBackground:true,
      isBold: true,
      fontSize: 20
    },
    {
      name: "35+",
      path: "M 101 103 L 26 103 A 75 75 0 0 1 48 48 L 103 103 Z",
      angle: 288,
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
      name: "Female",
      path: "M 204 0 L 103 0 L 103 28 A 75 75 0 0 1 178 103 L 204 103 L 204 0 Z",
      textX: 175,
      textY: 25,
      group: "female",
      isBackground: true,
      fontSize: 15
    },
    {
      name: "F",
      textX: 179,
      textY: 45,
      group: "female",
      isBackground: true,
      isBold: true,
      fontSize: 20
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
  }, [selectedQuadrant, segments, pointerAngle])

  return (
    <div className="relative w-full h-full">
      <svg viewBox="0 0 204 204" className="w-full h-full">
        <rect x="0" y="0" width="204" height="204" fill="#EDEEF0" />
        {segments.map((segment, index) => (
          <g key={index} onClick={segment.isBackground ? undefined : () => handleSegmentClick(segment.name)}>
            <path
              d={segment.path}
              fill={segment.isBackground ? "#EDEEF8" : (activeSegment === segment.name ? "#0000FF" : "#FFFFFF")}
              stroke="#000000"
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
        <g transform={`rotate(${pointerAngle} 102 102)`}>
          <path 
            d="M 98 90 L 102 81 L 106 90 Z" 
            fill="#FFD700"
          />
        </g>
        {selectedQuadrant ? (
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
              <tspan x="102" dy="-2" fill="blue">Go To</tspan>
              <tspan x="102" dy="1.5em" fill="blue">Services</tspan>
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
      </svg>
    </div>
  )
}

export default QuadrantDial

