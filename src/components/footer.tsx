import { Separator } from "./ui/separator"

export function Footer() {
  return (
    <>
        <Separator />
    <div className="py-6">
      <div className="container flex flex-col md:flex-row items-center gap-6 justify-between mx-auto">
            <span className="text-3xl text-orange-500 font-bold tracking-tight">
                Eatsy
            </span>
            <div className="font-semibold tracking-tight flex gap-4">
                <span>Privacy Policy</span>
                <span>Terms of Service</span>
            </div>
      </div>
    </div>
    </>
  )
}
