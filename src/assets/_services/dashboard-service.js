import * as api from "../api/index"

export const DashboardService = {
    getDashboardData
}

async function getDashboardData (formData){
    try {
        const { data } = await api.getDashboardData(formData);
        return {isSuccess : true , data : data}

    } catch (error) {
        return {isSuccess : false , data : error}

    }
}