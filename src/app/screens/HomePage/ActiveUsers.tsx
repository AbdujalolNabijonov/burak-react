import { Box, Container, Stack } from "@mui/material";
import Card from "@mui/joy/Card";
import { CssVarsProvider, Typography } from "@mui/joy";
import CardOverflow from "@mui/joy/CardOverflow";
import AspectRatio from "@mui/joy/AspectRatio";


//Redux
import { createSelector } from "reselect";
import { topUsersRetriever } from "./selector";
import { useSelector } from "react-redux";
import { Member } from "../../../lib/types/member.type";
import { server } from "../../../lib/config";


const topUsersSelector = createSelector(
    topUsersRetriever,
    (topUsers) => ({ topUsers })
)

export default function ActiveUsers() {
    const { topUsers } = useSelector(topUsersSelector)

    return (
        <div className={"active-users-frame"}>
            <Container>
                <Stack className={"main"}>
                    <Box className={"category-title"}>Active Users</Box>
                    <Stack className={"cards-frame"}>
                        <CssVarsProvider>
                            {topUsers.length !== 0 ? (
                                topUsers.map((member: Member) => {
                                    const imagePath = member?.memberImage ? `${server}/${member.memberImage}` : "/img/default-user.svg";
                                    return (
                                        <Card
                                            key={member._id}
                                            variant="outlined"
                                            className={"card"}
                                        >
                                            <CardOverflow>
                                                <AspectRatio ratio="1">
                                                    <img src={imagePath} alt="" />
                                                </AspectRatio>
                                            </CardOverflow>
                                            <CardOverflow>
                                                <Typography className={"member-nickname"}>
                                                    {member.memberNick}
                                                </Typography>
                                            </CardOverflow>
                                        </Card>
                                    );
                                })
                            ) : (
                                <Box className="no-data">No Active Users!</Box>
                            )}
                        </CssVarsProvider>
                    </Stack>
                </Stack>
            </Container>
        </div>
    );
}
