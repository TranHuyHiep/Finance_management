
import { Grid, Text, Paper } from '@mantine/core';
import { useSelector } from "react-redux";

export default function AccountFeature() {
    const accountList = useSelector(state => state.account.accountList)
    function handleTotalAccount() {
        return accountList.length
    }

    function handleTotalIncome() {
        return accountList.reduce(
            (accumulator, currentValue) => accumulator + currentValue.totalIncome,
            0
        );
    }

    function handleTotalExpense() {
        return accountList.reduce(
            (accumulator, currentValue) => accumulator + currentValue.totalExpense,
            0
        );
    }

    function handleTotalBalanace() {
        return accountList.reduce(
            (accumulator, currentValue) => accumulator + currentValue.currentBalance,
            0
        );
    }

    return (
        <div style={{ marginBottom: 10 }}>
            <Grid >
                <Grid.Col span={6} md={"content"}>
                    <Paper radius="md" miw={"180px"} p="md" withBorder>
                        <Text size={"lg"} fw={700}>{handleTotalAccount().toLocaleString("en-US")}</Text>
                        <Text size={"sm"} fw={700} c="dimmed">
                            Tổng tài khoản
                        </Text>
                    </Paper>
                </Grid.Col>
                <Grid.Col span={6} md={"content"}>
                    <Paper radius="md" miw={"180px"} p="md" withBorder>
                        <Text size={"lg"} fw={700}>{`${handleTotalIncome().toLocaleString("en-US")} VND`}</Text>
                        <Text size={"sm"} fw={700} c="dimmed">
                            Tổng thu
                        </Text>
                    </Paper>
                </Grid.Col>
                <Grid.Col span={6} md={"content"}>
                    <Paper radius="md" miw={"180px"} p="md" withBorder>
                        <Text size={"lg"} fw={700}>{`${handleTotalExpense().toLocaleString("en-US")} VND`}</Text>
                        <Text size={"sm"} fw={700} c="dimmed">
                            Tổng chi
                        </Text>
                    </Paper>
                </Grid.Col>
                <Grid.Col span={6} md={"content"}>
                    <Paper radius="md" miw={"180px"} p="md" withBorder>
                        {handleTotalBalanace() > 0 ?
                            <Text size={"lg"} fw={700} style={{ color: "#26AB35" }}>{`${handleTotalBalanace().toLocaleString("en-US")} VND`}</Text>
                            :
                            <Text size={"lg"} fw={700} style={{ color: "#FF4040" }}>{`${handleTotalBalanace().toLocaleString("en-US")} VND`}</Text>
                        }
                        <Text size={"sm"} fw={700} c="dimmed">
                            Tổng thu chi
                        </Text>
                    </Paper>
                </Grid.Col>
            </Grid>
        </div>
    )
}