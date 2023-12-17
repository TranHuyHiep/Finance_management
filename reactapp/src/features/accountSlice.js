import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {createAccount, deleteAccount, getAccount, updateAccount} from "../api/accountService";
import {notifications} from "@mantine/notifications";
import {ReactComponent as SuccessIcon} from "../assets/success-icon.svg";

export const addAccount =
    createAsyncThunk('account/addAccount',async (body)=>{
        return  createAccount(
            body.token,
            body.name,
            body.currentBalance,
            body.paymentTypes
        ).then((res) =>{
            return res.data
        }).catch((err) =>{
            return err.response.date
        })
    })

export const changeAccount =
    createAsyncThunk('account/changeAccount',async (body)=>{
        console.log("account/changeAccount")
        return  updateAccount(
            body.token,
            body
        ).then((res) =>{
            return res.data
        }).catch((err) =>{
            return err.response.date
        })
    })

export const removeAccount =
    createAsyncThunk('account/removeAccount',async (body)=>{
        return  deleteAccount(
            body.token,
            body.accountId
        ).then((res) =>{
            return res.data
        }).catch((err) =>{
            return err.response.date
        })
    })

export const fetchAccount =
    createAsyncThunk('account/fetchAccount',async (body)=>{
        return  getAccount(
            body.token
        ).then((res) =>{
            return res.data
        }).catch((err) =>{
            return err.response.date
        })
    })


const accountSlice = createSlice({
    name: "account", initialState: {
        displayAccountForm:false,
        addAccountInProcess:false,
        fetchAccountInProcess:false,
        accountList: []
    }, reducers: {
        showAccountForm: (state) => {
            state.displayAccountForm = true
        },
        closeAccountForm:(state) =>{
            state.displayAccountForm = false
        }
    },
    extraReducers:{
        [addAccount.pending]:(state) => {
            state.addAccountInProcess = true
        },
        [addAccount.fulfilled]:(state,action) =>{
            if(action.payload.message ==="success"){
                notifications.show({
                    title: 'Tạo tài khoản thành công',
                    message: 'Tài khoản của bạn đã được tạo thành công!!',
                    icon: <SuccessIcon />,
                    radius:"lg",
                    autoClose: 5000,
                })
            }else {
                notifications.show({
                    title: action.payload.message,
                    message: 'Vui lòng thử lại!!',
                    radius:"lg",
                    color:"red",
                    autoClose: 5000,
                })
            }
            state.addAccountInProcess =false
            state.displayAccountForm = false
        },
        [addAccount.rejected]:(state)=>{
            state.addAccountInProcess = false
            notifications.show({
                title: "Tạo tài khoản thất bại",
                message: 'Vui lòng thử lại!!',
                radius:"lg",
                color:"red",
                autoClose: 5000,
            })
        },
        [fetchAccount.pending]:(state) => {
            state.fetchAccountInProcess = true
            console.log("Tài khoản đang đồng bộ")
        },
        [fetchAccount.fulfilled]:(state,action) =>{
            if(action.payload.message ==="success"){
                state.accountList = action.payload.data
            }else {
                console.log(action.payload.message)
            }
            state.fetchAccountInProcess =false
        },
        [fetchAccount.rejected]:(state)=>{
            state.fetchAccountInProcess = false
            console.log("Đồng bộ tài khoản thất bại")
        },
        [changeAccount.pending]:(state) => {
            console.log("Đang chỉnh sửa tài khoản")
        },
        [changeAccount.fulfilled]:(state,action) =>{
            if(action.payload.message ==="success"){
                notifications.show({
                    title: 'Tài khoản đã được cập nhật',
                    message: 'Tài khoản của bạn được cập nhật thành công!!',
                    icon: <SuccessIcon />,
                    radius:"lg",
                    autoClose: 5000,
                })
            }else {
                console.log(action.payload.message)
                notifications.show({
                    title: action.payload.message,
                    message: 'Vui lòng thử lại!!',
                    radius:"lg",
                    color:"red",
                    autoClose: 5000,
                })
            }
            state.fetchAccountInProcess =false
        },
        [changeAccount.rejected]:(state)=>{
            console.log("Cập nhật tài khoản thất bại")
            notifications.show({
                title: "Tài khoản của bạn cập nhật thất bại",
                message: 'Vui lòng thử lại!!',
                radius:"lg",
                color:"red",
                autoClose: 5000,
            })
        },
        [removeAccount.pending]:(state) => {
            console.log("Tài khoản đang được cập nhật")
        },
        [removeAccount.fulfilled]:(state,action) =>{
            if(action.payload.message ==="success"){
                notifications.show({
                    title: 'Đã xoá tài khoản',
                    message: 'Tài khoản của bạn đã được xoá thành công!!',
                    icon: <SuccessIcon />,
                    radius:"lg",
                    autoClose: 5000,
                })
            }else {
                console.log(action.payload.message)
                notifications.show({
                    title: action.payload.message,
                    message: 'Vui lòng thử lại!!',
                    radius:"lg",
                    color:"red",
                    autoClose: 5000,
                })
            }
            state.fetchAccountInProcess =false
        },
        [removeAccount.rejected]:(state)=>{
            console.log("Xoá tài khoản thất bại")
            notifications.show({
                title: "Xoá tài khoản thất bại",
                message: 'Vui lòng thử lại!!',
                radius:"lg",
                color:"red",
                autoClose: 5000,
            })
        },
    }
})

export const {showAccountForm,closeAccountForm} = accountSlice.actions;

export default accountSlice;