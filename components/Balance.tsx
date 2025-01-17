interface BalanceProps {
  balance: number
  borrowed: number
}

export default function Balance({ balance, borrowed }: BalanceProps) {
  return (
    <div className="balance-container">
      <p>Balance: {balance} SOL</p>
      {borrowed > 0 && (
        <div>
          <p>Borrowed: {borrowed} SOL</p>
          <div className="h-2 bg-gray-200 rounded">
            <div 
              className="h-full bg-blue-500 rounded" 
              style={{ width: `${(balance / borrowed) * 100}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  )
}

