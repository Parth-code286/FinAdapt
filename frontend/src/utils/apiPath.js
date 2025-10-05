export const BASE_URL = "http://localhost:8000";

export const API_PATHS = {
    AUTH:{
        LOGIN:"/api/v1/auth/login",
        REGISTER:"/api/v1/auth/register",
        GET_USER_INFO:"/api/v1/auth/getUser"
    },
    DASHBOARD :{
        GET_DATA:"/api/v1/dashboard/dashboardData"
    },
    INCOME : {
        ADD_INCOME:"/api/v1/income/addincome",
        DELETE_INCOME:(incomeId)=>`/api/v1/income/${incomeId}`,
        GET_ALL_INCOME:"/api/v1/income/getallincome",
        DOWNLOAD:"/api/v1/income/downloadincomeexcel"
    },
    EXPENSE : {
        ADD_EXPENSE:"/api/v1/expenses/addexpense",
        DELETE_EXPENSE:(expenseId)=>`/api/v1/expenses/${expenseId}`,
        GET_ALL_EXPENSE:"/api/v1/expenses/getallexpense",
        DOWNLOAD:"/api/v1/expenses/downloadexpenseexcel"
    },
    IMAGE_UPLOAD:{
        UPLOAD_IMAGE:"/api/v1/auth/upload"
    }
}