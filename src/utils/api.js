import axios from "axios";
import router from "../router";
import {Message} from 'element-ui';
import en from "element-ui/src/locale/lang/en";


//响应信息拦截器
axios.interceptors.response.use(success => {
//成功时的拦截器
    if (success && success.status === 200 && success.data.code === 500) {
        //表示成功返回。但是返回的是自定义过得错误信息
        Message.error({message: success.data.message})
        return ;
    }
    if (success && success.status === 200 && success.data.code === 200) {
        //表示成功返回，并且返回的是自定成功的信息
        Message.success({message: success.data.message})
    }
    //返回数据
    return success.data;
}, error => {
    //服务异常类的错误
    if (error.response.status === 504 || error.response.status === 404) {
        Message.error({message: "服务器开小差了！"})
    } else if (error.response.status === 403) {
        Message.error({message: "权限不足，请联系管理员！"})
    } else if (error.response.status === 401) {
        Message.error({message: "尚未登录，请登录！"})
        //跳转登录页
        router.replace("/login")
    } else {
        //其他情况的异常信息
        if (error.response.data.message) {
            Message.error({message: error.response.data.message})
        } else {
            Message.error({message: "未知错误"})
        }
    }
    return;


});

let base = '';

export const postKeyValueRequest = (url, param) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: param,
        transformRequest: [
            function (data) {
                let ret = '';
                for (let i in data) {
                    ret += encodeURIComponent(i) + "=" + encodeURIComponent(data[i]) + '&'
                }
                return ret;
            }],
        headers: {
            "Content-Type":"application/x-www-form-urlencoded"
        }
    })
};
export const postRequest = (url, param) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: param
    })
};
export const putRequest = (url, param) => {
    return axios({
        method: 'put',
        url: `${base}${url}`,
        data: param
    })
};
export const deleteRequest = (url, param) => {
    return axios({
        method: 'delete',
        url: `${base}${url}`,
        data: param
    })
};
export const getRequest = (url, param) => {
    return axios({
        method: 'get',
        url: `${base}${url}`,
        data: param
    })
};

//实现图片上传
export const postImageUpload=(url ,param)=>{
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: param,
        headers: { 'Content-Type': 'multipart/form-data' },
    })
}