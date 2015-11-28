defmodule SamplePhoenixReactApp.Api.V1.GraphqlController do
  use SamplePhoenixReactApp.Web, :controller

  require Logger
  require QueryEx

  alias SamplePhoenixReactApp.GraphQlAst

  alias SamplePhoenixReactApp.RssFeed
  alias SamplePhoenixReactApp.RssEntry

  def query(conn, %{"query" => query}) do
    graphql = GraphQlAst.parse(query)

    json = %{}
    |> handle_graphql(graphql)

    json conn, json

#    json conn, %{"data" =>
#      %{"feedList" =>
#        %{ "feeds" => [
#            %{"id" => "1", "title" => "title1", "subtitle" => "subtitle1", "summary" => "summary1"},
#            %{"id" => "2", "title" => "title1", "subtitle" => "subtitle1", "summary" => "summary1"}
#          ]
#        }
#      }
#    }
  end

  # query
  defp handle_graphql(walker, [{:operation, :query} | _] = graphql) do
    modelSelections = Keyword.get(graphql, :selections)

    %{data: query_model(modelSelections)}
  end

  defp handle_graphql(walker, [hd|tl]) do
    # TODO async
    walker
    |> handle_graphql(hd)
    |> handle_graphql(tl)
  end

  defp handle_graphql(walker, []) do
    walker
  end

  defp query_model([field: "feedList", selections: _ = selections]) do
    %{feedList: query_model(selections)}
  end

  defp query_model([field: "feeds", selections: _ = selections]) do
#    if is_list(hd(hd(selections))) do
#      selections = hd selections
#    end

    cols = Enum.map(selections, &(Keyword.get(&1, :field)))

    feeds = RssFeed
    |> QueryEx.select(cols)
    |> Repo.all
    # id を文字にする
    |> Enum.map(
      fn feed ->
        Map.update!(feed, :id, &to_string(&1))
      end)

    %{feeds: feeds}
  end

  defp query_model([hd|tl]) do
    query_model(hd)
    |> Map.merge query_model(tl)
  end

  defp query_model([]) do
    %{}
  end
end
