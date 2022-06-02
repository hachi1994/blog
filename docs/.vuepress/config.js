/*
 * @Author: your name
 * @Date: 2021-04-14 15:14:09
 * @LastEditTime: 2021-04-16 16:27:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vuePressCode\.vuepress\config.js
 */

// meting插件
let meting = [
  'meting',
  {
    // 这个 API 是不可用的，只是作为示例而已
    // metingApi: 'https://meting.example.com/api/',
    meting: {
      server: 'netease',
      type: 'playlist',
      mid: '2539599584',
    }, // 不配置该项的话不会出现全局播放器
    aplayer: {
      lrcType: 3,
      audio: [
        {
          url: './public/mp3/1.mp3',
          name: 'name',
          artist: 'artist'
        }
      ]
    },
  },
]

module.exports = {
  title: '尼莫毛毛星球',
  head:[
    ['link',{rel:'shortcut icon',href:'/icon/favicon.ico'}],
    ['meta',{name:'baidu-site-verification',content:'code-u9R685wCgI'}]
  ],
  description: 'nico，momo可真是个臭猪。',
  theme: 'reco',
  configureWebpack: {
    resolve: {
      alias: {
        '@mp3': '.vuepress/public/mp3'
      }
    }
  },
  plugins: [
    'aplayer',
    //meting,
    ['ribbon',{
            size: 90, // width of the ribbon, default: 90
            opacity: 0.8, // opacity of the ribbon, default: 0.3
            zIndex: -1, // z-index property of the background, default: -1
    }],
    [
      'cursor-effects',
      {
        size: 2, // size of the particle, default: 2
        shape: ['circle'], // shape of the particle, default: 'star'
        zIndex: 999999999, // z-index property of the canvas, default: 999999999
      },
    ],
    [
      'vuepress-plugin-helper-live2d', {
        live2d: {
          // 是否启用(关闭请设置为false)(default: true)
          enable: true,
          // 模型名称(default: hibiki)>>>取值请参考：
          // https://github.com/JoeyBling/hexo-theme-yilia-plus/wiki/live2d%E6%A8%A1%E5%9E%8B%E5%8C%85%E5%B1%95%E7%A4%BA
          model: 'hijiki',
          display: {
            position: 'right', // 显示位置：left/right(default: 'right')
            width: 135, // 模型的长度(default: 135)
            height: 300, // 模型的高度(default: 300)
            hOffset: 65, //  水平偏移(default: 65)
            vOffset: 0, //  垂直偏移(default: 0)
          },
          mobile: {
            show: true // 是否在移动设备上显示(default: false)
          },
          react: {
            opacity: 1 // 模型透明度(default: 0.8)
          }
        }
      }
    ],
    // [
    //   'vuepress-plugin-comment',
    //   {
    //     choosen: 'valine',
    //     // options选项中的所有参数，会传给Valine的配置
    //     options: {
    //       el: '#valine-vuepress-comment',
    //       appId: '7GeswqnsNWyVDJz94dHu9NsY-gzGzoHsz',
    //       appKey: 'rBOGx1iYy1lF7RtLcc84bIr0'
    //     }
    //   }
    // ]
  ],
  themeConfig: {
    type: 'blog',
    logo: '/img/avatar1.jpg',
    authorAvatar: '/img/avatar1.jpg',
    
    record: '苏ICP备2021048955号-1',
    recordLink: 'https://beian.miit.gov.cn/',
    // cyberSecurityRecord: '公安部备案文案',
    // cyberSecurityLink: '公安部备案指向链接',
    
    // 项目开始时间，只填写年份
    startYear: '2021',

    friendLink: [
      {
        title: 'vuepress-theme-reco',
        link: 'https://vuepress-theme-reco.recoluan.com/',
        logo: '/assets/icon_vuepress_reco.png',
        desc: 'A simple and beautiful vuepress Blog & Doc theme.'
      },
      {
        title: 'vuepress',
        link: 'https://vuepress.vuejs.org/zh/',
        logo: '/assets/vuePress_icon.png',
        desc: 'Vue 驱动的静态网站生成器.'
      },
      {
        title: '午后南杂',
        link: 'https://www.recoluan.com/',
        desc: 'Enjoy when you can, and endure when you must.',
        logo: '/assets/reco_luan.png'
      },
      {
        title: 'awesome-vuepress-plugins',
        link: 'https://github.com/vuepress/awesome-vuepress#plugins',
        desc: '各种vuepress插件',
        logo: ''
      }
    ],
    nav: [
      { text: '主页', link: '/' },
      { text: '百度', link: 'https://www.baidu.com' },
      { text: 'love', link: 'http://love.jaelizumi.cn' },
      { text: 'github', link: 'https://github.com/hachi1994' ,icon:'reco-github'},
      // { text: '百度', link: 'https://www.baidu.com' },
      // { text: 'TimeLine', link: '/timeline/', icon: 'reco-date' }
    ]
  }
}
