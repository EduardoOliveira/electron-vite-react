import { Card, Box, Typography, Divider, Stack, FormLabel, FormControl, Input, CardOverflow, CardActions, Button, CardCover, CardContent } from "@mui/joy"
import { useNavigate } from "react-router-dom";

export function PomodoroBadge() {
    const navigateFn = useNavigate();

    return (
        <Card component="li" sx={{ width: 320, cursor: 'pointer'}} onClick={() => navigateFn('/applications/pomodoro')}>
            <CardCover>
                <img src='https://e7kz5pq2qq4.exactdn.com/wp-content/uploads/2013/04/6969282632_bc5249a9a6_b.jpg?strip=all&lossy=1&resize=614%2C614&ssl=1'/>
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
                    Pomodoro
                </Typography>
            </CardContent>
        </Card>
    )
}