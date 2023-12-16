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
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addAccount, closeAccountForm, fetchAccount} from "../../features/accountSlice";

export default function AccountForm(props) {
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
                value !== '' ? null : 'Nhập số hiện tại'
            ),
            paymentTypes: (value) => (
                value !== '' ? null : 'Chọn ít nhất 1 phương thức thanh toán'
            ),
        }
    });

    async function handleSubmit(){
        await dispatch(addAccount({...form.values,token:token}))
        await dispatch(fetchAccount({token:token}))
        form.reset()
    }

    function handleDiscard(){
        form.reset()
        setShowDiscard(false)
        dispatch(closeAccountForm())
    }

    function handleDiscardCancel(){
        setShowDiscard(false)
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
                <form onSubmit={form.onSubmit((values) => handleSubmit())}>
                    <TextInput radius="md" style={{ marginTop: 16 }}
                        withAsterisk
                        label="Tên tài khoản"
                        placeholder="VD: Ngân hàng BIDV"
                        type='text'
                        {...form.getInputProps('name')}
                    />
                    <TextInput radius="md" style={{ marginTop: 16 }}
                        withAsterisk
                        label="Số dư"
                        placeholder="VD: 2,000,000"
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
                        <Button radius="md" variant={"default"} onClick={() => setShowDiscard(true)} fullWidth>Huỷ bỏ</Button>
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
                size="auto" withinPortal={true} closeOnClickOutside={false} trapFocus={false} withOverlay={false} opened={showDiscard} onClose={handleDiscardCancel} radius="lg" centered  withCloseButton={false} title="Xác nhận huỷ bỏ">
                <Text size={"sm"} c={"dimmed"} style={{marginBottom:10}}>Bạn sẽ mất toàn bộ nội dung đã nhập</Text>
                <Grid
                >
                    <Grid.Col span={"auto"}>
                        <Button radius="md" color="gray" fullWidth  onClick={() => setShowDiscard(false)}>
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