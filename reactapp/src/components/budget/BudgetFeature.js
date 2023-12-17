import React from "react";
import {Text, Paper, Grid} from "@mantine/core";
import {useSelector} from "react-redux";
export default function BudgetFeature(){
    const budgetList = useSelector(state => state.budget.budgetList)
    function handleTotalBudget(){
        return budgetList.reduce(
            (accumulator, currentValue) => accumulator + currentValue.amount,
            0
        );
    }
    function handleTotalUsed(){
        return budgetList.reduce(
            (accumulator, currentValue) => accumulator + currentValue.used,
            0
        );
    }
    function handleTotalLeft(){
        return budgetList.reduce(
            (accumulator, currentValue) => accumulator + currentValue.balance,
            0
        );
    }
    return(
        <div style={{marginBottom:10}}>
            <Grid>
                <Grid.Col span={6} md={"content"} >
                    <Paper miw={"180px"}radius="md" p="md" withBorder>
                    <Text size={"lg"} fw={700}>{`${handleTotalBudget().toLocaleString('en-US')} VND`}</Text>
                    <Text size={"sm"} fw={700} c="dimmed" >
                        TỔNG NGÂN SÁCH
                    </Text>
                </Paper>
                </Grid.Col>
                <Grid.Col span={6} md={"content"} >
                    <Paper miw={"180px"} radius="md" p="md" withBorder>
                    <Text size={"lg"} fw={700}>{`${handleTotalUsed().toLocaleString('en-US')} VND`}</Text>
                    <Text size={"sm"} fw={700} c="dimmed" ta="bottom">
                        TỔNG ĐÃ SỬ DỤNG
                    </Text>
                </Paper>
                </Grid.Col>
                <Grid.Col span={12} md={"content"} >
                    <Paper miw={"180px"} radius="md" p="md" withBorder>
                        <Text size={"lg"} fw={700} style={{color: "#26AB35"}}>{`${handleTotalLeft().toLocaleString('en-US')} VND`}</Text>
                        <Text size={"sm"} fw={700} c="dimmed" ta="bottom">
                            TỔNG CÒN LẠI
                        </Text>
                    </Paper>
                </Grid.Col>
            </Grid>
        </div>

    );
}