import { useEffect, useMemo, useState, useCallback } from "react"

const colors = ["red", "black", "blue", "magenta", "pink", "yellow", "green"]

const rawWord =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

const getRandomColor = (excludeColor?: string) => {
  const availableColors = excludeColor
    ? colors.filter((c) => c !== excludeColor)
    : colors
  return availableColors[Math.floor(Math.random() * availableColors.length)]
}

const createFormattedWords = (text: string) => {
  const words = text.split(" ")
  const result: Array<{ id: string; word: string; color: string }> = []
  
  words.forEach((word, index) => {
    const prevColor = index > 0 ? result[index - 1].color : undefined
    result.push({
      id: `${word}-${index}`,
      word,
      color: getRandomColor(prevColor),
    })
  })
  
  return result
}

const Blinking = () => {
  const initialWords = useMemo(() => createFormattedWords(rawWord), [])
  const [words, setWords] = useState(initialWords)

  const updateColors = useCallback(() => {
    setWords((prevWords) =>
      prevWords.map((w, index) => {
        const prevColor = index > 0 ? prevWords[index - 1].color : undefined
        return {
          ...w,
          color: getRandomColor(prevColor),
        }
      })
    )
  }, [])

  useEffect(() => {
    const interval = setInterval(updateColors, 1000)
    return () => clearInterval(interval)
  }, [updateColors])

  return (
    <div>
      {words.map((w) => (
        <span
          key={w.id}
          style={{
            color: w.color,
            transition: "color 0.3s ease",
          }}
        >
          {w.word}{" "}
        </span>
      ))}
    </div>
  )
}

export default Blinking
