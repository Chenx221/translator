# translator

## 如何使用

1. 安装[Git](https://git-scm.com/downloads/win)和[Nodejs](https://nodejs.org/en)(建议使用最新的LTS 22.14.0)
2. 打开命令提示符或Powershell，克隆本仓库并`npm install`
```
	git clone https://github.com/Chenx221/translator.git
	cd translator
	npm install
```
3. 复制示例配置文件`.env.example`为`.env`，这将作为必需的配置文件
4. 阅读项目doc文件夹中的配置说明并对.env进行修改，至少设定一个TRANSLATION_SERVICES翻译服务
5. 启动项目
```
	npm start
```
6. 项目默认监听本地3005端口，若前面配置无误，即可开始使用
7. 测试DEMO以及文档可以在项目启动后访问`http://localhost:3005`

## 示例

```javascript
fetch('http://127.0.0.1:3005/translate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ text: "hello world" })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

```
curl -X POST "http://127.0.0.1:3005/translate" -H "Content-Type: application/json" -d "{\"text\": \"hello world\"}"
```

```json
{"translation":"你好世界​\n你好世界"}
```
