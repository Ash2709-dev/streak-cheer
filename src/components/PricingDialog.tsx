import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PricingPlans } from "./PricingPlans";

interface PricingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PricingDialog({ open, onOpenChange }: PricingDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl bg-gradient-fire bg-clip-text text-transparent">
            Upgrade Your Journey 🚀
          </DialogTitle>
        </DialogHeader>
        <PricingPlans onClose={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}