import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    createAccountService,
    loginAccountService,
    validateTokenService,
    editNameService,
    editEmailService,
    editPasswordService,
    editImageService,
    editInfoService,
    verifySecurityCode, sendVerificationSecurityCode, sendVerificationSecurityCodeForFP, resetPassword
} from "../api/userService";
import {notifications} from "@mantine/notifications";
import {ReactComponent as SuccessIcon} from "../assets/success-icon.svg";

export const createAccount =
    createAsyncThunk('user/createAccount',async (body)=>{
        return createAccountService(
            body.firstName,
            body.lastName,
            body.email,
            body.password
        ).then((response)=>{
            return response.data
        }).catch((error) =>{
            return error.response.data
        })
    })

export const loginAccount =
    createAsyncThunk('user/loginAccount',async (body)=>{
        return loginAccountService(
            body.email,
            body.password
        ).then((response)=>{
            console.log(response)
            return response.data
        }).catch((error) =>{
            console.log(error.response.data)
            return error.response.data
        })
    })

export const validateToken =
    createAsyncThunk('user/validateToken',async (token) =>{
        return validateTokenService(
            token
        ).then((response) =>{
            console.log(response)
            return response.data
        }).catch((error)=>{
            console.log(error)
            return error.responce.data
        })
    })

export const sendVerificationCode =
    createAsyncThunk('user/sendVerificationCode',async (body) =>{
        return sendVerificationSecurityCode(
            body.email
        ).then((response) =>{
            console.log(response)
            return response
        }).catch((error)=>{
            console.log(error)
            return error.response
        })
    })

export const sendVerificationCodeForFP =
    createAsyncThunk('user/sendVerificationCodeForFP',async (body) =>{
        return sendVerificationSecurityCodeForFP(
            body.email
        ).then((response) =>{
            console.log(response)
            return response
        }).catch((error)=>{
            console.log(error)
            return error.response
        })
    })

export const newPassword =
    createAsyncThunk('user/newPassword',async (body) =>{
        return resetPassword(
            body.email,
            body.password
        ).then((response) =>{
            console.log(response)
            return response
        }).catch((error)=>{
            console.log(error)
            return error.response
        })
    })

export const verifyCode =
    createAsyncThunk('user/verifyCode',async (body) =>{
        return verifySecurityCode(
            body.email,body.otp
        ).then((response) =>{
            console.log(response)
            return response
        }).catch((error)=>{
            console.log(error)
            return error.responce
        })
    })




//Edit name
export const editName = 
    createAsyncThunk('user/editName', async(body) => {
        return editNameService(
            body.token,
            body.firstName,
            body.lastName
        ).then((res) =>{
            return res.data
        }).catch((err) =>{
            return err.response
        })
    })

//Edit info
export const editInfo = 
createAsyncThunk('user/editInfo', async(body) => {
    return editInfoService(
        body.token,
        body.firstName,
        body.lastName,
        body.email,
        body.profileImage,
        body.birthday,
        body.gender,
        body.phone
    ).then((res) =>{
        return res.data
    }).catch((err) =>{
        return err.response
    })
})
//Edit email
export const editEmail = 
    createAsyncThunk('user/editEmail', async(body) => {
        return editEmailService(
            body.token,
            body.email
        ).then((res) =>{
            return res.data
        }).catch((err) =>{
            return err.response.data
        })
    })

//Edit Password
export const editPassword = createAsyncThunk(
  "user/editPassword",
  async (body) => {
    // console.log(body)
    return editPasswordService(body.token, body.oldPassword, body.password)
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .catch((err) => {
        console.log(err.response.data.message);
        return err.response.data.message;
      });
  }
);

//Edit image
export const editImage = 
createAsyncThunk('user/editImage', async(body) => {
    // console.log(body)
    return editImageService(
        body.token,
        body.image
    ).then((res) =>{
        console.log(res.data)
        return res.data
    }).catch((err) =>{
        console.log(err.response.data.message)
        return err.response.data.message
    })
})

export const userSlice = createSlice({
    name:"user",
    initialState:{
        currentUser: {
            firstName:'',
            lastName:'',
            email:'',
            userId:'',
            profileImage:'',
            birthday:'',
            gender:'',
            phone:''
        },
        token:null,
        isMobile:false,
        displaySignupForm:false,
        displaySigninForm:false,
        displayForgotPasswordForm:false,
        signupInProgress:false,
        signinInProgress:false,
        displayUserDetailsForm:true,
        displayOtpForm:false,
        displayPasswordForm:false,
        displayMailForm:true,
        forgotPasswordInProgress:false,
        signupError:null,
        loginError:null
    },
    reducers:{
        logoutAccount:(state)=>{
            state.token = null
            state.currentUser = {
                firstName:'',
                lastName:'',
                email:'',
                profileImage:'',
                userId:'',
                birthday:'',
                gender:'',
                phone:''
            }
        },
        openSignupForm:(state)=>{
            state.displaySignupForm = true
        },
        openSigninForm:(state)=>{
            state.displaySigninForm = true
        },
        openForgotPasswordForm:(state)=>{
            state.displaySigninForm = false
            state.displayForgotPasswordForm = true
            state.displayMailForm = true
            state.displayOtpForm = false
            state.displayPasswordForm = false
        },
        closeForgotPasswordForm:(state)=>{
            state.displayForgotPasswordForm = false
        },
        closeSignupForm:(state)=>{
            state.displaySignupForm = false
        },
        closeSigninForm:(state)=>{
            state.displaySigninForm = false
        },
        changeIsMobile:(state,action) => {
            state.isMobile = action.payload
        }
    },
    extraReducers:{
        [createAccount.pending]:(state) => {
            state.signupInProgress = true
            console.log("pending")
        },
        [createAccount.fulfilled]:(state,action) =>{
            state.signupInProgress =false
            if(action.payload.message ==="success"){
                state.displaySignupForm = false
                state.displayUserDetailsForm = true
                state.displayOtpForm = false
                state.displayPasswordForm = false
                console.log("Tài khoản đã được tạo")
                notifications.show({
                    title: 'Tạo tài khoản thành công',
                    message: 'Bây giờ, bạn có thể đăng nhập với tài khoản vừa tạo',
                    icon: <SuccessIcon />,
                    radius:"lg",
                    autoClose: 5000,
                })
            }else {
                console.log(action.payload)
                notifications.show({
                    title: action.payload.message,
                    message: 'Vui lòng thử lại!!',
                    radius:"lg",
                    color:"red",
                    autoClose: 5000,
                })
            }
            state.displaySignupForm = false
        },
        [createAccount.rejected]:(state)=>{
            state.signupInProgress = false
            
            notifications.show({
                title: 'Yêu cầu thất bại',
                message: 'Vui lòng thử lại!!',
                radius:"lg",
                color:"red",
                autoClose: 5000,
            })
            
        },
        [loginAccount.pending]:(state) => {
            state.signinInProgress = true
            console.log("Chờ....")
        },
        [loginAccount.fulfilled]:(state,action) =>{
            state.signinInProgress =false
            console.log(action)
            if(action.payload.message ==="success"){
                state.token = action.payload.data.token
                state.displaySigninForm = false
            }else {
                notifications.show({
                    title: action.payload.message,
                    message: 'Vui lòng thử lại!!',
                    radius:"lg",
                    color:"red",
                    autoClose: 5000,
                })
            }
        },
        [loginAccount.rejected]:(state)=>{
            state.signinInProgress = false
            notifications.show({
                title: "Đã có lỗi xảy ra ",
                message: 'Vui lòng thử lại!!',
                radius:"lg",
                color:"red",
                autoClose: 5000,
            })
        },
        [validateToken.pending]:(state) => {
            console.log("validate token pending")
        },
        [validateToken.fulfilled]:(state,action) =>{
            console.log("validate token success")
            if(action.payload.message ==="success"){
                state.currentUser.firstName = action.payload.data.user.firstName
                state.currentUser.lastName = action.payload.data.user.lastName
                state.currentUser.email = action.payload.data.user.email
                state.currentUser.userId = action.payload.data.user.userId
                state.currentUser.profileImage = action.payload.data.user.profileImage
                state.currentUser.birthday = action.payload.data.user.birthday
                state.currentUser.gender = action.payload.data.user.gender
                state.currentUser.phone = action.payload.data.user.phone
            }else {
                state.loginError = action.payload.message
                state.token = null
                notifications.show({
                    title: action.payload.message,
                    message: 'Vui lòng thử lại!!',
                    radius:"lg",
                    color:"red",
                    autoClose: 5000,
                })
            }
        },
        [validateToken.rejected]:(state)=>{
            state.token = null
            console.log("validate token failed")
            notifications.show({
                title: 'Phiên làm việc hết hạn',
                message: 'Đăng nhập lại!!',
                radius:"lg",
                color:"red",
                autoClose: 5000,
            })
        },
        [sendVerificationCode.pending]:(state) => {
            state.signupInProgress = true
            console.log("chờ....")
        },
        [sendVerificationCode.fulfilled]:(state,action) =>{
            state.signupInProgress =false
            if(action.payload?.status === 200){
                state.displayUserDetailsForm = false
                state.displayOtpForm = true
                console.log("Tài khoản đã được tạo")
                notifications.show({
                    title: 'Mã xác thực đã được gửi đi',
                    message: 'Mã xãc thực đã được gửi tới email của bạn ',
                    icon: <SuccessIcon />,
                    radius:"lg",
                    autoClose: 5000,
                })
            }else {
                notifications.show({
                    title: action.payload?.data?.message,
                    message: 'Vui lòng thử lại!!',
                    radius:"lg",
                    color:"red",
                    autoClose: 5000,
                })
            }
        },
        [sendVerificationCode.rejected]:(state)=>{
            state.signupInProgress = false
            
            notifications.show({
                title: 'Yêu cầu thất bại',
                message: 'Vui lòng thử lại!!',
                radius:"lg",
                color:"red",
                autoClose: 5000,
            })
            
        },
        [verifyCode.pending]:(state) => {
            state.signupInProgress = true
            state.forgotPasswordInProgress = true
            console.log("chờ...")
        },
        [verifyCode.fulfilled]:(state,action) =>{
            state.signupInProgress =false
            state.forgotPasswordInProgress = false
            if(action.payload.status === 200){
                state.displayOtpForm = false
                state.displayPasswordForm = true
                notifications.show({
                    title: 'Xác thực thành công',
                    message: 'mã đã được xác thực thành công ',
                    icon: <SuccessIcon />,
                    radius:"lg",
                    autoClose: 5000,
                })
            }else {
                console.log(action.payload)
                notifications.show({
                    title: action.payload.message,
                    message: 'Vui lòng thử lại!!',
                    radius:"lg",
                    color:"red",
                    autoClose: 5000,
                })
            }
        },
        [verifyCode.rejected]:(state)=>{
            state.signupInProgress = false
            state.forgotPasswordInProgress = false
            notifications.show({
                title: 'Yêu cầu thất bại',
                message: 'Vui lòng thử lại!!',
                radius:"lg",
                color:"red",
                autoClose: 5000,
            })
            
        },
        [newPassword.pending]:(state) => {
            state.forgotPasswordInProgress = true
            console.log("chờ...")
        },
        [newPassword.fulfilled]:(state,action) =>{
            state.forgotPasswordInProgress =false
            if(action.payload.status === 200){
                state.displayForgotPasswordForm = false
                state.displayOtpForm = false
                state.displayPasswordForm = false
                state.displayMailForm = true
                notifications.show({
                    title: 'Khôi phục mật khẩu thành công',
                    message: 'Bây giờ bạn có thể đăng nhập bằng mật khẩu mới',
                    icon: <SuccessIcon />,
                    radius:"lg",
                    autoClose: 5000,
                })
            }else {
                console.log(action.payload)
                notifications.show({
                    title: action.payload.message,
                    message: 'Vui lòng thử lại!!',
                    radius:"lg",
                    color:"red",
                    autoClose: 5000,
                })
            }
        },
        [newPassword.rejected]:(state)=>{
            state.forgotPasswordInProgress = false
            
            notifications.show({
                title: 'Yêu cầu thất bại',
                message: 'Vui lòng thử lại!!',
                radius:"lg",
                color:"red",
                autoClose: 5000,
            })
            
        },
        [sendVerificationCodeForFP.pending]:(state) => {
            state.forgotPasswordInProgress = true
            console.log("chờ...")
        },
        [sendVerificationCodeForFP.fulfilled]:(state,action) =>{
            state.forgotPasswordInProgress =false
            if(action.payload?.status === 200){
                state.displayMailForm = false
                state.displayOtpForm = true
                console.log("Tài khoản đã được tạo")
                notifications.show({
                    title: 'Mã xác thực đã được gửi',
                    message: 'mã xác thực đã được gửi tới email của bạn ',
                    icon: <SuccessIcon />,
                    radius:"lg",
                    autoClose: 5000,
                })
            }else {
                notifications.show({
                    title: action.payload?.data?.message,
                    message: 'Vui lòng thử lại!!',
                    radius:"lg",
                    color:"red",
                    autoClose: 5000,
                })
            }
        },
        [sendVerificationCodeForFP.rejected]:(state)=>{
            state.forgotPasswordInProgress = false
            
            notifications.show({
                title: 'Yêu cầu thất bại',
                message: 'Vui lòng thử lại!!',
                radius:"lg",
                color:"red",
                autoClose: 5000,
            })
            
        }
    }
})

export const {
    openSignupForm,
    openSigninForm,
    closeSignupForm,
    closeSigninForm,
    openForgotPasswordForm,
    closeForgotPasswordForm,
    changeIsMobile
} = userSlice.actions
export default userSlice.reducer
