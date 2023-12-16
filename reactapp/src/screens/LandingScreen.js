import { Title, Grid, Container, Text, Button, List, Paper, Card, Center } from '@mantine/core';
import HeaderBar from '../components/HeaderBar';
import { LeaderSVG } from "../assets/assets";
import { ArrowRightIcon } from "../assets/assets";
import { ReactComponent as ManageMoneySVG } from "../assets/Manage money.svg";
import { ReactComponent as CheckIcon } from '../assets/Check_round_fill.svg'
import { ReactComponent as ExpensesSVG } from "../assets/Receipt.svg";
import { ReactComponent as BudgetingSVG } from "../assets/Budgeting.svg";
import { ReactComponent as SavingSVG } from "../assets/Piggy bank.svg";
import { ReactComponent as DebtManageSVG } from "../assets/Debt Manage.svg";
import { AppLogo } from "../assets/assets";
import { useDispatch } from "react-redux";
import { openSignupForm } from "../features/userSlice";
export default function LandingScreen() {
    const dispatch = useDispatch()
    return (
        <div>
            <HeaderBar isLandingPage={true} />
            <Container size="xl" >
                <Container size={"lg"}  >
                    <Grid style={{ marginTop: 40 }} justify="center" align="center">
                        <Grid.Col md={6} lg={6}>
                            <Title style={{ textAlign: "left" }} size="48">Tăng trưởng tài chính, đơn giản hóa cuộc sống của bạn.</Title>
                            <Text c="dimmed" style={{ marginTop: 10, textAlign: "left" }}>PayMint: Đơn giản hóa thanh toán, theo dõi chi phí, đạt được mục tiêu tài chính.</Text>
                            <Button onClick={() => dispatch(openSignupForm())} size={"md"} radius="xl" style={{ marginTop: 20 }} rightIcon={<ArrowRightIcon />}>Bắt đầu</Button>
                        </Grid.Col>
                        <Grid.Col md={6} lg={6}>
                            <Center >
                                <LeaderSVG />
                            </Center>
                        </Grid.Col>
                    </Grid>
                </Container>
                <Container size={"lg"} style={{ marginTop: 150 }} >
                    <Paper shadow="sm" radius="lg" p="md">
                        <Grid >
                            <Grid.Col justify="center" align="center" md={6} lg={6}>
                                <ManageMoneySVG style={{ width: 350, height: 350 }} />
                            </Grid.Col>
                            <Grid.Col justify="center" md={6} lg={3}>
                                <Title style={{ textAlign: "left" }} size="32">Quản lý tài chính hiệu quả</Title>
                                <Text c="dimmed" style={{ fontSize: 18, marginTop: 10, textAlign: "left" }}>Quản lý tài chính hiệu quả là chìa khóa để đạt được sự ổn định và thành công về mặt tài chính. Bằng cách kiểm soát tài chính của bạn và đưa ra những quyết định có thông tin, bạn có thể mở đường cho một tương lai an toàn và thịnh vượng.</Text>
                                <List style={{ marginTop: 20 }}
                                    spacing="xs"
                                    size="sm"
                                    center
                                    icon={
                                        <CheckIcon />
                                    }
                                >
                                    <List.Item>Lập kế hoạch ngân sách</List.Item>
                                    <List.Item>Theo dõi tiết kiệm và đầu tư</List.Item>
                                    <List.Item>Quản lý nợ</List.Item>
                                    <List.Item>Theo dõi và Kiểm soát Chi phí</List.Item>
                                </List>
                            </Grid.Col>
                        </Grid>
                    </Paper>
                </Container>
                <Container size={"lg"} style={{ marginTop: 100, marginBottom: 100 }}>
                    <Title order={1}>Features</Title>
                    <Grid style={{ marginTop: 50 }}>
                        <Grid.Col md={6} lg={3}>
                            <Card
                                shadow="sm"
                                padding="sm"
                                component="a"
                                withBorder
                                radius="lg"
                            >
                                <Card.Section>
                                    <ExpensesSVG style={{ width: 250, height: 200 }} />
                                </Card.Section>

                                <Text weight={500} size="lg" mt="md">
                                    Theo dõi và Kiểm soát Chi phí
                                </Text>

                                <Text mt="xs" color="dimmed" size="sm">
                                    Dùy trì hiểu rõ về các chi phí của bạn là rất quan trọng để quản lý tài chính hiệu quả. Sử dụng các ứng dụng tài chính cá nhân hoặc công cụ theo dõi để giám sát thói quen chi tiêu của bạn.
                                </Text>
                            </Card>
                        </Grid.Col>
                        <Grid.Col md={6} lg={3}>
                            <Card
                                shadow="sm"
                                padding="sm"
                                component="a"
                                withBorder
                                radius="lg"
                            >
                                <Card.Section>
                                    <BudgetingSVG style={{ width: 250, height: 200 }} />
                                </Card.Section>

                                <Text weight={500} size="lg" mt="md">
                                    Lập kế hoạch ngân sách
                                </Text>

                                <Text mt="xs" color="dimmed" size="sm">
                                    Tạo và tuân theo một kế hoạch ngân sách là cơ bản cho quản lý tài chính. Bắt đầu bằng cách theo dõi thu nhập và chi phí của bạn, sau đó phân loại chúng theo từng danh mục tương ứng.
                                </Text>
                            </Card>
                        </Grid.Col>
                        <Grid.Col md={6} lg={3}>
                            <Card
                                shadow="sm"
                                padding="sm"
                                component="a"
                                withBorder
                                radius="lg"
                            >
                                <Card.Section>
                                    <SavingSVG style={{ width: 250, height: 200 }} />
                                </Card.Section>

                                <Text weight={500} size="lg" mt="md">
                                    Theo dõi Tiết kiệm và Đầu tư
                                </Text>

                                <Text mt="xs" color="dimmed" size="sm">
                                    Xây dựng thói quen tiết kiệm là quan trọng để đảm bảo an ninh tài chính. Phân chia một phần thu nhập hàng tháng của bạn để đầu tư vào khoản tiết kiệm.
                                </Text>
                            </Card>
                        </Grid.Col>
                        <Grid.Col md={6} lg={3}>
                            <Card
                                shadow="sm"
                                padding="sm"
                                component="a"
                                withBorder
                                radius="lg"
                            >
                                <Card.Section>
                                    <DebtManageSVG style={{ width: 250, height: 200 }} />
                                </Card.Section>

                                <Text weight={500} size="lg" mt="md">
                                    Quản lý nợ
                                </Text>

                                <Text mt="xs" color="dimmed" size="sm">
                                    Quản lý nợ là rất quan trọng để duy trì cuộc sống tài chính khỏe mạnh. Ưu tiên thanh toán các nợ có lãi suất cao trước, trong khi tiếp tục thanh toán tối thiểu cho các nợ khác.
                                </Text>
                            </Card>
                        </Grid.Col>
                    </Grid>
                </Container>
            </Container>

            <div style={{ background: "#263238", height: 300 }}>
                <Container size={"lg"}>
                    <Grid style={{ marginTop: 50 }}>
                        <Grid.Col span={4}>
                            <AppLogo style={{ width: 200 }}></AppLogo>
                            <Text color={"gray"} style={{ marginLeft: 10 }}>Đơn giản hóa việc thanh toán, theo dõi chi phí, đạt được mục tiêu tài chính.</Text>
                        </Grid.Col>
                        <Grid.Col justify="center" align="center" span={8}>
                            <Button size={"md"} style={{ marginTop: 50 }}>GitHub</Button>
                        </Grid.Col>
                    </Grid>
                </Container>
            </div>
        </div>

    )
}