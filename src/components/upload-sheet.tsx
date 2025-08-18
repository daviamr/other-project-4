import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CheckCircle, FileUp } from "lucide-react"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

export function UploadSheet() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline" type="button" className="relative ml-4"><FileUp size={16} /> Upload</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Upload de Planilha</DialogTitle>
            <DialogDescription className="border-b pb-4">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima, itaque repudiandae facere iste ut molestiae est!
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="sheet" className="mb-2"><FileUp size={14} />Selecione a planilha</Label>
            <Input id="sheet" type="file" />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button>
              <CheckCircle size={16} />Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
