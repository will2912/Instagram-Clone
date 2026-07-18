"use client";

import { Star } from "lucide-react";
import { useRef, useState } from "react";

type RatingSliderProps = {
  initialRating?: number | null;
  averageRating?: number;
  onRatingChange?: (rating: number) => void;
};

export default function RatingSlider({
  initialRating = null,
  averageRating = 0,
  onRatingChange,
}: RatingSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedRating, setSelectedRating] = useState<number | null>(
    initialRating
  );
  const [previewRating, setPreviewRating] = useState(
    initialRating || 5
  );

  function calculateRating(clientY: number) {
    const slider = sliderRef.current;

    if (!slider) return;

    const rect = slider.getBoundingClientRect();

    // Distance of pointer from the top of slider
    const pointerPosition = clientY - rect.top;

    // Convert pointer position into a value between 0 and 1
    const percentage = pointerPosition / rect.height;

    // Top should be 10 and bottom should be 1
    const rating = 10 - Math.floor(percentage * 10);

    // Protect value so it always remains between 1 and 10
    const safeRating = Math.min(10, Math.max(1, rating));

    setPreviewRating(safeRating);
  }

  function handlePointerDown(
    event: React.PointerEvent<HTMLButtonElement>
  ) {
    event.preventDefault();

    setIsOpen(true);

    // Keep receiving pointer events even when pointer leaves the button
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(
    event: React.PointerEvent<HTMLButtonElement>
  ) {
    if (!isOpen) return;

    calculateRating(event.clientY);
  }

  function handlePointerUp(
    event: React.PointerEvent<HTMLButtonElement>
  ) {
    if (!isOpen) return;

    setSelectedRating(previewRating);
    setIsOpen(false);

    onRatingChange?.(previewRating);

    event.currentTarget.releasePointerCapture(event.pointerId);
  }

  function handleNumberClick(rating: number) {
    setPreviewRating(rating);
    setSelectedRating(rating);
    setIsOpen(false);

    onRatingChange?.(rating);
  }

  return (
    <div className="relative flex flex-col items-center">
      {/* VERTICAL SLIDER */}
      {isOpen && (
  <div
    ref={sliderRef}
    className="
absolute
left-1/2
top-1/2
z-50
flex
h-72
w-8             // was w-16
-translate-x-1/2
-translate-y-[48%]
flex-col
items-center
justify-between
rounded-full
border-4         // thicker border
border-white/70
bg-transparent
px-2    // remove black background
py-2
backdrop-blur-sm  // optional
"
  >
    {Array.from({ length: 10 }, (_, index) => {
      const rating = 10 - index;
      const isActive = previewRating === rating;

      return (
        <button
          key={rating}
          type="button"
          onClick={() => handleNumberClick(rating)}
          className={`
            flex h-7 w-10 items-center justify-center
            rounded-full text-sm font-semibold transition
            ${
              isActive
                ? "scale-110 bg-gradient-to-r from-pink-500 to-orange-400 text-white shadow-lg"
                : "text-white/70 hover:bg-white/10 hover:text-white"
            }
          `}
        >
          {rating}
        </button>
      );
    })}
  </div>
)}

      {/* MAIN RATING BUTTON */}
      <button
        type="button"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => setIsOpen(false)}
        className={`
          flex h-11 w-11 touch-none items-center justify-center
          rounded-full border transition active:scale-90
          ${
            selectedRating
              ? "border-orange-300 bg-gradient-to-br from-pink-500 to-orange-400"
              : "border-white/30 bg-black/30 hover:bg-black/50"
          }
        `}
        aria-label="Rate this post"
      >
        {selectedRating ? (
          <span className="text-sm font-bold text-white">
            {selectedRating}
          </span>
        ) : (
          <Star size={27} className="text-white" />
        )}
      </button>

      {/* SCORE UNDER BUTTON */}
      <span className="mt-1 text-xs font-medium text-white">
        {selectedRating ?? averageRating.toFixed(1)}
      </span>
    </div>
  );
}