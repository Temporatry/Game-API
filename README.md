[![CircleCI](https://circleci.com/bb/mrjum/quapni-api.svg?style=svg)](https://circleci.com/bb/mrjum/quapni-api)
[![codecov](https://codecov.io/bb/mrjum/quapni-api/branch/develop/graph/badge.svg?token=qDOkVYvuJN)](https://codecov.io/bb/mrjum/quapni-api)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/airbnb/javascript)
[![node-version][node-image]][node-url]
[![Bitbucket license][license-image]][license-url]

# Quapni-康迪薾戶外 API
## Getting Started
### Clone Project
你可以使用 `git` 指令將專案 clone 下來，亦可使用 [Sourcetree](https://www.sourcetreeapp.com/) 將此專案 clone 至本機中。

```bash
$ git clone https://ab24627375@bitbucket.org/mrjum/quapni-api.git
$ cd  quapni-api
```

### Installation
[clone 專案](#clone-project) 至本機後，移至該目錄專案下並安裝 Node.js 所需的依賴，你可以使用 yarn(推薦) 或 npm 作為套件管理工具。

```bash
$ yarn install # 若尚未安裝 yarn 請使用 npm install 替代
```

> 本專案以 `yarn` 作為此開發中的套件管理工具，[learn more](https://andy6804tw.github.io/2017/12/15/Yarn-tutorial/)。

### Running the Project
[安裝](#installation)完成此專案所需的套件後，你可以啟動並測試此專案。

| script | Description |
| ------| ------ |
| start | 快速啟動API並監聽 `3030` PORT |
| debug | 開發者模式，nodemon 監聽檔案 |
| build | babel將此專案封裝打包(ES6->ES5)，並產出 `dist` 資料夾 |
| serve | 啟動正式(product)版本，(須先 build) |
| test | 使用 mocha 進行單元測試(BDD) |
| report-coverage | 檢查覆蓋率並將結果傳送 `codecov` |

> report-coverage 已與 CircleCI 連動故在本機中盡量別太常去呼叫此指令，此指令執行後計算完覆蓋率立即傳送報告至 `codecov`。 

## Support

### Contact
- Developer: 蔡易霖 (Tsai,Yi-Lin )
- Email: andy6804tw@gmail.com

### Document
- [API文件](https://hackmd.io/t6OeBGEuT0WXz7-Gr3Az9A)
- [Database文件](https://drive.google.com/open?id=1LGg4ktF7mhj0fv3aVM_Gk0Urbfa28u2J2kas74t9_zc)

### Reference
更多詳情請參考

- 從無到有，打造一個漂亮乾淨俐落的 RESTful API  
  - [iT幫版](https://ithelp.ithome.com.tw/users/20107247/ironman/1312)
  - [GitBook好讀版](https://andy6804tw.gitbooks.io/restful-api/content/)

## LICENSE
ISC

[license-image]: https://img.shields.io/badge/license-ISC-blue.svg
[license-url]: https://github.com/andy6804tw/Mocha-Chai-tutorial/blob/master/LICENSE
[node-image]: https://img.shields.io/badge/node-%3E%3D8.9.0-orange.svg
[node-url]: https://nodejs.org/en/
