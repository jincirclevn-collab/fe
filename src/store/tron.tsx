import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { TronWeb, Contract } from 'tronweb'
import meta from "./MetaCoin.json"
import { add } from 'date-fns'

const tw = new TronWeb({
    fullHost: "https://api-partner-sm.ventus-game.com/tron",
})
const ct = tw.contract(meta.abi, meta.networks[9].address)
const getCt = (pk?: string) => getTw(pk).contract(meta.abi, meta.networks[9].address)

const getTw = (pk?: string) => {
    return new TronWeb({
        fullHost: "https://api-partner-sm.ventus-game.com/tron",
        privateKey: pk
    })
}

export interface TronAction {
    addPrivateKey: (pk: string) => void
    getBalance: (addr: string) => Promise<number>
    sendUSDT: (toAddr: string, amount: number) => void
}

export interface TronState {
    // contract: typeof ct
    privateKey: string
    ownerAdder: string
    ownerBalance: number
}
export interface TronStore extends TronAction, TronState { }
export const initTronStore = () => { }
export const useTronStore = create<TronStore>()(persist(
    (set, get) => ({
        // contract: ct,
        privateKey: "",
        ownerAdder: "",
        ownerBalance: 0,
        addPrivateKey: (pk) => {
            const addr = TronWeb.address.fromPrivateKey(pk)
            if (!addr) {
                throw new Error("pk error")
            }
            set(state => ({ ...state, ownerAdder: addr, privateKey: pk }))
        },
        getBalance: async (addr) => {
            // return await state.contract.balanceOf(addr).call({
            // from: addr
            // })
            return await ct.balanceOf(addr).call({ from: addr })
        },
        sendUSDT: (to, amount) => {
            const { privateKey } = get()
            const ct = getCt(privateKey)
            console.info(ct, privateKey)
            ct.transfer(to, amount).send()
        }
    }), {
    name: 'tronStore'
}))