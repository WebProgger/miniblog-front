import axios from "axios";
import {REQUEST_LOADING} from "@/store/actions/http";
import store from "@/store";
import {ALERT_SHOW, ALERT_STYLE_ERROR, ALERT_STYLE_SUCCESS} from "@/store/actions/alert";

export const httpHook = () => {
    const instance = axios.create({
        baseURL: 'http://localhost:8000/api/',
        timeout: 5000,
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    });

    const httpGet = async (url, params) => {
        return new Promise((resolve, reject) => {
            //store.dispatch(REQUEST_LOADING, true);
            instance.get(`${url}/`, params).then((response) => {
                //store.dispatch(REQUEST_LOADING, false);
                //store.dispatch(ALERT_SHOW, { style: ALERT_STYLE_SUCCESS, text: response.data.message });
                resolve(response.data);
            }).catch((error) => {
                //store.dispatch(REQUEST_LOADING, false);
                //store.dispatch(ALERT_SHOW, { style: ALERT_STYLE_ERROR, text: error.response.data.message });
                reject(error);
            });
        });
    }

    const httpPost = async (url, postData) => {
        return new Promise((resolve, reject) => {
            store.dispatch(REQUEST_LOADING, true);
            instance.post(`${url}/`, postData).then((response) => {
                store.dispatch(REQUEST_LOADING, false);
                store.dispatch(ALERT_SHOW, { style: ALERT_STYLE_SUCCESS, text: response.data.message });
                resolve(response.data);
            }).catch((error) => {
                store.dispatch(REQUEST_LOADING, false);
                store.dispatch(ALERT_SHOW, { style: ALERT_STYLE_ERROR, text: error.response.data.message });
                reject(error);
            });
        });
    }

    const httpPatch = async (url, data) => {
        return new Promise((resolve, reject) => {
            store.dispatch(REQUEST_LOADING, true);
            return instance.patch(`${url}/`, data).then((response) => {
                store.dispatch(REQUEST_LOADING, false);
                store.dispatch(ALERT_SHOW, { style: ALERT_STYLE_SUCCESS, text: response.data.message });
                resolve(response.data);
            }).catch((error) => {
                store.dispatch(REQUEST_LOADING, false);
                store.dispatch(ALERT_SHOW, { style: ALERT_STYLE_ERROR, text: error.response.data.message });
                reject(error);
            });
        });
    }

    const httpDelete = async (url) => {
        return new Promise((resolve, reject) => {
            store.dispatch(REQUEST_LOADING, true);
            return instance.delete(`${url}/`).then((response) => {
                store.dispatch(REQUEST_LOADING, false);
                store.dispatch(ALERT_SHOW, { style: ALERT_STYLE_SUCCESS, text: response.data.message })
                resolve(response.data);
            }).catch((error) => {
                store.dispatch(REQUEST_LOADING, false);
                store.dispatch(ALERT_SHOW, { style: ALERT_STYLE_ERROR, text: error.response.data.message });
                reject(error);
            });
        });

    }


    return { httpGet, httpPost, httpPatch, httpDelete }
}