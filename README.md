# 無限ローディング

`useSWRInfinite`と`useInView`を用いて実装

## getServerSidePropsについて

- ページがレンダリングされる前に、サーバーサイドでデータを取得して、そのデータをページに渡すことができる。これにより、初回アクセス時にデータが表示されるため、UXを向上させることができる。
- 非同期関数であるため、APIを呼び出すこともできる
- getServerSidePropsでデータを取得して、そのデータをuseSWRInfiniteのfallbackDataに渡すことで、ページがレンダリングされる前にデータを表示することができる。


## `getServerSideProps`で取得したデータを`useSWRInfinite`の`fallbackData`に設定することのメリット

- ページがレンダリングされる前に、最新の投稿を表示することができる
- ページがレンダリングされる前に、ローディング画面にデータを表示することもできる