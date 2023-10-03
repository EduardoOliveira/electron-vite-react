import Layout from "@/core/components/Layout"
import { Card, Box, Typography, Divider, Stack, FormLabel, FormControl, Input, CardOverflow, CardActions, Button } from "@mui/joy"
import DevicesService from "./DevicesService";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Device, newDevice } from "@/core/entities/Device";
import { useState, useMemo, useContext } from "react";
import { SelectedDevice } from "@/core/contexts/SelectedDevice";


export function DeviceEdit() {
    const save = (d: Device) => {
        console.log('save', d);
        DevicesService.saveDevice(d).then(() => {
            if(d.selected){
                setSelectedDevice(d);
            }
            navigate(-1);
        });
    }

    const connect = () => {
        setIsConnectLoading(true);
        DevicesService.getShadow(device.ip).then((s) => {
            console.log('connected', s);
            setDevice({ ...device, shadow: s });
            setIsConnected(true);
        })
            .catch(() => setIsConnected(false))
            .finally(() => setIsConnectLoading(false));
    }

    const [isConnectLoading, setIsConnectLoading] = useState(false);
    let d = useLoaderData() as Device;
    console.log(d);

    if (!d) {
        d = newDevice('');
    }

    const navigate = useNavigate();
    const [device, setDevice] = useState(d);
    const [isConnected, setIsConnected] = useState(false);
    const {setSelectedDevice} = useContext(SelectedDevice);

    useMemo(() => {
        if (device.ip) {
            connect();
        }
    }, []);

    return (
        <Layout.Main>
            <Card>
                <Box sx={{ mb: 1 }}>
                    <Typography level="title-md">{device ? `Edit ${device.shadow?.name}` : "New Ticco"}</Typography>
                    <Typography level="body-sm">
                        Configure {device ? 'your' : 'a new'} Ticco.
                    </Typography>
                </Box>
                <Divider />
                <Stack
                    direction="row"
                    spacing={3}
                    sx={{ display: { xs: 'none', md: 'flex' }, my: 1 }}
                >
                    <Stack spacing={2} sx={{ flexGrow: 1 }}>
                        <Stack spacing={1}>
                            <FormLabel>Ip</FormLabel>
                            <FormControl
                                sx={{
                                    display: {
                                        sm: 'flex-column',
                                        md: 'flex-row',
                                    },
                                    gap: 2,
                                }}
                            >
                                <Input size="sm" placeholder="192.168.1.123" value={device.ip} onChange={(event) => setDevice({ ...device, ip: event.target.value })}
                                    endDecorator={<Button onClick={connect} loading={isConnectLoading}>Connect</Button>} />
                            </FormControl>
                        </Stack>
                        {isConnected &&
                            <Stack spacing={1}>
                                <FormLabel>Name</FormLabel>
                                <FormControl
                                    sx={{
                                        display: {
                                            sm: 'flex-column',
                                            md: 'flex-row',
                                        },
                                        gap: 2,
                                    }}
                                >
                                    <Input size="sm" placeholder="My Ticco" value={device.shadow?.name} onChange={(event) => setDevice({...device, shadow:{...device.shadow, name:event.target.value}})} />
                                </FormControl>
                            </Stack>}
                        {isConnected && device.shadow?.version && <Stack spacing={1}>
                            <FormLabel>Version</FormLabel>
                            <FormControl
                                sx={{
                                    display: {
                                        sm: 'flex-column',
                                        md: 'flex-row',
                                    },
                                    gap: 2,
                                }}
                            >
                                <Input size="sm" value={device.shadow?.version} disabled />
                            </FormControl>
                        </Stack>}
                        {isConnected && device.shadow?.bootTime && <Stack spacing={1}>
                            <FormLabel>Last Boot</FormLabel>
                            <FormControl
                                sx={{
                                    display: {
                                        sm: 'flex-column',
                                        md: 'flex-row',
                                    },
                                    gap: 2,
                                }}
                            >
                                <Input size="sm" value={device.shadow?.bootTime.toString()} disabled />
                            </FormControl>
                        </Stack>}
                    </Stack>
                </Stack>
                <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                    <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                        <Button size="sm" variant="outlined" color="neutral" onClick={() => navigate(-1)}>
                            Cancel
                        </Button>
                        <Button size="sm" variant="solid" onClick={() => save(device)} disabled={!isConnected&&isConnectLoading}>
                            Save
                        </Button>
                    </CardActions>
                </CardOverflow>
            </Card>
        </Layout.Main>
    )
}