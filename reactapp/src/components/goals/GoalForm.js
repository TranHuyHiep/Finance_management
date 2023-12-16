import {
    TextInput,
    Title,
    Modal,
    Button,
    Container,
    Grid, Text, LoadingOverlay
} from '@mantine/core';
import { useForm } from '@mantine/form';
import {addGoal, closeGoalForm, fetchGoal} from "../../features/goalSlice";
import {useDispatch, useSelector} from "react-redux";
import React, {useState} from "react";
import {DatePickerInput} from "@mantine/dates";

export default function GoalForm(props){
    const dispatch = useDispatch()
    const token  = useSelector(state => state.user.token)
    const addGoalInProcess = useSelector(state => state.goal.addGoalInProcess)
    const [showDiscard,setShowDiscard] = useState(false);
    const form = useForm({
        initialValues: {
            name: '',
            description: '',
            targetAmount: '',
            status: 'Pending',
            targetDate: new Date()
        },
        validate: {
            name: (value) => (
                value !== '' ? null : 'Yêu cầu nhập tên'
            ),
            targetAmount: (value) => (
                value !== '' ? null : 'Nhập số tiền của mục tiêu'
            )
        }
    });

    async function handleSubmit(){
        await dispatch(addGoal({...form.values,token:token,targetDate:form.values.targetDate.getTime()}))
        await dispatch(fetchGoal({token:token}))
        form.reset()
    }

    function handleDiscard(){
        form.reset()
        setShowDiscard(false)
        dispatch(closeGoalForm())
    }

    function handleDiscardCancel(){
        setShowDiscard(false)
    }
    return(
        <Modal overlayProps={{
            color: "white",
            opacity: 0.55,
            blur: 3,
        }} radius="lg" size="sm" opened={props.open} onClose={() => { props.close() }} centered>
            <LoadingOverlay visible={addGoalInProcess} overlayBlur={2}/>
            <Title style={{ marginLeft: 10 }} order={3}>Thêm mục tiêu</Title>
            <Container size="md">
                <form onSubmit={form.onSubmit((values) => handleSubmit())}>
                    <TextInput radius="md" style={{ marginTop: 16 }}
                        withAsterisk
                        label="Tên"
                        placeholder="VD: Cưới vợ"
                        type='Goal Name'
                        {...form.getInputProps('name')}
                    />
                    <TextInput radius="md" style={{ marginTop: 16 }}
                        label="Mô tả"
                        placeholder="VD: 100 mâm cỗ"
                        type='description'
                        {...form.getInputProps('description')}
                    />
                    <TextInput radius="md" style={{ marginTop: 16 }}
                        withAsterisk
                        label="Số tiền"
                        placeholder="VD: 100.000.000"
                        type='amount'
                        {...form.getInputProps('targetAmount')}
                    />
                    <DatePickerInput
                        radius="md"
                        style={{marginTop: 16}}
                        label="Ngày mục tiêu"
                        {...form.getInputProps('targetDate')}
                    />
                    <Grid style={{marginTop:16,marginBottom:8}} gutter={5} gutterXs="md" gutterMd="xl" gutterXl={50}>
                        <Grid.Col span={"auto"}>
                        <Button radius="md" variant={"default"} fullWidth onClick={() => setShowDiscard(true)}>Huỷ bỏ</Button>
                        </Grid.Col>
                        <Grid.Col span={"auto"}>
                        <Button radius="md" fullWidth type="submit">Lưu lại</Button>
                        </Grid.Col>
                    </Grid>
                </form>
            </Container>
            <Modal
                overlayProps={{
                    color: "red",
                    blur: 3,
                }}
                size="auto" withinPortal={true} closeOnClickOutside={false} trapFocus={false} withOverlay={false} opened={showDiscard} onClose={handleDiscardCancel} radius="lg" centered  withCloseButton={false} title="Xác nhận huỷ bỏ">
                <Text size={"sm"} c={"dimmed"} style={{marginBottom:10}}>Bạn sẽ mất dữ liệu vừa nhập</Text>
                <Grid
                >
                    <Grid.Col span={"auto"}>
                        <Button radius="md" variant={"default"} fullWidth  onClick={() => setShowDiscard(false)}>
                            Không
                        </Button>
                    </Grid.Col>
                    <Grid.Col span={"auto"}>
                        <Button color={"red"} onClick={()=> handleDiscard()} radius="md" fullWidth type="submit">
                            Có
                        </Button>
                    </Grid.Col>
                </Grid>
            </Modal>
        </Modal>
    )
}