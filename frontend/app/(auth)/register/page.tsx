"use client";
import Button from "@/app/components/button/Button";
import React, { useState } from "react";
import useRegister from "./useRegister";
import Input from "@/app/components/input/Input";
import Link from "next/link";
import ConnectToMetamaskModal from "@/app/components/ConnectToMetamaskModal";
import Modal from "@/app/components/Modal";
import { useWallet } from "@/app/store/WalletStore";
import { formatWalletAddress } from "@/app/utils/formatWalletAddress";
import { useQuery } from "react-query";
import qs from "qs";
import ReferralService from "@/app/services/referral.service";

export default function Register() {
  const { actions, states } = useRegister();
  const { isConnected, walletAddress } = useWallet();
  const [referral, setReferral] = useState<boolean>(false);
  const [referralId, setReferralId] = useState("");

  const query = qs.stringify({
    fields: ["user_id", "refferId", "isAccountCreated"],
    filters: {
      refferId: {
        $eq: referralId,
      },
    },
  });

  useQuery(["referral"], () => ReferralService.checkReferral(query), {
    onSuccess({ data }) {
      console.log("first");
      if (data) {
        console.log(data);
      }
    },
    onError(error) {
      console.log("error", error);
    },
    enabled: referral ? true : false,
  });

  const toggleReferrel = () => {
    setReferral(true);
  };

  return (
    <>
      <section className="min-h-screen w-full flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center bg-white p-4 rounded-md shadow-md w-[95%] max-w-[550px]">
          <h1 className="text-xl font-bold">Hey new to Meta market! 👋</h1>
          <p className="mt-2 max-w-[80%] text-center">
            Create an account and start using now.
          </p>

          <form
            // onSubmit={actions.handleSubmit}
            action=""
            className="mt-4 w-full"
          >
            <div className="mb-4">
              <Input
                placeholder="john doe"
                title="Name"
                type="text"
                name="name"
                onChange={actions.handleChange}
                value={states.values.name}
                error={states.errors.name}
              />
            </div>

            <div className="mb-4">
              <Input
                placeholder="johndoe@gmail.com"
                title="Email address"
                type="email"
                name="email"
                onChange={actions.handleChange}
                value={states.values.email}
                error={states.errors.email}
              />
            </div>

            <div className="mb-4">
              <Input
                placeholder="*********"
                title="Password"
                type="password"
                name="password"
                onChange={actions.handleChange}
                value={states.values.password}
                error={states.errors.password}
              />
            </div>

            {referral ? (
              <div className="mb-4">
                <Input
                  placeholder="referral_code"
                  title="Referral code"
                  type="text"
                  name="Referral"
                  onChange={(e) => {
                    setReferralId(e.target.value);
                  }}
                  value={referralId}
                />
              </div>
            ) : (
              <div className="mb-4 flex flex-col gap-1 p-2 w-fit">
                <Input
                  title="Have referral code"
                  onChange={toggleReferrel}
                  type="checkbox"
                />
              </div>
            )}

            {walletAddress && (
              <div className="mb-4 flex flex-col gap-1 p-2 rounded-md border w-fit">
                <span>Connected wallet address</span>
                <p>{formatWalletAddress(walletAddress)}</p>
              </div>
            )}

            <Button
              className="m-4"
              onSubmit={(e) => {
                e.preventDefault();
                toggleReferrel;
              }}
            >
              Check Referral Code
            </Button>

            {/* <Button loading={states.isLoading} type="submit">
              Register
            </Button> */}
          </form>

          <div className="mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-primary">
              Sign Up
            </Link>
          </div>
        </div>
      </section>

      <Modal open={!isConnected}>
        <ConnectToMetamaskModal />
      </Modal>
    </>
  );
}
