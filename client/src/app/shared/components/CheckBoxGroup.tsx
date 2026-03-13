import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { useEffect, useState } from "react";

type Props = {
    items: string[];
    checked: string[];
    onChange: (items: string[]) => void;
}

export default function CheckBoxGroup({ items, checked, onChange }: Props) {
    const [checkedItems, setCheckedItems] = useState(checked);

    useEffect(() => {
        setCheckedItems(checked);
    }, [checked]);

    const handleToggle = (value: string) => {
        const updatedValue = checkedItems.includes(value)
            ? checkedItems.filter(item => item !== value)
            : [...checkedItems, value];

        setCheckedItems(updatedValue);
        onChange(updatedValue);
    }

    return (
        <FormGroup>
            {items.map(item => (
                <FormControlLabel
                    key={item}
                    control={
                        <Checkbox
                            checked={checkedItems.includes(item)}
                            onChange={() => handleToggle(item)}
                            color="secondary" sx={{ py: 0.7, fontSize: 40 }}
                        />}
                    label={item}
                />
            ))
            }
        </FormGroup>
    )
}