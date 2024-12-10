import React, { useCallback } from 'react'
import { Slider } from "~/components/ui/slider"
import { Label } from "~/components/ui/label"
import { cn } from "~/lib/utils"

export type SliderData = {
  id: number
  value: number
  label: string
}

interface MultiSliderProps extends React.HTMLAttributes<HTMLDivElement> {
  sliders: SliderData[]
  onValueChange: (newSliders: SliderData[]) => void
}

export const MultiSlider = React.forwardRef<HTMLDivElement, MultiSliderProps>(
  ({ sliders, onValueChange, className, ...props }, ref) => {
    const handleSliderChange = useCallback((id: number, newValue: number) => {
      const oldValue = sliders.find(slider => slider.id === id)?.value || 0
      const difference = newValue - oldValue
      const otherSliders = sliders.filter(slider => slider.id !== id)
    
      // Calculate the total value of other sliders
      const totalOtherValues = otherSliders.reduce((sum, slider) => sum + slider.value, 0)
    
      // If totalOtherValues is 0, distribute evenly
      if (totalOtherValues === 0) {
        const valuePerSlider = (100 - newValue) / otherSliders.length
        const newSliders = sliders.map(slider => 
          slider.id === id ? { ...slider, value: newValue } : { ...slider, value: valuePerSlider }
        )
        onValueChange(newSliders)
        return
      }

      // Calculate the adjustment factor
      const adjustmentFactor = (totalOtherValues - difference) / totalOtherValues

      // Adjust other sliders
      let updatedOtherSliders = otherSliders.map(slider => ({
        ...slider,
        value: Math.max(0, slider.value * adjustmentFactor)
      }))

      // Distribute any remaining difference
      const currentTotal = newValue + updatedOtherSliders.reduce((sum, slider) => sum + slider.value, 0)
      const remainingDifference = 100 - currentTotal

      if (Math.abs(remainingDifference) > 0.01) {
        const distributionFactor = remainingDifference / updatedOtherSliders.length
        updatedOtherSliders = updatedOtherSliders.map(slider => ({
          ...slider,
          value: Math.max(0, Math.min(100, slider.value + distributionFactor))
        }))
      }

      const newSliders = [
        ...updatedOtherSliders,
        { id, value: newValue, label: sliders.find(slider => slider.id === id)?.label || "" }
      ].sort((a, b) => a.id - b.id)

      onValueChange(newSliders)
    }, [sliders, onValueChange])

    return (
      <div 
        ref={ref}
        className={cn("space-y-4", className)} 
        {...props}
      >
        {sliders.map(slider => (
          <div key={slider.id} className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor={`slider-${slider.id}`}>{slider.label}</Label>
              <span className="text-sm font-medium">{slider.value.toFixed(1)}%</span>
            </div>
            <Slider
              id={`slider-${slider.id}`}
              min={0}
              max={100}
              step={0.1}
              value={[slider.value]}
              onValueChange={([value]) => handleSliderChange(slider.id, value)}
            />
          </div>
        ))}
      </div>
    )
  }
)

MultiSlider.displayName = "MultiSlider"

