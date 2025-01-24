import React from 'react'

interface SpinningDialProps {
  selectedSection: string | null
  onSectionClick: (section: string) => void
}

const SpinningDial: React.FC<SpinningDialProps> = ({ selectedSection, onSectionClick }) => {
  const sections = [
    { name: 'Male (25 & older)', x: 10, y: 10, width: 80, height: 35 },
    { name: 'Female (25 & older)', x: 110, y: 10, width: 80, height: 35 },
    { name: 'Seniors', x: 110, y: 55, width: 80, height: 35 },
    { name: 'Male (24 & younger)', x: 10, y: 55, width: 80, height: 35 },
    { name: 'Female (24 & younger)', x: 110, y: 100, width: 80, height: 35 },
    { name: 'Families', x: 110, y: 145, width: 80, height: 35 },
    { name: 'Veterans', x: 10, y: 100, width: 80, height: 35 },
    { name: 'Immigrants', x: 10, y: 145, width: 80, height: 35 },
  ]

  const getPointerAngle = () => {
    const selectedIndex = sections.findIndex(section => section.name === selectedSection)
    if (selectedIndex === -1) return 0
    return selectedIndex * 45
  }

  return (
    <svg width="200" height="200" viewBox="0 0 200 200">
      {sections.map((section, index) => (
        <g key={index} onClick={() => onSectionClick(section.name)}>
          <rect
            x={section.x}
            y={section.y}
            width={section.width}
            height={section.height}
            fill={selectedSection === section.name ? '#ff9999' : '#99ff99'}
            stroke="#000"
            strokeWidth="2"
            rx="5"
            ry="5"
            cursor="pointer"
          />
          <text
            x={section.x + section.width / 2}
            y={section.y + section.height / 2}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#000"
            fontSize="8"
          >
            {section.name}
          </text>
        </g>
      ))}
      <circle cx="100" cy="100" r="5" fill="#000" />
      {/* Pointer */}
      <line
        x1="100"
        y1="100"
        x2="100"
        y2="50"
        stroke="#ff0000"
        strokeWidth="2"
        transform={`rotate(${getPointerAngle()} 100 100)`}
      />
    </svg>
  )
}

export default SpinningDial

