import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {createBudget, deleteBudget, getBudget, updateBudget} from "../api/budgetService";
import _ from "lodash";
import {notifications} from "@mantine/notifications";
import {ReactComponent as SuccessIcon} from "../assets/success-icon.svg";

export const addBudget =
    createAsyncThunk('budget/addBudget',async (body)=>{
        return  createBudget(
            body.token,
            body.categoryId,
            body.amount,
        ).then((res) =>{
            return res.data
        }).catch((err) =>{
            return err.response.date
        })
    })

export const editBudget =
    createAsyncThunk('budget/editBudget',async (body)=>{
        return  updateBudget(
            body.token,
            body.budgetId,
            body.categoryId,
            body.amount,
        ).then((res) =>{
            return res.data
        }).catch((err) =>{
            return err.response.date
        })
    })

export const removeBudget =
    createAsyncThunk('budget/removeBudget',async (body)=>{
        return  deleteBudget(
            body.token,
            body.budgetId
        ).then((res) =>{
            return res.data
        }).catch((err) =>{
            return err.response.date
        })
    })

export const fetchBudget =
    createAsyncThunk('budget/fetchBudget',async (body)=>{
        return  getBudget(
            body.token
        ).then((res) =>{
            return res.data
        }).catch((err) =>{
            return err.response.date
        })
    })


const budgetSlice = createSlice({
    name: "budget", initialState: {
        displayBudgetForm:false,
        addBudgetInProcess:false,
        addBudgetEditInProcess:false,
        fetchBudgetInProcess:false,
        budgetList: []
    }, reducers: {
        showBudgetForm: (state) => {
            state.displayBudgetForm = true
        },
        closeBudgetForm:(state) =>{
            state.displayBudgetForm = false
        }
    },
    extraReducers:{
        [addBudget.pending]:(state) => {
            state.addBudgetInProcess = true
            console.log("Ngân sách đã được thêm vào hàng chờ")
        },
        [addBudget.fulfilled]:(state,action) =>{
            state.addBudgetInProcess =false
            if(action.payload?.message ==="success"){
                console.log("Tạo ngân sách thành công")
                notifications.show({
                    title: 'Ngân sách đã được tạo',
                    message: 'Ngân sách của bạn đã được tạo thành công!!',
                    icon: <SuccessIcon />,
                    radius:"lg",
                    autoClose: 5000,
                })
            }else if(_.isEmpty(action.payload)){
                notifications.show({
                    title:"Đã có lỗi xảy ra",
                    message: 'Vui lòng thử lại!!',
                    radius:"lg",
                    color:"red",
                    autoClose: 5000,
                })
            }else {
                notifications.show({
                    title:action.payload?.message,
                    message: action.payload?.message,
                    radius:"lg",
                    color:"red",
                    autoClose: 5000,
                })
            }
            state.displayBudgetForm = false
        },
        [addBudget.rejected]:(state)=>{
            state.addBudgetInProcess = false
            console.log("Tạo ngân sách thất bại")
            alert("Tạo mới ngân sách thất bại, vui lòng thử lại")
        },
        [editBudget.pending]:(state) => {
            state.addBudgetEditInProcess = true
            console.log("Ngân sách đã được thêm vào hàng chờ")
        },
        [editBudget.fulfilled]:(state,action) =>{
            state.addBudgetEditInProcess =false
            if(action.payload?.message ==="success"){
                console.log("Ngân sách đã được cập nhật")
                notifications.show({
                    title: 'Ngân sách đã được cập nhật',
                    message: 'Ngân sách của bạn đã được cập nhật thành công!!',
                    icon: <SuccessIcon />,
                    radius:"lg",
                    autoClose: 5000,
                })
            }else if(_.isEmpty(action.payload)){
                notifications.show({
                    title:"Đã có lỗi xảy ra",
                    message: 'Vui lòng thử lại!!',
                    radius:"lg",
                    color:"red",
                    autoClose: 5000,
                })
            }else {
                notifications.show({
                    title:action.payload?.message,
                    message: action.payload?.message,
                    radius:"lg",
                    color:"red",
                    autoClose: 5000,
                })
            }
        },
        [editBudget.rejected]:(state)=>{
            state.addBudgetEditInProcess = false
            console.log("Chỉnh sửa ngân sách thất bại")
            alert("Cập nhật ngân sách thất bại, thử lại?")
        },
        [removeBudget.pending]:(state) => {
            console.log("Ngân sách được thêm vào hàng chờ")
        },
        [removeBudget.fulfilled]:(state,action) =>{
            if(action.payload?.message ==="success"){
                console.log("Ngân sách đã được tạo")
                notifications.show({
                    title: 'Ngân sách đã được xoá',
                    message: 'Ngân sách của bạn được xoá thành công!!',
                    icon: <SuccessIcon />,
                    radius:"lg",
                    autoClose: 5000,
                })
            }else if(_.isEmpty(action.payload)){
                notifications.show({
                    title:"Đã có lỗi xảy ra",
                    message: 'Vui lòng thử lại!!',
                    radius:"lg",
                    color:"red",
                    autoClose: 5000,
                })
            }else {
                notifications.show({
                    title:action.payload?.message,
                    message: action.payload?.message,
                    radius:"lg",
                    color:"red",
                    autoClose: 5000,
                })
            }
        },
        [removeBudget.rejected]:(state)=>{
            console.log("Xoá ngân sách thất bại")
            alert("Xoá ngân sách thất bại, thử lại?")
        },
        [fetchBudget.pending]:(state) => {
            state.fetchBudgetInProcess = true
            console.log("Ngân sách được thêm vào hàng chờ đồng bộ")
        },
        [fetchBudget.fulfilled]:(state,action) =>{
            if(action.payload.message ==="success"){
                console.log(state.budgetList)
                state.budgetList = action.payload.data
                console.log("Ngân sách đã được đồng bộ")
                console.log(state.budgetList)
            }else {
                console.log(action.payload.message)
            }
            state.fetchBudgetInProcess =false
        },
        [fetchBudget.rejected]:(state)=>{
            state.fetchBudgetInProcess = false
            console.log("Ngân sách đồng bộ thất bại")
        },
    }
})

export const {showBudgetForm,closeBudgetForm} = budgetSlice.actions;

export default budgetSlice;