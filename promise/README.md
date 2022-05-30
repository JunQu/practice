手写 Promise 符合 Promise/A+ 规范
链接：[手写一个 Promise](https://github.com/JunQu/blog/discussions/9)
同时手写一下 promises-tests 的类型声明文件
使用[promises-tests](https://github.com/promises-aplus/promises-tests)作为测试的基准
通过了它的 872 个测试
使用 [Vitest](https://vitest.dev/) 来测试typescript esm版本，用起来相当方便

**运行测试**
安装好依赖（`Vite,Vitest, Promise-tests`）后，使用如下命令测试:
```bash
vitest run ./promise.test.ts  --threads false
```


