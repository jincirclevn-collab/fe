"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useTronStore } from "@/store/tron"
import { Send, SendHorizonal } from "lucide-react"
import { useState } from "react"

const SendUSDT = () => {
    const { sendUSDT } = useTronStore()
    const [addr, setAddr] = useState("")
    const [amount, setAmount] = useState(0)
    const handler = () => {
        if (!addr || !amount) return
        sendUSDT(addr.trim(), amount)
        setAmount(0)
    }
    return <Card>
        <CardHeader>
            <CardTitle className="inline-flex gap-2 items-center">
                <SendHorizonal />
                <span>
                    Send USDT
                </span>
            </CardTitle>
        </CardHeader>
        <CardContent className="container flex flex-col gap-2">
            <Input type="text"
                placeholder="... to Address" onChange={e => setAddr(e.target.value)} />
            <Input
                type="number" min={1} placeholder="amount" onChange={e => setAmount(Number(e.target.value))} />
        </CardContent>
        <CardFooter>
            <Button className="w-full" onClick={handler}>Send</Button>
        </CardFooter>
    </Card>

}
export default SendUSDT