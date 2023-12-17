import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {createGoal, deleteGoal, getGoal, updateGoal} from "../api/goalService";
import _ from "lodash";
import {notifications} from "@mantine/notifications";
import {ReactComponent as SuccessIcon} from "../assets/success-icon.svg";

export const addGoal =
    createAsyncThunk('goal/addGoal',async (body)=>{
        return  createGoal(
            body.token,
            body
        ).then((res) =>{
            return res.data
        }).catch((err) =>{
            return err.response.date
        })
    })

export const editGoal =
    createAsyncThunk('goal/editGoal',async (body)=>{
        return  updateGoal(
            body.token,
            body
        ).then((res) =>{
            return res.data
        }).catch((err) =>{
            return err.response.date
        })
    })

export const removeGoal =
    createAsyncThunk('goal/removeGoal',async (body)=>{
        return  deleteGoal(
            body.token,
            body.goalId
        ).then((res) =>{
            return res.data
        }).catch((err) =>{
            return err.response.date
        })
    })

export const fetchGoal =
    createAsyncThunk('goal/fetchGoal',async (body)=>{
        return  getGoal(
            body.token
        ).then((res) =>{
            return res.data
        }).catch((err) =>{
            return err.response.date
        })
    })


const goalSlice = createSlice({
    name: "goal", initialState: {
        displayGoalForm:false,
        addGoalInProcess:false,
        addGoalEditInProcess:false,
        fetchGoalInProcess:false,
        goalList: []
    }, reducers: {
        showGoalForm: (state) => {
            state.displayGoalForm = true
        },
        closeGoalForm:(state) =>{
            state.displayGoalForm = false
        }
    },
    extraReducers:{
        [addGoal.pending]:(state) => {
            state.addGoalInProcess = true
            console.log("Thêm mục tiêu vào hàng đợi")
        },
        [addGoal.fulfilled]:(state,action) =>{
            state.addGoalInProcess =false
            if(action.payload?.message ==="success"){
                console.log("Mục tiêu đã được thêm")
                notifications.show({
                    title: 'Mục tiêu đã được thêm',
                    message: 'Mục tiêu của bạn đã được tạo thành công!!',
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
            state.displayGoalForm = false
        },
        [addGoal.rejected]:(state)=>{
            state.addGoalInProcess = false
            console.log("Tạo mục tiêu thất bại")
            alert("Tạo mục tiêu thất bại, thử lại?")
        },
        [editGoal.pending]:(state) => {
            state.addGoalEditInProcess = true
            console.log("Thêm mục tiêu vào hàng chờ")
        },
        [editGoal.fulfilled]:(state,action) =>{
            state.addGoalEditInProcess =false
            if(action.payload?.message ==="success"){
                console.log("Mục tiêu đã được cập nhật")
                notifications.show({
                    title: 'Mục tiêu đã được cập nhật',
                    message: 'Mục tiêu của bạn cập nhật thành công!!',
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
        [editGoal.rejected]:(state)=>{
            state.addGoalEditInProcess = false
            console.log("Cập nhật mục tiêu thất bại")
            alert("Mục tiêu của bạn cập nhật thất bại, thử lại?")
        },
        [removeGoal.pending]:(state) => {
            console.log("Thêm mục tiêu vào hàng chờ")
        },
        [removeGoal.fulfilled]:(state,action) =>{
            if(action.payload?.message ==="success"){
                console.log("Mục tiêu đã được xoá")
                notifications.show({
                    title: 'Mục tiêu đã được xoá',
                    message: 'Mục tiêu của bạn được xoá thành công!!',
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
        [removeGoal.rejected]:(state)=>{
            console.log("Xoá mục tiêu thất bại")
            alert("Xoá mục tiêu thất bại, thử lại?")
        },
        [fetchGoal.pending]:(state) => {
            state.fetchGoalInProcess = true
            console.log("Mục tiêu đang được đồng bộ....")
        },
        [fetchGoal.fulfilled]:(state,action) =>{
            if(action.payload.message ==="success"){
                console.log(state.goalList)
                state.goalList = action.payload.data
                console.log("Mục tiêu đã được đồng bộ")
                console.log(state.goalList)
            }else {
                console.log(action.payload.message)
            }
            state.fetchGoalInProcess =false
        },
        [fetchGoal.rejected]:(state)=>{
            state.fetchGoalInProcess = false
            console.log("Mục tiêu đồng bộ thất bại")
        },
    }
})

export const {showGoalForm,closeGoalForm} = goalSlice.actions;

export default goalSlice;