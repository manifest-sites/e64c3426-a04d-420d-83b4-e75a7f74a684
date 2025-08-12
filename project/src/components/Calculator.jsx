import { useState } from 'react'

function Calculator() {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState(null)
  const [operation, setOperation] = useState(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)

  const inputNumber = (num) => {
    if (waitingForOperand) {
      setDisplay(String(num))
      setWaitingForOperand(false)
    } else {
      setDisplay(display === '0' ? String(num) : display + num)
    }
  }

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.')
      setWaitingForOperand(false)
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.')
    }
  }

  const clear = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(false)
  }

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      const newValue = calculate(currentValue, inputValue, operation)

      setDisplay(String(newValue))
      setPreviousValue(newValue)
    }

    setWaitingForOperand(true)
    setOperation(nextOperation)
  }

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue
      case '-':
        return firstValue - secondValue
      case '×':
        return firstValue * secondValue
      case '÷':
        return firstValue / secondValue
      case '=':
        return secondValue
      default:
        return secondValue
    }
  }

  const handleEquals = () => {
    const inputValue = parseFloat(display)

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation)
      setDisplay(String(newValue))
      setPreviousValue(null)
      setOperation(null)
      setWaitingForOperand(true)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/20">
        <div className="w-80">
          {/* Display */}
          <div className="bg-purple-950/50 rounded-2xl p-6 mb-4 border border-purple-300/20">
            <div className="text-right text-white text-4xl font-light min-h-[3rem] flex items-center justify-end overflow-hidden">
              {display}
            </div>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-4 gap-3">
            {/* First Row */}
            <button
              onClick={clear}
              className="col-span-2 bg-purple-600/80 hover:bg-purple-600 text-white font-semibold py-4 rounded-xl transition-colors shadow-lg"
            >
              Clear
            </button>
            <button
              onClick={() => performOperation('÷')}
              className="bg-purple-500/80 hover:bg-purple-500 text-white font-semibold py-4 rounded-xl transition-colors shadow-lg"
            >
              ÷
            </button>
            <button
              onClick={() => performOperation('×')}
              className="bg-purple-500/80 hover:bg-purple-500 text-white font-semibold py-4 rounded-xl transition-colors shadow-lg"
            >
              ×
            </button>

            {/* Second Row */}
            <button
              onClick={() => inputNumber(7)}
              className="bg-purple-400/80 hover:bg-purple-400 text-white font-semibold py-4 rounded-xl transition-colors shadow-lg"
            >
              7
            </button>
            <button
              onClick={() => inputNumber(8)}
              className="bg-purple-400/80 hover:bg-purple-400 text-white font-semibold py-4 rounded-xl transition-colors shadow-lg"
            >
              8
            </button>
            <button
              onClick={() => inputNumber(9)}
              className="bg-purple-400/80 hover:bg-purple-400 text-white font-semibold py-4 rounded-xl transition-colors shadow-lg"
            >
              9
            </button>
            <button
              onClick={() => performOperation('-')}
              className="bg-purple-500/80 hover:bg-purple-500 text-white font-semibold py-4 rounded-xl transition-colors shadow-lg"
            >
              -
            </button>

            {/* Third Row */}
            <button
              onClick={() => inputNumber(4)}
              className="bg-purple-400/80 hover:bg-purple-400 text-white font-semibold py-4 rounded-xl transition-colors shadow-lg"
            >
              4
            </button>
            <button
              onClick={() => inputNumber(5)}
              className="bg-purple-400/80 hover:bg-purple-400 text-white font-semibold py-4 rounded-xl transition-colors shadow-lg"
            >
              5
            </button>
            <button
              onClick={() => inputNumber(6)}
              className="bg-purple-400/80 hover:bg-purple-400 text-white font-semibold py-4 rounded-xl transition-colors shadow-lg"
            >
              6
            </button>
            <button
              onClick={() => performOperation('+')}
              className="bg-purple-500/80 hover:bg-purple-500 text-white font-semibold py-4 rounded-xl transition-colors shadow-lg"
            >
              +
            </button>

            {/* Fourth Row */}
            <button
              onClick={() => inputNumber(1)}
              className="bg-purple-400/80 hover:bg-purple-400 text-white font-semibold py-4 rounded-xl transition-colors shadow-lg"
            >
              1
            </button>
            <button
              onClick={() => inputNumber(2)}
              className="bg-purple-400/80 hover:bg-purple-400 text-white font-semibold py-4 rounded-xl transition-colors shadow-lg"
            >
              2
            </button>
            <button
              onClick={() => inputNumber(3)}
              className="bg-purple-400/80 hover:bg-purple-400 text-white font-semibold py-4 rounded-xl transition-colors shadow-lg"
            >
              3
            </button>
            <button
              onClick={handleEquals}
              className="row-span-2 bg-purple-600/80 hover:bg-purple-600 text-white font-semibold rounded-xl transition-colors shadow-lg"
            >
              =
            </button>

            {/* Fifth Row */}
            <button
              onClick={() => inputNumber(0)}
              className="col-span-2 bg-purple-400/80 hover:bg-purple-400 text-white font-semibold py-4 rounded-xl transition-colors shadow-lg"
            >
              0
            </button>
            <button
              onClick={inputDecimal}
              className="bg-purple-400/80 hover:bg-purple-400 text-white font-semibold py-4 rounded-xl transition-colors shadow-lg"
            >
              .
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Calculator