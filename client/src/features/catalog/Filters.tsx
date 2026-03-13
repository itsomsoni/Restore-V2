import { Box, Button, Paper } from "@mui/material";
import Search from "./Search";
import RadioButtonGroup from "../../app/shared/components/RadioButtonGroup";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import { resetParams, setBrands, setOrderBy, setTypes } from "./catalogSlice";
import CheckBoxGroup from "../../app/shared/components/CheckBoxGroup";

const sortOptions = [
    { value: 'name', label: 'Alphabetical' },
    { value: 'priceDesc', label: 'Price - High to Low' },
    { value: 'price', label: 'Price - Low to High' },
];

type Props ={
    filterData: {
        brands: string[],
        types: string[]
    }
}

export default function Filters({ filterData: data }: Props) {
    const { orderBy, types, brands } = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();

    return (
        <Box display={'flex'} flexDirection={'column'} gap={3}>
            <Paper>
                <Search />
            </Paper>
            <Paper sx={{ p: 3 }}>
                <RadioButtonGroup
                    options={sortOptions}
                    onChange={e => dispatch(setOrderBy(e.target.value))}
                    selectedValue={orderBy} />
            </Paper>
            <Paper sx={{ p: 3 }}>
                <CheckBoxGroup
                    items={data.brands}
                    checked={brands}
                    onChange={(items: string[]) => dispatch(setBrands(items))}
                />
            </Paper>

            <Paper sx={{ p: 3 }}>
                <CheckBoxGroup
                    items={data.types}
                    checked={types}
                    onChange={(items: string[]) => dispatch(setTypes(items))}
                />
            </Paper>
            <Button color="primary" onClick={() => { dispatch(resetParams()) }}>
                Reset Filters
            </Button>
        </Box>
    )
}