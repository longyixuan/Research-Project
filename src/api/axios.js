import axios from 'axios'
import qs from 'querystring'

const ajaxUrl = 'http://rap2api.taobao.org/app/mock/15051/';
let fetch = axios.create({
    header: { 'Content-Type': 'application/json' },
    baseURL: ajaxUrl,
    timeout: 5000,
    transformRequest: [function (data) {
        return qs.stringify(data);
    }]

})
export function getUserName(data) {
    return fetch({
        url: 'test',
        method: 'post',
        data: data
    });
}