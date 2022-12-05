/*
 * @FilePath: http.js
 * @Author: JHui
 * @Date: 2022-10-18 15:46:14
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-10-21 14:54:09
 * @Descripttion: axios的封装
 */
import axios from 'axios';

const baseUrl = process.env.VUE_APP_BASE_API;
// 导出路径为全局路径
window.req = baseUrl;

// 添加axios 根据环境进行判断添加请求端口  process.env.NODE_ENV === 'production' 判断请求环境是否在生产环境
axios.defaults.baseURL = baseUrl;
// 添加axios在请求时默认的配置
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';
axios.defaults.headers.post['Accept'] = 'application/json';

// 当请求超过3s就会告知当前请求超时，请刷新
axios.defaults.timeout = 30000;

// 判断是否为json格式
function isJSON(val) {
  if (typeof val !== 'string') {
    return false;
  }
  try {
    const obj = JSON.parse(val);
    if (Object.prototype.toString.call(obj) === '[object Object]') {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
}

// 请求拦截器
axios.interceptors.request.use(
  config => {
    // 在每次请求的时候拦截请求的头部,在此时可以添加token以及一些后台所需要的令牌
    // let token = getToken();  获取token
    // const districtId = store.state.user.districtId;  涉及区域id
    if (token) {
      // config.url += '?districtId=' + districtId;
      config.headers.common['Authorization'] = token;
    }

    return config;
  },
  error => {
    return Promise.error(error);
  }
);

// 响应拦截器
axios.interceptors.response.use(
  response => {
    const { data, status } = response;
    const resData = isJSON(data) ? JSON.parse(data) : data;
    // 做一些过期判断
    if (status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  error => {
    if (error.response.status) {
      // 不同状态码 操作
    }
    return Promise.error(error);
  }
);

export function request(_param) {
  const {
    method = 'get',
    // `responseType` 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
    responseType = 'json', // 默认的
    headers = {},
    url = '',
    params,
    data,
    ...otherData
  } = _param;

  if (!url) {
    return new Promise((resolve, reject) => {
      reject('url is null');
    });
  }
  const _method = method.toLowerCase();

  if (_method === 'get') {
    return axios({
      responseType,
      url,
      headers,
      method,
      params: params || data || otherData
    });
  }

  if (_method === 'post') {
    if (params && data) {
      return axios({
        responseType,
        url,
        headers,
        method,
        params,
        data
      });
    } else {
      const { start, limit, ...resetData } = otherData;
      return axios({
        responseType,
        url,
        headers,
        method,
        params: params || {
          start,
          limit
        },
        data: data || resetData
      });
    }
  }
}
