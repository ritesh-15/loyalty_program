"use client"

import qs from "qs"

export default function Referrals() {
  const query = qs.stringify({}, { encodeValuesOnly: true })

  return (
    <section>
      <div className="flex items-center justify-between">
        <div className="">
          <h1 className="text-2xl font-bold">Referrls</h1>
          <p className="">Approve the referral reward for users</p>
        </div>
      </div>
    </section>
  )
}
