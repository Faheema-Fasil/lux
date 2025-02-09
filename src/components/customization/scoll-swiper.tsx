import { useState, useRef } from 'react';
import { Button } from '@mui/material';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Image from 'next/image';

interface CustomOption {
  id: string;
  label: string;
  value: string;
  price?: number;
  image?: string;
  selected?: boolean;
}

interface Section {
  id: string;
  title: string;
  options: CustomOption[];
}

export default function CustomCardSwiper({ sections }: { sections: Section[] }) {
  const [currentSection, setCurrentSection] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const handlePrev = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      const container = scrollContainerRef.current;
      if (direction === 'left') {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="custom-card-container max-w-[800px] mx-auto bg-white rounded-lg shadow-lg">
      <div className="section-header border-b border-gray-200 p-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {sections[currentSection].title}
        </h2>
      </div>

      <div className="options-wrapper relative">
        <div
          ref={scrollContainerRef}
          className="options-scroll-container flex overflow-x-auto gap-4 p-6 hide-scrollbar"
        >
          {sections[currentSection].options.map((option) => (
            <div
              key={option.id}
              className={`option-card flex-shrink-0 w-[120px] p-4 rounded-lg border-2 transition-all cursor-pointer
                ${option.selected 
                  ? 'border-[#AE9164] bg-[#e9e9e9]' 
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
            >
              {option.image && (
                <div className="mb-2 h-[60px] relative">
                  <Image
                    src={option.image}
                    alt={option.label}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              )}
              <div className="text-center">
                <p className="text-sm font-medium text-gray-800">{option.label}</p>
                {option.price && (
                  <p className="text-xs text-gray-600">+${option.price}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Scroll buttons */}
        <button
          onClick={() => handleScroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 hover:bg-gray-50"
        >
          <KeyboardArrowLeft />
        </button>
        <button
          onClick={() => handleScroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 hover:bg-gray-50"
        >
          <KeyboardArrowRight />
        </button>
      </div>

      {/* Section navigation */}
      <div className="navigation-footer border-t border-gray-200 p-4 flex justify-between">
        <Button
          startIcon={<KeyboardArrowLeft />}
          disabled={currentSection === 0}
          onClick={handlePrev}
          className="text-[#AE9164]"
        >
          Previous
        </Button>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">
            {currentSection + 1} / {sections.length}
          </span>
        </div>
        <Button
          endIcon={<KeyboardArrowRight />}
          disabled={currentSection === sections.length - 1}
          onClick={handleNext}
          className="text-[#AE9164]"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
