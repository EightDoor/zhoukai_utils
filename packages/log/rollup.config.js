import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import filesize from 'rollup-plugin-filesize'
import uglify from '@lopatnov/rollup-plugin-uglify'

const isProd = process.env.NODE_ENV === 'production'

export default {
  input: 'src/index.ts', // 打包入口
  output: {
    // 打包出口
    file: 'dist/index.js', // 最终打包出来的文件路径和文件名，这里是在package.json的browser: 'dist/index.js'字段中配置的
    //     格式(format -f/--output.format)
    // 文档地址 https://www.rollupjs.com/guide/big-list-of-options
    // String 生成包的格式。 下列之一:

    //     amd – 异步模块定义，用于像RequireJS这样的模块加载器
    //     cjs – CommonJS，适用于 Node 和 Browserify/Webpack
    //     esm – 将软件包保存为 ES 模块文件，在现代浏览器中可以通过 <script type=module> 标签引入
    //     iife – 一个自动执行的功能，适合作为<script>标签。（如果要为应用程序创建一个捆绑包，您可能想要使用它，因为它会使文件大小变小。）
    //     umd – 通用模块定义，以amd，cjs 和 iife 为一体
    //     system - SystemJS 加载器格式
    format: 'umd', // umd是兼容amd/cjs/iife的通用打包格式，适合浏览器
    name: 'zhoukai_utils',
    sourcemap: false,
  },
  plugins: [
    // 打包插件
    resolve(), // 查找和打包node_modules中的第三方模块
    commonjs(), // 将 CommonJS 转换成 ES2015 模块供 Rollup 处理
    typescript({
      tsconfig: './tsconfig.json',
    }), // 解析TypeScript
    filesize(),
    isProd && uglify(),
  ],
}
