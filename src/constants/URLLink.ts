// const DEV_URL = 'http://mobiletest.baosteel.com';
const DEV_URL = '/api';
// const DEV_URL = 'http://10.73.9.80:9004/';
// const DEV_URL = 'http://10.11.50.126:8081/water';

export const BASE_URL = process.env.NODE_ENV === 'development' ? DEV_URL : 'http://mobile.baosteel.com';   // 正式地址：http://mobile.baosteel.com  // 测试地址 http://mobiletest.baosteel.com

// '/iPlatMBS/AgentService';
// 基座
export const GET_BAOSTEEL_SERVICE = '/iPlatMBS/AgentService'
