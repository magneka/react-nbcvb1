import { useReducer } from 'react';
import axiosTokenInstance from '../Instances/axiosTokenInstance'
import { toast } from 'react-toastify';

/***********************************************************************
 * Generic hook for requests to server
 * 
 * Uses a interceptor to add token to request. Interceptor will know
 * the root url to api.
 * 
 * use like this:
 * 
 * import useAxios from './useAxios'
 * ..
 * const [postFakt, postfaktState] = useAxio()
 * ..
 * const postUtsettSak = () => {
 *   postFakt('post', "/api/sak/UtsettSak", {'field1': 'somevalue' }, 'toastmessage')
 * }
 * 
 * 
 * note: If data object sendt is of FormData, controller method model 
 * must be annotated with [FromForm].
 * if data object is plain json, no annotation is to be used in the 
 * .net controller
 * 
 * info:
 * https://jasonwatmore.com/post/2020/07/17/react-axios-http-post-request-examples
 ***********************************************************************/


 // TODO Fix denne slik at du tømmer gamle data ved loading
 // F.eks. send inn default data i funksjon
const useAxios = ((clearState = false) => {

    const showToasts = true;

    const actions = {
        CLEARSTATE: 'CLEARSTATE',
        LOADING: 'LOADING',
        DATA: 'DATA',
        ERROR: 'ERROR',
    }

    const dataReducer = (state, action) => {

        console.log('UseAxios: ', JSON.stringify(action))

        switch (action.type) {
            case actions.CLEARSTATE:
                return {
                    data: {},
                    loading: true,
                    error: null
                };
            case actions.LOADING:
                return {
                    ...state,
                    loading: true,
                    error: null
                };
            case actions.DATA:
                return {
                    data: { result: action.data },
                    loading: false,
                    error: null
                };
            case actions.ERROR:
                return {
                    ...state,
                    loading: false,
                    error: action.error
                };

            default:
                return state;
        }
    }

    const initialState = {
        data: {},
        loading: false,
        error: false
    }

    const [state, dispatch] = useReducer(dataReducer, initialState)

    const postData = (method, url, data, info) => {

        console.log(`Requesting: ${method}: ${url}`, data);
        (showToasts && toast.info(`Sender forespørsel vedr: ${info}`))
        
        // Need to clear state for combos
        if (clearState)
            dispatch({ type: actions.CLEARSTATE, data: data })
        else       
            dispatch({ type: actions.LOADING, data: data });

        // Posting
        axiosTokenInstance({
            method: method,
            url: url,
            data: data
        })
            //.post(uri, data)
            .then(result => {
                console.log(result);
                if (result.status === 200) {
                    dispatch({ type: actions.DATA, data: result.data });
                    (showToasts && toast.success(`Mottat data fra sky vedr: ${info}`))
                }
                else {
                    dispatch({
                        type: actions.ERROR,
                        error: { statuscode: result.status, statusText: result.statusText }
                    });
                    (showToasts && toast.error(`Feil oppstod ved ${info} ${result.statusText}`))
                }
            })
            .catch(error => {
                console.error("error: ", error);
                dispatch({ type: actions.ERROR, error: error });
                (showToasts && toast.error(`Feil oppstod vedr: ${info},  ${error}`))
            });
    }

    return [postData, state]
})

export default useAxios