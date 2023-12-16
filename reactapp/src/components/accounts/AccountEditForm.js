import {
    TextInput,
    Title,
    Checkbox,
    Modal,
    Group,
    Button,
    Container,
    Grid, Text, LoadingOverlay
} from '@mantine/core';
import { useForm } from '@mantine/form';
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { changeAccount, fetchAccount, removeAccount} from "../../features/accountSlice";


export default function AccountEditForm(props) {
    console.log(props.element)
    const dispatch = useDispatch()
    const token  = useSelector(state => state.user.token)
    const addAccountInProcess = useSelector(state => state.account.addAccountInProcess)
    const [showDiscard,setShowDiscard] = useState(false);
    const form = useForm({
        initialValues: {
            name:'',
            currentBalance: '',
            paymentTypes:''
        },
        validate: {
            name: (value) => (
                value !== '' ? null : 'Yêu cầu nhập tên'
            ),
            currentBalance: (value) => (
                value !== '' ? null : 'Nhập số dư hiện tại của tài khoản'
            ),
            paymentTypes: (value) => (
                value !== '' ? null : 'Chọn ít nhất 1 loại'
            ),
        }
    });

    useEffect(() =>{
        form.setFieldValue('name',props?.element?.name)
        form.setFieldValue('currentBalance',props?.element?.currentBalance)
        form.setFieldValue('paymentTypes',props?.element?.paymentTypes)
    },[form, props?.element?.currentBalance, props?.element?.name, props?.element?.paymentTypes])

    async function handleDelete() {
        await dispatch(removeAccount({token: token, accountId: props.element.accountId}))
        await dispatch(fetchAccount({token: token}))
        form.reset()
        props.close()
    }

    function handleDiscardCancel(){
        setShowDiscard(false)
    }

    function  handleCancel(){
        form.reset()
        props.close()
    }

    async function handleUpdate() {
        await dispatch(changeAccount({...form.values, token: token, accountId: props.element.accountId}))
        await dispatch(fetchAccount({token: token}))
        form.reset()
        props.close()
    }

    return (
        <Modal  overlayProps={{
            color: "white",
            opacity: 0.55,
            blur: 3,
        }} withCloseButton={false} closeOnClickOutside={false} radius="lg" size="sm" opened={props.open} onClose={() => { props.close() }} centered>
            <LoadingOverlay visible={addAccountInProcess} overlayBlur={2} />
            <Title style={{ marginLeft: 10 }} order={3}>Thêm tài khoản</Title>
            <Container size="md">
                <form onSubmit={form.onSubmit((values) => handleUpdate())}>
                    <TextInput radius="md" style={{ marginTop: 16 }}
                               withAsterisk
                               label="Tên tài khoản"
                               placeholder="Vd: Ngân hàng BIDV"
                               type='text'
                               {...form.getInputProps('name')}
                    />
                    <TextInput radius="md" style={{ marginTop: 16 }}
                               withAsterisk
                               label="Số tiền hiện có"
                               placeholder="VD: 2.000.000"
                               type='number'
                               {...form.getInputProps('currentBalance')}
                    />
                    <Checkbox.Group style={{marginTop:16}}
                                    {...form.getInputProps('paymentTypes')}
                                    label="Phương thức thanh toán"
                                    withAsterisk
                    >
                        <Group style={{marginTop:10}} mt="xs">
                            <Checkbox  value="Tiền mặt" label="Tiền mặt" />
                            <Checkbox  value="Thanh toán online" label="Thanh toán online" />
                            <Checkbox  value="Thẻ tín dụng" label="Thẻ tín dụng" />
                        </Group>
                    </Checkbox.Group>
                    <Grid style={{marginTop:16,marginBottom:8}} gutter={5} gutterXs="md" gutterMd="xl" gutterXl={50}>
                        <Grid.Col span={"auto"}>
                            <Button radius="md" color="red" fullWidth onClick={() => setShowDiscard(true)} >Xoá</Button>
                        </Grid.Col>
                        <Grid.Col span={"auto"}>
                            <Button radius="md" variant={"default"} onClick={() => handleCancel()} fullWidth>Huỷ bỏ</Button>
                        </Grid.Col>
                        <Grid.Col span={"auto"}>
                            <Button radius="md" fullWidth type="submit">Lưu</Button>
                        </Grid.Col>
                    </Grid>
                </form>
            </Container>
            <Modal
                overlayProps={{
                    color: "red",
                    blur: 3,
                }}
                size="auto" withinPortal={true} closeOnClickOutside={false} trapFocus={false} withOverlay={false} opened={showDiscard} onClose={handleDiscardCancel} radius="lg" centered  withCloseButton={false} title="Confirm Delete">
                <Text size={"sm"} c={"dimmed"} style={{marginBottom:10}}>Xác nhận xoá tài khoản.</Text>
                <Grid
                >
                    <Grid.Col span={"auto"}>
                        <Button radius="md" color="gray" fullWidth  onClick={() => setShowDiscard(false)}>
                            Không, huỷ bỏ
                        </Button>
                    </Grid.Col>
                    <Grid.Col span={"auto"}>
                        <Button color={"red"} onClick={()=> handleDelete()} radius="md" fullWidth type="submit">
                            Có, xác nhận xoá
                        </Button>
                    </Grid.Col>
                </Grid>
            </Modal>
        </Modal>
    )
}