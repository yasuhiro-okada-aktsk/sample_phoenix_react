# SamplePhoenixReactApp
Phoenix + React のサンプル

* react は npm版を使う。
* URL が hashbang ではない Single Page Application。
  * 基本的には、SPA用のjsを読み込むページが表示され、jsでルーティングする。
* /static以下は、SPA用のjsが読み込まれないようにする。
* release build
   * fontなどをハッシュ付きのものにする: phoenix 1.0.3で無理(?)
* deploy
   * ecto.create / ecto.migration
       * [Accessing Mix tasks from release · Issue #67 · bitwalker/exrm](https://github.com/bitwalker/exrm/issues/67)
       * [Convenience hacks for using exrm with Phoenix apps](http://hashnuke.com/2015/07/19/convenience-hacks-for-using-exrm-with-phoenix-apps.html)
       * [Deploying database schemas - Google グループ](https://groups.google.com/forum/#!topic/phoenix-talk/Y0mzKqRSkyc)
       * [How to run Ecto migrations from an exrm release](https://gist.github.com/antipax/90cc36d29c2a2a5d4629)
       ```elixir
       ./bin/sample_phoenix_react rpc Elixir.Ecto.Storage up "['Elixir.SamplePhoenixReactApp.Repo']."

       ./bin/sample_phoenix_react rpc Elixir.Ecto.Migrator run "['Elixir.SamplePhoenixReactApp.Repo', <<\"/home/vagrant/server/lib/sample_phoenix_react-0.0.1/priv/repo/migrations\">>, up, [{all, true}]]."
       # => []
       ```

## To do
1. ogp meta data
1. test (react / phoenix)
1. redux
1. webpack
