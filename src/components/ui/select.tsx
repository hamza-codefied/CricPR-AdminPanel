import * as React from 'react'
import { ChevronDown, Check } from 'lucide-react'
import { cn } from '../../utils/cn'

export interface SelectOption {
  value: string
  label: string
}

type ChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => void
type StringHandler = (value: string) => void

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange' | 'children'> {
  options?: SelectOption[]
  children?: React.ReactNode
  onChange?: ChangeHandler | StringHandler
  placeholder?: string
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, children, onChange, placeholder = 'Select...', value, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [selectedValue, setSelectedValue] = React.useState<string>(value as string || '')
    const selectRef = React.useRef<HTMLDivElement>(null)
    const selectElementRef = React.useRef<HTMLSelectElement>(null)

    // Sync with external value changes
    React.useEffect(() => {
      if (value !== undefined) {
        setSelectedValue(value as string)
      }
    }, [value])

    // Get options from props or children
    const selectOptions: SelectOption[] = React.useMemo(() => {
      if (options) return options
      if (children) {
        const childArray = React.Children.toArray(children)
        return childArray
          .filter((child): child is React.ReactElement<{ value?: string; children?: React.ReactNode }> => 
            React.isValidElement(child) && child.type === 'option'
          )
          .map((child) => {
            const props = child.props
            const value = (props?.value as string | undefined) || ''
            const childrenValue = props?.children
            const label = typeof childrenValue === 'string' 
              ? childrenValue 
              : (typeof childrenValue === 'number' 
                ? String(childrenValue) 
                : (props?.value as string | undefined) || '')
            return {
              value,
              label,
            }
          })
      }
      return []
    }, [options, children])

    const selectedOption = selectOptions.find((opt) => opt.value === selectedValue)

    const handleSelect = (optionValue: string) => {
      setSelectedValue(optionValue)
      setIsOpen(false)
      
      // Update the hidden select element for form compatibility
      if (selectElementRef.current) {
        selectElementRef.current.value = optionValue
        // Create and dispatch change event for React Hook Form
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
          window.HTMLSelectElement.prototype,
          'value'
        )?.set
        if (nativeInputValueSetter) {
          nativeInputValueSetter.call(selectElementRef.current, optionValue)
        }
        const event = new Event('change', { bubbles: true })
        selectElementRef.current.dispatchEvent(event)
      }
      
      // onChange is handled by the hidden select element's onChange handler
      // which will trigger React Hook Form's register handler automatically
    }

    // Close on outside click
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
          setIsOpen(false)
        }
      }

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [isOpen])

    // Keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        setIsOpen(!isOpen)
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        if (!isOpen) {
          setIsOpen(true)
        } else {
          const currentIndex = selectOptions.findIndex((opt) => opt.value === selectedValue)
          const nextIndex = currentIndex < selectOptions.length - 1 ? currentIndex + 1 : 0
          handleSelect(selectOptions[nextIndex].value)
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        if (isOpen) {
          const currentIndex = selectOptions.findIndex((opt) => opt.value === selectedValue)
          const prevIndex = currentIndex > 0 ? currentIndex - 1 : selectOptions.length - 1
          handleSelect(selectOptions[prevIndex].value)
        }
      }
    }

    return (
      <div className="relative w-full" ref={selectRef}>
        {/* Hidden select for form compatibility */}
        <select
          ref={(node) => {
            if (typeof ref === 'function') {
              ref(node)
            } else if (ref) {
              ref.current = node
            }
            selectElementRef.current = node
          }}
          value={selectedValue}
          onChange={(e) => {
            setSelectedValue(e.target.value)
            if (onChange) {
              // Call with event (works for React Hook Form)
              (onChange as ChangeHandler)(e)
            }
          }}
          className="sr-only"
          {...props}
        >
          {children}
        </select>

        {/* Custom select button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          className={cn(
            'flex h-10 w-full items-center justify-between rounded-lg border-2 border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-all duration-200',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary',
            'hover:border-primary/50',
            isOpen && 'border-primary ring-2 ring-primary/20',
            'disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          disabled={props.disabled}
        >
          <span className={cn('truncate', !selectedValue && 'text-muted-foreground')}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown
            className={cn(
              'h-4 w-4 text-muted-foreground transition-transform duration-200 flex-shrink-0 ml-2',
              isOpen && 'rotate-180'
            )}
          />
        </button>

        {/* Dropdown menu */}
        {isOpen && (
          <div
            className={cn(
              'absolute z-50 mt-2 w-full rounded-lg border-2 border-borderShadcn/50 bg-popover shadow-xl backdrop-blur-sm',
              'max-h-[300px] overflow-auto'
            )}
            style={{
              animation: 'fadeIn 0.2s ease-out, slideDown 0.2s ease-out',
            }}
          >
            <div className="p-1">
              {selectOptions.length === 0 ? (
                <div className="px-3 py-2 text-sm text-muted-foreground text-center">
                  No options available
                </div>
              ) : (
                selectOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleSelect(option.value)}
                    className={cn(
                      'relative flex w-full cursor-pointer select-none items-center rounded-md px-3 py-2.5 text-sm outline-none',
                      'transition-colors duration-150',
                      'focus:bg-accent focus:text-accent-foreground',
                      'hover:bg-accent hover:text-accent-foreground',
                      selectedValue === option.value && 'bg-primary/10 text-primary font-semibold'
                    )}
                  >
                    <span className="flex-1 text-left">{option.label}</span>
                    {selectedValue === option.value && (
                      <Check className="h-4 w-4 text-primary ml-2 flex-shrink-0" />
                    )}
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    )
  }
)
Select.displayName = 'Select'

export { Select }
