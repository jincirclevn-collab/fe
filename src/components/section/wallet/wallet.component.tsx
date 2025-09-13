import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Loader, RefreshCcwIcon, Wallet } from "lucide-react"

type Props = {
    address: string
    balance: number
    checkBalance: () => void
}
const WalletCard = ({ address, balance, checkBalance }: Props) => {
    return <Card>
        <CardHeader>
            <CardTitle className="flex flex-col">
                <div className="container flex gap-2">
                    <Wallet />
                    <Label>
                        My Wallet
                    </Label>
                </div>
                <div className="items-center p-4 w-full flex flex-col gap-2">
                    <Label className="text-2xl">{Number(balance).toFixed(2)} USDT</Label>
                    <div className="flex items-center">
                        <code className="bg-gray-300 items-center px-2 py-1 rounded text-xs">{address}</code>
                        <Button variant={"ghost"} onClick={checkBalance}>
                            <RefreshCcwIcon />
                        </Button>
                    </div>
                </div>
            </CardTitle>
            <CardContent>

            </CardContent>
        </CardHeader>
    </Card>
}
export default WalletCard