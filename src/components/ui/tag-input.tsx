import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

interface TagInputProps {
  tags: string[]
  onTagsChange: (tags: string[]) => void
  placeholder?: string
  maxTags?: number
  className?: string
}

export function TagInput({
  tags,
  onTagsChange,
  placeholder = "Add tags...",
  maxTags,
  className,
}: TagInputProps) {
  const [inputValue, setInputValue] = React.useState("")
  const [isInputFocused, setIsInputFocused] = React.useState(false)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      addTag()
    } else if (e.key === "Backspace" && !inputValue && tags.length > 0) {
      removeTag(tags.length - 1)
    }
  }

  const addTag = () => {
    const newTag = inputValue.trim()
    if (newTag && !tags.includes(newTag) && (!maxTags || tags.length < maxTags)) {
      onTagsChange([...tags, newTag])
      setInputValue("")
    }
  }

  const removeTag = (indexToRemove: number) => {
    onTagsChange(tags.filter((_, index) => index !== indexToRemove))
  }

  const handleInputBlur = () => {
    setIsInputFocused(false)
    if (inputValue.trim()) {
      addTag()
    }
  }

  return (
    <div 
      className={cn(
        "flex min-h-[40px] w-full flex-wrap gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
        isInputFocused && "ring-2 ring-ring ring-offset-2",
        className
      )}
      onClick={() => document.getElementById("tag-input")?.focus()}
    >
      {tags.map((tag, index) => (
        <Badge
          key={index}
          variant="secondary"
          className="flex items-center gap-1 pr-1 text-xs"
        >
          {tag}
          <button
            type="button"
            className="ml-1 h-3 w-3 rounded-full hover:bg-muted-foreground/20 flex items-center justify-center"
            onClick={(e) => {
              e.stopPropagation()
              removeTag(index)
            }}
          >
            <X className="h-2 w-2" />
          </button>
        </Badge>
      ))}
      <Input
        id="tag-input"
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsInputFocused(true)}
        onBlur={handleInputBlur}
        placeholder={tags.length === 0 ? placeholder : ""}
        className="flex-1 min-w-[120px] border-0 p-0 h-6 focus-visible:ring-0 focus-visible:ring-offset-0"
        disabled={maxTags ? tags.length >= maxTags : false}
      />
      {maxTags && (
        <span className="text-xs text-muted-foreground self-center">
          {tags.length}/{maxTags}
        </span>
      )}
    </div>
  )
}