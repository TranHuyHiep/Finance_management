import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {createTransaction, deleteTransaction, getTransaction, updateTransaction} from "../api/transactionService";
import {notifications} from "@mantine/notifications";
import {ReactComponent as SuccessIcon} from "../assets/success-icon.svg";

export const addTransaction =
    createAsyncThunk('transaction/addTransaction',async (body)=>{
        return  createTransaction(
            body.token,
            body.amount,
            body.description,
            body.paymentType,
            body.dateTime,
            body.categoryId,
            body.accountId
        ).then((res) =>{
            return res.data
        }).catch((err) =>{
            return err.response.date
        })
    })

export const editTransaction =
    createAsyncThunk('transaction/editTransaction',async (body)=>{
        return  updateTransaction(
            body.token,
            body.amount,
            body.description,
            body.paymentType,
            body.dateTime,
            body.categoryId,
            body.accountId,
            body.transactionId
        ).then((res) =>{
            return res.data
        }).catch((err) =>{
            return err.response.date
        })
    })

export const fetchTransaction =
    createAsyncThunk('transaction/fetchTransaction',async (body)=>{
        return  getTransaction(
            body.token
        ).then((res) =>{
            return res.data
        }).catch((err) =>{
            return err.response.date
        })
    })

export const removeTransaction =
    createAsyncThunk('transaction/removeTransaction',async (body)=>{
        return  deleteTransaction(
            body.token,
            body.transactionId
        ).then((res) =>{
            return res.data
        }).catch((err) =>{
            return err.response.date
        })
    })

const transactionSlice = createSlice({
    name:"transaction",
    initialState:{
        count:0,
        displayTransactionForm:false,
        addTransactionInProcess:false,
        editTransactionInProcess:false,
        fetchTransactionInProcess:false,
        transactionList:[]
    },
    reducers:{
        showTransactionForm: (state) => {
            state.displayTransactionForm = true
        },
        closeTransactionForm:(state) =>{
            state.displayTransactionForm = false
        }
    },
    extraReducers:{
        [addTransaction.pending]:(state) => {
            state.addTransactionInProcess = true
            console.log("Giao dịch đã được thêm vào hàng chờ")
        },
        [addTransaction.fulfilled]:(state,action) =>{
            if(action.payload.message ==="success"){
                notifications.show({
                    title: 'Thêm giao dịch thành công',
                    message: 'Giao dịch của bạn đã được thêm thành công!!',
                    icon: <SuccessIcon />,
                    radius:"lg",
                    autoClose: 5000,
                })
                console.log("Giao dịch đã được tạo")
            }else {
                notifications.show({
                    title: action.payload.message,
                    message: 'Vui lòng thử lại!!',
                    radius:"lg",
                    color:"red",
                })
                console.log(action.payload.message)
            }
            state.addTransactionInProcess =false
            state.displayTransactionForm = false
        },
        [addTransaction.rejected]:(state)=>{
            state.addTransactionInProcess = false
            console.log("Tạo giao dịch thất bại")
            notifications.show({
                title: "Giao dịch tạo thất bại",
                message: 'Vui lòng thử lại!!',
                radius:"lg",
                color:"red",
            })
        },
        [editTransaction.pending]:(state) => {
            console.log("Transaction Edit pending")
            state.editTransactionInProcess = true
        },
        [editTransaction.fulfilled]:(state,action) =>{

            if(action.payload.message ==="success"){
                notifications.show({
                    title: 'Cập nhật giao dịch thành công',
                    message: 'Giao dịch của bạn được cập nhật thành công!!',
                    icon: <SuccessIcon />,
                    radius:"lg",
                    autoClose: 5000,
                })
                console.log("Giao dịch đã được chỉnh sửa")
            }else {
                notifications.show({
                    title: action.payload.message,
                    message: 'Vui lòng thử lại!!',
                    radius:"lg",
                    color:"red",
                })
                console.log(action.payload.message)
            }
            state.editTransactionInProcess = false
        },
        [editTransaction.rejected]:(state)=>{
            notifications.show({
                title: "Tạo giao dịch thất bại",
                message: 'Vui lòng thử lại!!',
                radius:"lg",
                color:"red",
            })
            state.editTransactionInProcess = false
        },
        [removeTransaction.pending]:(state) => {
            console.log("Transaction Edit pending")
        },
        [removeTransaction.fulfilled]:(state,action) =>{

            if(action.payload.message ==="success"){
                notifications.show({
                    title: 'Giao dịch đã được xoá',
                    message: 'Giao dịch của bạn đã được xoá thành công!!',
                    icon: <SuccessIcon />,
                    radius:"lg",
                    autoClose: 5000,
                })
                console.log("Giao dịch đã được xoá")
            }else {
                notifications.show({
                    title: action.payload.message,
                    message: 'Vui lòng thử lại!!',
                    radius:"lg",
                    color:"red",
                })
                console.log(action.payload.message)
            }
        },
        [removeTransaction.rejected]:(state)=>{
            notifications.show({
                title: "Xoá giao dịch thất bại",
                message: 'Vui lòng thử lại!!',
                radius:"lg",
                color:"red",
            })
        },
        [fetchTransaction.pending]:(state) => {
            state.fetchTransactionInProcess = true
            console.log("Giao dịch đang đồng bộ")
        },
        [fetchTransaction.fulfilled]:(state,action) =>{
            if(action.payload.message ==="success"){
                console.log(state.transactionList)
                state.transactionList = action.payload.data
                console.log("Giao dịch đã được đồng bộ")
                console.log(state.transactionList)
            }else {
                console.log(action.payload.message)
            }
            state.fetchTransactionInProcess =false
        },
        [fetchTransaction.rejected]:(state)=>{
            state.fetchTransactionInProcess = false
            console.log("Đồng bộ giao dịch thất bại")
        },
    }
})

export const {showTransactionForm,closeTransactionForm} = transactionSlice.actions;

export default transactionSlice;