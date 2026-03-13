import { Button } from "./button"

interface OptionSelectorProps<T extends string> {
  label: string
  options: readonly T[]
  selectedOption: T
  onSelect: (option: T) => void
  displayNames?: Record<T, string>
}

export function OptionSelector<T extends string>({
  label,
  options,
  selectedOption,
  onSelect,
  displayNames,
}: OptionSelectorProps<T>) {
  return (
    <div className='w-full'>
      <label className='block text-sm font-semibold text-foreground mb-3'>
        {label}
      </label>
      <div className='flex gap-2 flex-wrap'>
        {options.map((option) => (
          <Button
            key={option}
            variant={selectedOption === option ? "default" : "outline"}
            onClick={() => onSelect(option)}
            className="transition-all"
          >
            {displayNames?.[option] || option}
          </Button>
        ))}
      </div>
    </div>
  )
}
