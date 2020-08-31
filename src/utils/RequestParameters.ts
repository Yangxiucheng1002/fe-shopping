export const RequestGet = (param: { projectName: string; url: string; }) => {
    return {
        datatype: 'json/json',
        // eslint-disable-next-line @typescript-eslint/camelcase
        parameter_postdata: JSON.stringify({
            'attr': {
                'requestType': 'get',
                'datatype': 'json/json',
                'methodName': '',
                'projectName': `${param.projectName}`,  // watertest    cisdiproject
                'serviceName': `${param.url}`,
            },
        }),
    };
};
export const RequestPost = (param: { data: []; projectName: string; url: string; }) => {
    return {
        data: param.data,
        attr: {
            datatype: 'json/json',
            requestType: 'post',
            projectName: `${param.projectName}`,
            serviceName: `${param.url}`,
            methodName: '',
        },
    };
};

export const getData = (param: { data: any; }) => {
    if (param.data) {
        return param.data
    } else {
        return '当前参数不正确'
    }
}
