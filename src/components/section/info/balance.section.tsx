"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useTronStore } from "@/store/tron"
import { RefreshCcwIcon, Search, Wallet } from "lucide-react"
import { useEffect, useState } from "react"

const BalanceSection = () => {
    const [balance, setBalance] = useState(0)
    const [address, setAddress] = useState<string>("")
    const { getBalance } = useTronStore()
    useEffect(() => {
        const blitv = setInterval(
            () => {

                if (address) {
                    getBalance(address).then(n => setBalance(n))
                }
            }
            , 1000
        )
        return () => {
            clearInterval(blitv)
        }
    }, [address])
    return <div className="h-full rounded-sm border min-w-xl flex flex-col gap-4 p-4">
        <div className="container flex gap-2">
            <Input type="text" placeholder="address check balance..." onChange={e => setAddress(e.target.value)} />
            <Button onClick={() => getBalance(address).then(amount => setBalance(amount))}> <Search /></Button>
        </div>
        <div className="bg-gray-100 p-4 rounded-sm">
            <div className="container flex gap-2 items-center">
                <Wallet />
                <Label className="text-2xl">
                    {address}
                </Label>
            </div>
            <div className="items-center p-4 w-full flex gap-2">
                <Label className="text-xl">{Number(balance).toFixed(2)} USDT</Label>
                <Button variant={"outline"} onClick={() => getBalance(address).then(amount => setBalance(amount))} >
                    <RefreshCcwIcon />
                </Button>
            </div>
        </div>
    </div >
}
export default BalanceSection