## 参考にさせていただいたリポジトリ

https://github.com/17number/chrome-extension-template-webpack-babel

## このテンプレートについて

上記参考にさせていただいたリポジトリの構成を元に、TypeScript の開発環境を作りました。

ついでに manifest も v3 にしようとしましたが、ホットリロードで使用している
[rubenspgcavalcante/webpack-extension-reloader](https://github.com/rubenspgcavalcante/webpack-extension-reloader)
が v3 未対応だったので断念しました。

今後、webpack-extension-reloader が更新されるか、他のライブラリを発掘した時にでも修正しようと思います。

## TypeScript のままでデバッグする方法について

[こちらで](https://takumi-oda.com/blog/2021/06/09/i-made-a-template-for-making-a-chrome-extension-with-typescript/)
詳細を書いています。

Chrome の開発者ツールを使って TypeScript のコードのままブレークポイントはったりしてデバッグできます。
