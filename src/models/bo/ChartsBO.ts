
export enum ChartsStatus {
  stat = 0, // 统计
  real = 1, // 实时
  common = 'common', // 公用接口
  special = 'special', // 特殊接口
  doubleAxis = 'true', // 双轴坐标系
}

// 折线图接口参数
export interface GetChartsParamsBO {
  dateType: any;
  endTime: number;
  startTime: number;
  tagNameList: string[];
  type: ChartsStatus;
}

export enum AliasType {
  directPump = 'directPump',
  temperature = 'temperature',
}

// 折线图页面接受参数
export interface ChartsPageParamsBO extends GetChartsParamsBO {
  name: string;
  interfaceType?: ChartsStatus; // 接口类型
  doubleAxis?: boolean; // 双轴坐标系
  aliasType?: string; // 特殊接口图例名字
}

export interface ChartsDataBO {
  avg: number;
  sum: number;
  name: string;
  unit: string;
  valueList?: ChartsList[];
}

export interface ChartsList {
  name: string;
  time: string;
  value: number,

}
