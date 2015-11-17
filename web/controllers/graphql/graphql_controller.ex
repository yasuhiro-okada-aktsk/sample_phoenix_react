defmodule SamplePhoenixReactApp.Graphql.GraphqlController do
  use SamplePhoenixReactApp.Web, :controller

  require Logger
  require QueryEx

  alias SamplePhoenixReactApp.GraphQlUtils

  alias SamplePhoenixReactApp.RssFeed
  alias SamplePhoenixReactApp.RssEntry

  def query(conn, %{"query" => query}) do
    graphql = GraphQlUtils.parse(query)

    json = %{}
    |> handle_graphql(graphql)

    json conn, json
  end

  # query
  defp handle_graphql(walker, [{:operation, :query} | _] = graphql) do
    modelSelections = Keyword.get(graphql, :selections)
    unless length(modelSelections) == 1 do
      raise "still unsupported : #{inspect modelSelections}"
    end

    modelSelections = hd(modelSelections)

    model =
    case Keyword.get(modelSelections, :field) do
      "feeds" -> RssFeed
      _ -> raise "unknown model : #{inspect Keyword.get(graphql, :field)}"
    end

    fieldSelections = Keyword.get(modelSelections, :selections)
    if is_list(hd(hd(fieldSelections))) do
      fieldSelections = hd fieldSelections
    end

    cols = Enum.map(fieldSelections, &(Keyword.get(&1, :field)))

    Logger.debug inspect cols

    feeds = model
    |> QueryEx.select(cols)
    |> Repo.all

    %{data: %{feeds: feeds}}
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
end
