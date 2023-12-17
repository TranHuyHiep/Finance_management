import { Button, Group, TextInput, Radio } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { editInfo, validateToken } from "../../features/userSlice";
import { DatePickerInput } from "@mantine/dates";

function EditInfoForm({ close }) {
  const currentUser = useSelector(state => state.user.currentUser)

  console.log('First Name:', currentUser.firstName);
  console.log('Last Name:', currentUser.lastName);
  console.log('Email:', currentUser.email);
  // console.log('profileImage:', currentUser.profileImage);
  console.log('Birthday:', currentUser.birthday);
  console.log('Gender:', currentUser.gender);
  console.log('Phone:', currentUser.phone);

  const form = useForm({
    initialValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      profileImage: currentUser.profileImage,
      birthday: new Date(currentUser.birthday),
      gender: currentUser.gender,
      phone: currentUser.phone,
    },

    validate: {
      firstName: (value) => (value !== "" ? null : "Nhập họ"),
      lastName: (value) => (value !== "" ? null : "Nhập tên"),
      email: (value) => (value !== "" ? null : "Nhật email"),
      profileImage: (value) => (value !== "" ? null : "Chọn ảnh"),
      birthday: (value) => (value instanceof Date ? null : "Chọn ngày sinh"),
      gender: (value) => (value !== "" ? null : "Chọn giới tính"),
      phone: (value) => (value !== "" ? null : "Chọn số điện thoại"),
    },
  });

  const token = useSelector(state => state.user.token)

  const dispatch = useDispatch()
  //Edit name
  async function handleEditName(values) {
    console.log(values)
    await dispatch(editInfo({ ...form.values, token: token }));
    await dispatch(validateToken(token));
    close();
  }


  return (
    <form onSubmit={form.onSubmit((values) => handleEditName(values))}>
      <TextInput
        radius="md"
        style={{ marginTop: 16 }}
        withAsterisk
        label="Họ đệm"
        {...form.getInputProps("firstName")}
      />
      <TextInput
        radius="md"
        style={{ marginTop: 16 }}
        withAsterisk
        label="Tên"
        {...form.getInputProps("lastName")}
      />
      <TextInput
        radius="md"
        style={{ marginTop: 16 }}
        withAsterisk
        label="Email"
        {...form.getInputProps("email")}
      />
      <DatePickerInput
        radius="md"
        style={{ marginTop: 16 }}
        withAsterisk
        label="Ngày sinh"
        format="dd/mm/yyyy"
        {...form.getInputProps("birthday")}
      />
      <div style={{ marginTop: 16, display: "flex", alignItems: "center" }}>
        <Radio
          label="Nam"
          value="Nam"
          checked={form.values.gender === "Nam"}
          onChange={() => form.setFieldValue("gender", "Nam")}
          style={{ marginRight: 16 }}
        />
        <Radio
          label="Nữ"
          value="Nữ"
          checked={form.values.gender === "Nữ"}
          onChange={() => form.setFieldValue("gender", "Nữ")}
        />
      </div>
      <TextInput
        radius="md"
        style={{ marginTop: 16 }}
        withAsterisk
        label="Số điện thoại"
        {...form.getInputProps("phone")}
      />
      <Group style={{ marginTop: 36, marginBottom: 36 }}>
        <Button radius="md" fullWidth type="submit">
          Cập nhật
        </Button>
      </Group>
    </form>
  );
}
export default EditInfoForm;
