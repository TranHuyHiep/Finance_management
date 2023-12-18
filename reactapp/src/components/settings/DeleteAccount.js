import React from 'react';
import { Button, Group, Text } from '@mantine/core';

export default function DeleteAccount() {
  return (
    <>
    <Text fz="lg">Bạn có chắc chắn muốn xoá tài khoản?</Text>
    <Group position="right" mt="md">
        <Button type="submit" color='red'>Xác nhận xoá</Button>
      </Group>
    </>
  )
}
