import { Box, Card, CardContent, CardCover, Typography } from "@mui/joy";
import { useNavigate } from "react-router-dom";
import Layout from "@/core/components/Layout";
import { DeviceCard } from "./atom/DeviceCard";
import { useLoaderData } from "react-router-dom";
import { Device } from "@/core/entities/Device";

export function DeviceList() {
    const navigateFn = useNavigate();
    const devices = useLoaderData() as Device[];
    console.log(devices);
    return (
        <>
            <Layout.Main>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                        gap: 2,
                    }}
                >
                    {devices.map((item, index) => (
                        <DeviceCard key={index} device={item} />
                    ))}
                    <Card component="li" sx={{ width: 320 }} onClick={() => navigateFn('/settings/devices/new')}>
                        <CardCover>
                            <video
                                autoPlay
                                loop
                                muted
                                poster="https://assets.codepen.io/6093409/river.jpg"
                            >
                                <source
                                    src="https://assets.codepen.io/6093409/river.mp4"
                                    type="video/mp4"
                                />
                            </video>
                        </CardCover>
                        <CardContent sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'end',
                        }}>
                            <Typography
                                level="body-lg"
                                fontWeight="lg"
                                textColor="#fff"
                                mt={{ xs: 12, sm: 18 }}
                            >
                                New
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
            </Layout.Main>
        </>
    )
}