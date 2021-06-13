# remote-patient-monitoring-dashboard

## Build Setup

### Requirements
- node version 12.x
- yarn

### Preparation
`.env.example`をコピーして`.env`ファイルを作成してください
```bash
$ cp .env.example .env
```

`.env`ファイルを編集して以下の環境変数を設定します

- `CLIENT_URL`: [`remote-patient-monitoring-client`](https://github.com/codeforjapan/remote-patient-monitoring-client)のURL。`/#`まで含んだ形で設定してください
- `API_URL`: [`remote-patient-monitoring-api`](https://github.com/codeforjapan/remote-patient-monitoring-api/)のURL。`/api/nurse`まで含んだ形で設定してください

### Build and Run

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

このプロジェクトは[Nuxt.js](https://nuxtjs.org)で動いています。
より詳しい情報は公式のドキュメントを参照してください。

## ライセンス

GNU AGPL v3 です。
