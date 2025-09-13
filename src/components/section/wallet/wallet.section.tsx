"use client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import WalletCard from "./wallet.component"
import { useEffect, useState } from "react";
import SendUSDT from "./send-usdt.component";
import { useTronStore } from "@/store/tron";
import { Button } from "@/components/ui/button";

const WalletSection = () => {
    const { addPrivateKey, privateKey, ownerAdder, getBalance } = useTronStore()
    const [balance, setBalance] = useState(0);
    const [pk, setPk] = useState("")
    useEffect(() => {
        const blitv = setInterval(
            () => {

                if (ownerAdder) {
                    getBalance(ownerAdder).then(n => setBalance(n))
                }
            }
            , 1000
        )
        return () => {
            clearInterval(blitv)
        }
    }, [ownerAdder])
    return <div className="h-full rounded-sm border min-w-xl">
        {!privateKey ?

            <div className="w-full flex flex-col gap-4 min-w-xl bg-gray-100 p-4 border border-black rounded-sm">
                <Label className="text-xl">Private Key</Label>
                <div>
                    <Input type="text" placeholder="enter private key"
                        onChange={(e) => setPk(e.target.value)}
                    />
                    <Button
                        onClick={() => addPrivateKey(pk)}
                    > Enter </Button>
                </div>
            </div>
            :
            <>
                <WalletCard address={ownerAdder}
                    balance={balance}
                    checkBalance={() =>
                        getBalance(ownerAdder).then(n => setBalance(n))
                    }
                />
                <SendUSDT />
            </>
        }
    </div>
}
export default WalletSection