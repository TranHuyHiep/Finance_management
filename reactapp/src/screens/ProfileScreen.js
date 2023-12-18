import React, { useState, useRef } from "react";
import {
  Divider,
  Text,
  Space,
  Button,
  Modal,
  Container, Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import ChangePasswordForm from "../components/settings/ChangePasswordForm";
import DeleteAccount from "../components/settings/DeleteAccount";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { ReactComponent as AvatarIcon } from "../assets/User_duotone.svg";
import { editImage, validateToken } from "../features/userSlice";
import Layout from "../components/Layout";
import EditInfoForm from "../components/settings/EditInfoForm";

export default function ProfileScreen() {
  const [opened, { open, close }] = useDisclosure(false);
  const [form, setForm] = useState(null);
  const [formName, setFormName] = useState(null);
  const inputRef = useRef(null);


  //image
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();


  const handleImageClick = () => {
    inputRef.current.click();
  };
  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    await dispatch(editImage({ image: file, token: token }));
    await dispatch(validateToken(token));
  };
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <>
      <Layout title={""} load={true}>
        <Title style={{ margin: 5 }} order={2}>Thông tin cá nhân</Title>
        <div
          style={{
            marginTop: "10px",
            marginLeft: "10px",
            display: "flex",
            align: "flex-start",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <div style={{ width: "100%" }}>
            <Divider my="sm" />
            <Space h="lg" />
          </div>

          <div style={{ display: "inline", width: "50%" }}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                maxWidth: "450px",
                alignItems: "center",
                gap: "10px 0",
              }}
            >
              <Text c={"dimmed"} fw={700} style={{ width: "100%" }}>
                Họ và tên
              </Text>
              <Space h="lg" />
              <Text fw={500} fz="lg" style={{ display: "inline", maxWidth: "calc(100%-75px)", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                {currentUser.firstName} {currentUser.lastName}
              </Text>
            </div>
            <Space h="lg" />

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                maxWidth: "450px",
                alignItems: "center",
                gap: "10px 0",
              }}
            >
              <Text c={"dimmed"} fw={700} style={{ width: "100%" }}>
                Email
              </Text>
              <Space h="lg" />
              <Text fw={500} fz="lg" style={{ display: "inline", maxWidth: "calc(100%-75px)", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                {currentUser.email}
              </Text>
            </div>
            <Space h="lg" />

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                maxWidth: "450px",
                alignItems: "center",
                gap: "10px 0",
              }}
            >
              <Text c={"dimmed"} fw={700} style={{ width: "100%" }}>
                Giới tính
              </Text>
              <Space h="lg" />
              <Text fw={500} fz="lg" style={{ display: "inline", maxWidth: "calc(100%-75px)", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                {currentUser.gender}
              </Text>
            </div>
            <Space h="lg" />

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                maxWidth: "450px",
                alignItems: "center",
                gap: "10px 0",
              }}
            >
              <Text c={"dimmed"} fw={700} style={{ width: "100%" }}>
                Ngày sinh
              </Text>
              <Space h="lg" />
              <Text fw={500} fz="lg" style={{ display: "inline", maxWidth: "calc(100%-75px)", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                {formatDate(currentUser.birthday)}
              </Text>
            </div>
            <Space h="lg" />

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                maxWidth: "450px",
                alignItems: "center",
                gap: "10px 0",
              }}
            >
              <Text c={"dimmed"} fw={700} style={{ width: "100%" }}>
                Số điện thoại
              </Text>
              <Space h="lg" />
              <Text fw={500} fz="lg" style={{ display: "inline", maxWidth: "calc(100%-75px)", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                {currentUser.phone}
              </Text>
            </div>
            <Space h="lg" />

          </div>
          <div
            style={{
              width: "30%",
              textAlign: "left",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              rowGap: "10px",
              position: "relative",
            }}
          >
            <Text c={"dimmed"} fw={700} >
              Ảnh đại diện
            </Text>
            <div onClick={handleImageClick}>
              {currentUser.profileImage ? (
                <img
                  src={`data:image/jpeg;base64,${currentUser.profileImage}`}
                  alt="Default"
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "contain",
                    borderRadius: "1000px",
                  }}
                />
              ) : (
                <AvatarIcon style={{
                  width: 150,
                  height: 150,
                  objectFit: "contain",
                  borderStyle: "solid",
                  borderWidth: 1,
                  borderColor: "rgba(0,0,0,0.2)",
                  borderRadius: "1000px",
                }} />
              )}
              <input
                type="file"
                ref={inputRef}
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
              <Button
                variant="default"
                color="dark"
                radius="md"
                style={{ position: "absolute", top: "170px", left: "70px" }}
                type="file"
              // onClick={open}
              >
                Chỉnh sửa
              </Button>
            </div>
          </div>

          <Space h="lg" />
        </div>
        <div style={{ marginTop: "10px", marginLeft: "10px" }}>
          <Space h="md" />
          <Text fw={700} fz="xl">
            Thông tin khác
          </Text>
          <Divider my="sm" />
          <Space h="lg" />
          <Button
            variant="default"
            color="dark"
            radius="md"
            style={{ width: "200px" }}
            onClick={() => {
              setFormName("Đổi mật khẩu")
              setForm(<ChangePasswordForm close={close} />);
              open();
            }}
          >
            Đổi mật khẩu
          </Button>
          <Button
            variant="default"
            color="dark"
            radius="md"
            style={{ width: "200px", marginLeft: '50px' }}
            onClick={() => {
              setFormName("Xoá tài khoản")
              setForm(<DeleteAccount />);
              open();
            }}
          >
            Xoá tài khoản
          </Button>
          <Button
            variant="default"
            color="dark"
            radius="md"
            style={{ width: "200px", marginLeft: '50px' }}
            onClick={() => {
              setFormName("Thay đổi thông tin")
              setForm(<EditInfoForm close={close} />);
              open();
            }}
          >
            Thay đổi thông tin
          </Button>
        </div>
        <Modal
          opened={opened}
          onClose={close}
          radius="lg"
          size="sm"
          centered
          overlayProps={{
            color: "white",
            opacity: 0.55,
            blur: 3,
          }}
          title={<Title style={{ marginLeft: 10 }} order={3}>
            {formName}
          </Title>}
        >
          <Container>

            {form}
          </Container>

        </Modal>
      </Layout>
    </>
  );
}
function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero-based
  const year = date.getFullYear();

  // Pad single-digit day and month with leading zero
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  return `${formattedDay}/${formattedMonth}/${year}`;
}

