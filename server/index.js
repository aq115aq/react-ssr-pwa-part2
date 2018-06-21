import express from 'express'
import * as fs from 'fs'
import * as path from 'path'

// react
import * as React from 'react'
import * as ReactDOMServer from 'react-dom/server'

// router
import { StaticRouter } from 'react-router-dom'
import getRoutes from '../src/routes';

// redux
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux';
import reducer from '../src/redux';
import thunkMiddleware from 'redux-thunk'

const app = express()

app.use(express.static(path.resolve('build'), {index: false})) // 资源获取路径设置为 build 目录下

app.get('*', (req, res) => {
  const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore) // 使用redux-thunk中间件
  const store = createStoreWithMiddleware(reducer)

  const context = {}
  // 根据 url 匹配组件，生成字符串
  const reactComponents = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter
        location={req.url}
        context={context}
      >
        {getRoutes()}
      </StaticRouter>
    </Provider>
  )
  
  // 获取当前的 state
  const state = store.getState()
  
  // 读取客户端入口打包出的 html 模板
  fs.readFile(path.resolve('build/index.html'), 'utf8', (err, data) => {
  
    if (err) {
        throw err;
    }
    
    // 把 state 状态插入到 HTML 中，前端通过 window.init_state 获取
    let document = data.replace('<\/title>',`</title><script>window.init_state = ${JSON.stringify(state)}</script>`)
    
    // 把渲染后的 React HTML 插入到 div（id=root） 中
    document = document.replace(/<div id="root"><\/div>/, `<div id="root">${reactComponents}</div>`);

    // 把html字符发给客户端
    res.send(document)
  })
})

app.listen(8088, () => {
    console.log('监听：8088')
});