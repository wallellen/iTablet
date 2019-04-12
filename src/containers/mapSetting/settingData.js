import { language,getLanguage } from '../../language/index'

function getMapSettings() {
  let data = [
    {
      title: getLanguage(global.language).Map_Setting.BASIC_SETTING,
      // '基本设置',
      visible: true,
      index: 0,
      data: [
        {
          name: getLanguage(global.language).Map_Setting.ROTATION_GRSTURE,
          //'手势旋转',
          value: false,
          isShow: true,
          sectionIndex: 0,
        },
        {
          name: getLanguage(global.language).Map_Setting.PITCH_GESTURE,
          //'手势俯仰',
          value: false,
          isShow: true,
          sectionIndex: 0,
        },
        // {
        //   name: '专题图图例',
        //   value: false,
        //   isShow: true,
        //   sectionIndex: 0,
        // },
      ],
    },
    {
      title: getLanguage(global.language).Map_Setting.EFFRCT_SETTINFS,
      //'效果设置',
      visible: true,
      index: 0,
      data: [
        // {
        //   name: '旋转角度',
        //   value: '',
        //   isShow: true,
        //   sectionIndex: 1,
        // },
        // {
        //   name: '颜色模式',
        //   value: '',
        //   isShow: true,
        //   sectionIndex: 1,
        // },
        // {
        //   name: '背景颜色',
        //   value: '',
        //   isShow: true,
        //   sectionIndex: 1,
        // },
        // {
        //   name: '文本反走样',
        //   value: false,
        //   isShow: true,
        //   sectionIndex: 1,
        // },
        // {
        //   name: '线型反走样',
        //   value: false,
        //   isShow: true,
        //   sectionIndex: 1,
        // },
        // {
        //   name: '固定符号角度',
        //   value: false,
        //   isShow: true,
        //   sectionIndex: 1,
        // },
        // {
        //   name: '固定文本角度',
        //   value: false,
        //   isShow: true,
        //   sectionIndex: 1,
        // },
        // {
        //   name: '固定文本方向',
        //   value: false,
        //   isShow: true,
        //   sectionIndex: 1,
        // },
        {
          name: getLanguage(global.language).Map_Setting.ANTI_ALIASING_MAP,
          //'反走样地图',
          value: false,
          isShow: true,
          sectionIndex: 1,
        },
        {
          name:  getLanguage(global.language).Map_Setting.SHOW_OVERLAYS,
          //'显示压盖对象',
          value: false,
          isShow: true,
          sectionIndex: 1,
        },
      ],
    },
    {
      title:  getLanguage(global.language).Map_Setting.BOUNDS_SETTING,
      //'范围设置',
      visible: true,
      index: 1,
      data: [
        // {
        //   name: '中心点',
        //   value: '',
        //   isShow: true,
        //   sectionIndex: 2,
        // },
        // {
        //   name: '比例尺',
        //   value: '',
        //   isShow: true,
        //   sectionIndex: 2,
        // },
        // {
        //   name: '固定比例尺级别',
        //   value: '',
        //   isShow: true,
        //   sectionIndex: 2,
        // },
        // {
        //   name: '当前窗口四至范围',
        //   value: '',
        //   isShow: true,
        //   sectionIndex: 2,
        // },
        {
          name: getLanguage(global.language).Map_Setting.FIX_SCALE,
          //'固定比例尺',
          value: false,
          isShow: true,
          sectionIndex: 2,
        },
      ],
    },
    // {
    //   title: '坐标系设置',
    //   visible: true,
    //   index: 3,
    //   data: [
    //     {
    //       name: '投影信息',
    //       value: '',
    //       isShow: true,
    //       sectionIndex: 3,
    //     },
    //     {
    //       name: '投影设置',
    //       value: '',
    //       isShow: true,
    //       sectionIndex: 3,
    //     },
    //     {
    //       name: '投影转换',
    //       value: '',
    //       isShow: true,
    //       sectionIndex: 3,
    //     },
    //   ],
    // },
  ]
  return data
}
export { getMapSettings }
