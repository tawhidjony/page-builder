import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


type IInputComponentProps = {
    label: string;
    value: string;
    onInputChange: (event: any) => void;
}

export default function InputComponent({ label, value, onInputChange }: IInputComponentProps) {
    return (
        <div>
            <Label>{label}</Label>
            <Input value={value} onChange={(e) => onInputChange(e.target.value)} />
        </div>
    )
}
