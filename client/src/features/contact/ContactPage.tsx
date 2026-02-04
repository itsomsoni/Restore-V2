// import { DecrementLegacy, IncrementLegacy, type CounterState } from "./counterReducer";
import { Button, ButtonGroup, Typography } from "@mui/material";
import { decrement, increment } from "./counterReducer";
import { useAppDispatch, useAppSelector } from "../../app/store/store";

export default function ContactPage() {

  const { data } = useAppSelector(state => state.counter);
  const dispatch = useAppDispatch();

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Contact Page
      </Typography>
      <Typography variant="body1">
        The current counter value is: {data}
      </Typography>
      <ButtonGroup>
        <Button color="error" onClick={() => dispatch(decrement(1))}>Decrement</Button>
        <Button color="secondary" onClick={() => dispatch(increment(1))}>Increment</Button>
        <Button color="primary" onClick={() => dispatch(increment(5))}>Increment by 5</Button>
      </ButtonGroup>
    </>
  )
}