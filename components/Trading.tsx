interface TradingProps {
  onTrade: (amount: number) => void
}

export default function Trading({ onTrade }: TradingProps) {
  const handleTrade = () => {
    const amount = Math.random() > 0.5 ? 2 : -2
    onTrade(amount)
  }

  return (
    <div className="trading-container">
      <button onClick={handleTrade} className="bg-blue-500 text-white px-4 py-2 rounded">
        Trade
      </button>
    </div>
  )
}

