
// <!--**
// *
// *----------Created by dyj on 2018/12/26----------
// * 　　　┏┓　　　┏┓
// * 　　┏┛┻━━━┛┻┓
// * 　　┃　　　　　　　┃
// * 　　┃　　　━　　　┃
// * 　　┃　┳┛　┗┳　┃
// * 　　┃　　　　　　　┃
// * 　　┃　　　┻　　　┃
// * 　　┃　　　　　　　┃
// * 　　┗━┓　　　┏━┛
// * 　　　　┃　　　┃神兽保佑
// * 　　　　┃　　　┃代码无BUG！
// * 　　　　┃　　　┗━━━┓
// * 　　　　┃　　　　　　　┣┓
// * 　　　　┃　　　　　　　┏┛
// * 　　　　┗┓┓┏━┳┓┏┛
// * 　　　　　┃┫┫　┃┫┫
// * 　　　　　┗┻┛　┗┻┛
// * ━━━━━━神兽出没━━━━━━
// *-->
















import axios from 'axios'
import qs from 'qs'
/**
 *  axios请求拦截器
 **/
axios.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

/**
 * axios 响应拦截器
 **/
axios.interceptors.response.use(response => {
  return response
}, error => {
  if (error.response) {

    if(error.response.status === 401){
      alert("登录过期，请重新登录")
      window.location.href = '/login'
    }
    if(error.response.status === 403){
      alert("权限不足，请联系管理员")
    }
}
return Promise.reject(error.response.data) 
})


// function checkStatus (response) {
//   // 如果状态码正常就直接返回数据,这里的状态码是htttp响应状态码有400，500等，不是后端自定义的状态码
//   if (response && ((response.status === 200 || response.status === 304 || response.status === 400))) {
//     return response
//   }
//   return { // 自定义网络异常对象
//     code: '404',
//     message: '网络异常'
//   }
// }

function checkCode (res) {
  // 如果状态码正常就直接返回数据
if (res.data.code === "0005") { 
    alert(res.data.msg)
    return ;
  }else if(res.data.code === 404){ 
    alert(res.data.msg)
    return ;
  }else{
    return res
  }
   
}

export default {

imgpost(url,data){
  return axios({
    method: 'post',
    url: url,
    data: data,
    timeout: 30000
  }).then((res) => {
    //return checkStatus(res)
   return checkCode(res)
  })
},

  post (url, data) {
    return axios({
      method: 'post',
      url: url,
      data: qs.stringify(data),
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
         'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      timeout: 30000
    }).then((response) => {
      //return checkStatus(res)
     return checkCode(response)
    })
  },
  get (url, params) {
    return axios({
      method: 'get',
      //baseURL: process.env.BASE_URL,
      url,
      params,
      timeout: 30000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).then((response) => {
       // return checkStatus(response)
       return checkCode(response)
       
      })

  }

}