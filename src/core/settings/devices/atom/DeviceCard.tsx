import { Card, CardOverflow, AspectRatio, CardContent, Typography, Divider, Link, Checkbox } from "@mui/joy";
import { useNavigate } from "react-router-dom";
import { Device } from "@/core/entities/Device";
import { useContext, useMemo, useState } from "react";
import DevicesService from "../DevicesService";
import Favorite from '@mui/icons-material/Favorite';
import IconButton from '@mui/joy/IconButton';
import { SelectedDevice } from "@/core/contexts/SelectedDevice";

type DeviceCardProps = {
    device: Device;
}

export function DeviceCard({ device }: DeviceCardProps) {
    const navigateFn = useNavigate();
    const [isOnline, setIsOnline] = useState(false);
    const { selectedDevice, setSelectedDevice } = useContext(SelectedDevice);
    useMemo(() => {
        if (device && device.ip) {
            DevicesService.getShadow(device.ip).then((s) => {
                console.log('connected', s);
                device.shadow = s;
                setIsOnline(true);
            }).catch(() => {
                setIsOnline(false);
            });
        }
    }, []);

    return (
        <>
            <Card variant="outlined" sx={{ width: 320 }} style={{ cursor: 'pointer' }}
                onClick={()=>navigateFn(`/settings/devices/${device.id}/edit`)} >
                <CardOverflow>
                    <AspectRatio ratio="2">
                        <img
                            src="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318"
                            srcSet="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318&dpr=2 2x"
                            loading="lazy"
                            alt=""
                        />
                    </AspectRatio>
                    <IconButton
                        aria-label="Like minimal photography"
                        size="md"
                        variant="solid"
                        sx={{
                            position: 'absolute',
                            zIndex: 2,
                            borderRadius: '50%',
                            right: '1rem',
                            bottom: 0,
                            transform: 'translateY(50%)',
                        }}
                    >
                        <Favorite />
                    </IconButton>
                </CardOverflow>
                <CardContent>
                    <Typography level="title-md">
                        <Link href="#multiple-actions" overlay underline="none">
                            {device.shadow?.name} {device.selected? '(selected)' : ''}
                        </Link>
                    </Typography>
                    <Typography level="body-sm">
                        <Link href="#multiple-actions">{device.ip }</Link>
                    </Typography>
                </CardContent>
                <CardOverflow variant="soft">
                    <Divider inset="context" />
                    <CardContent orientation="horizontal"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                        <Typography level="body-xs">6.3k views</Typography>
                        <Divider orientation="vertical" />
                        <Typography level="body-xs">{isOnline ? 'Online' : 'Offline'}</Typography>
                        <Divider orientation="vertical" />
                        <Checkbox variant="solid" checked={selectedDevice.id == device.id}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => {
                                console.log('device', device? device.id : 'null', e.target.checked);
                                if (e.target.checked) setSelectedDevice(device);
                            }}
                        />
                    </CardContent>
                </CardOverflow>
            </Card>
        </>
    )
}