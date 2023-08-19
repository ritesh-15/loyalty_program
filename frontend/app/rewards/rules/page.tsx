import React from "react"

function Rules() {
  return (
    <div className="bg-white shadow-md p-4 w-full max-w-[650px] mx-auto">
      <h1 className="text-3xl">Rules and guidelines</h1>
      <ul className="flex flex-col gap-2 mt-4">
        <li>
          - Earn tokens by making purchases over Rs 1000, referring new users,
          and engaging with the platform.
        </li>
        <li>
          - Tokens automatically decay over time (after 30 days) if not used, so
          stay active to maintain their value.
        </li>
        <li>- Redeem tokens for rewards from our partner brands and sellers</li>
        <li>
          - Refer others to earn extra 10 FC tokens when they engage with the
          platform
        </li>
        <li>
          - Blockchain technology ensures secure and transparent transactions.
        </li>
      </ul>
    </div>
  )
}

export default Rules
