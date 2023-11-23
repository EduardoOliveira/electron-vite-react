
import { Box } from "@mui/joy"
import Layout from "@/core/components/Layout";
import { PomodoroBadge } from "./pomodoro/components/Badge";
import { FacesBadge } from "./faces/components/Badge";
export function ApplicationsList() {
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
                    <PomodoroBadge />
                    <FacesBadge />
                    <FacesBadge />
                    <FacesBadge />
                </Box>
            </Layout.Main>
        </>
    )
}