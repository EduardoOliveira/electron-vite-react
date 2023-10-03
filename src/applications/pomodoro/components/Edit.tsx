import Layout from "@/core/components/Layout"
import { Card, Box, Typography, Divider, Stack, Grid, FormLabel, FormControl, Input, CardOverflow, CardActions, Button, Slider } from "@mui/joy"
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { SelectedDevice } from "@/core/contexts/SelectedDevice";
import usePomodoroState from "../hooks/usePomodoroState";
export function EditPomodoro() {
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const navigate = useNavigate();
    const { selectedDevice } = useContext(SelectedDevice);
    if (!selectedDevice) {
        navigate('/settings/devices');
        return null;
    }
    //const [loading, setLoading] = useState(false);
    const { state, loading, error, doAction } = usePomodoroState(selectedDevice);
    console.log(state);
    useEffect(() => {
        setHours(state.hours);
        setMinutes(state.minutes);
        setSeconds(state.seconds);
    }, [state]);
    if (error) {
        console.log(error);
    }

    return (
        <>
            <Layout.Main>
                <Card>
                    <Box sx={{ mb: 1 }}>
                        <Typography level="title-md">Pomodoro timer</Typography>
                        <Typography level="body-sm">
                            Configure pomodoro timer.
                        </Typography>
                    </Box>
                    <Divider />
                    <Stack
                        direction="row"
                        spacing={3}
                        sx={{ display: 'flex', my: 1 }}
                    >
                        <Button color="danger" variant='soft' onClick={()=>{setMinutes(25);setHours(0);setSeconds(0)}}>Focus time - 25min</Button>
                        <Button color="success" variant='soft' onClick={()=>{setMinutes(5);setHours(0);setSeconds(0)}}>Short break - 5min</Button>
                        <Button color="neutral" variant='soft' onClick={()=>{setMinutes(15);setHours(0);setSeconds(0)}}>Long break - 15min</Button>
                    </Stack>
                    <Divider />
                    <Stack
                        direction="row"
                        spacing={3}
                        sx={{ display: 'flex', my: 1 }}
                    >
                        <Grid container spacing={1} direction='row' justifyContent="space-around"
                            columns={{ xs: 5, sm: 5, md: 5 }}>
                            <Stack direction="row" spacing={2} >
                                <FormControl>
                                    <FormLabel>Hours</FormLabel>
                                    <Input
                                        placeholder="0"
                                        value={hours}
                                        onChange={(e) => setHours(parseInt(e.target.value))}
                                        type='number' />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Minutes</FormLabel>
                                    <Input
                                        placeholder="0"
                                        value={minutes}
                                        onChange={(e) => setMinutes(parseInt(e.target.value))}
                                        type='number' />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Seconds</FormLabel>
                                    <Input
                                        placeholder="0"
                                        value={seconds}
                                        onChange={(e) => setSeconds(parseInt(e.target.value))}
                                        type='number' />
                                </FormControl>
                            </Stack>
                        </Grid>
                    </Stack>
                    <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                        <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                            <Button size="sm" color="neutral" sx={{ flexGrow: 1 }} onClick={() => navigate(-1)}>
                                Back
                            </Button>
                            {!state.running && <Button size="sm" variant="soft" sx={{ flexGrow: 1 }} loading={loading} onClick={() => doAction({ type: 'set', payload: { hours, minutes, seconds } })}>Set</Button>}
                            {!state.running && <Button size="sm" sx={{ flexGrow: 1 }} loading={loading} onClick={() => doAction({ type: 'start', payload: { hours, minutes, seconds } })}>Start</Button>}
                            {state.running && <Button size="sm" variant="soft" sx={{ flexGrow: 1 }} loading={loading} onClick={() => doAction({ type: 'start', payload: { hours, minutes, seconds } })}>Restart</Button>}
                            {state.running && <Button size="sm" sx={{ flexGrow: 1 }} loading={loading} onClick={() => doAction({ type: 'stop' })}>Stop</Button>}
                        </CardActions>
                    </CardOverflow>
                </Card>
            </Layout.Main>
        </>
    )
}