defmodule SamplePhoenixReactApp.GraphQl.Fragment do
  require Logger

  def spread(graphql) do
    graphql
    |> collect_fragment
    |> spread_item(graphql)

  end

  defp spread_item(fragments, [{:kind, :FragmentSpread} | _] = item) do
    name = item
    |> Keyword.get(:name)
    |> to_string

    fragments
    |> Map.get(name)
    |> Keyword.get(:selectionSet)
  end

  defp spread_item(fragments, [{:kind, :FragmentDefinition} | _]) do
    nil
  end

  defp spread_item(fragments, [{:kind, _} | _] = item) do
    Enum.map(item,
      fn {key, value} ->
        { key, spread_item(fragments, value) }
      end)
  end

  defp spread_item(fragments, [hd|tl]) do
    [ spread_item(fragments, hd) | spread_item(fragments, tl) ]
  end

  defp spread_item(fragments, item) do
    item
  end

  def collect_fragment(graphql) do
    collect_fragment %{}, graphql
  end

  defp collect_fragment(visitor, [{:kind, :FragmentDefinition} | _] = item) do
    name = item
    |> Keyword.get(:name)
    |> to_string

    Map.put(visitor, name, item)
  end

  defp collect_fragment(visitor, [{:kind, _} | _] = item) do
    item
    |> Enum.reduce(visitor,
            fn ({key, value}, visitor) ->
              collect_fragment(visitor, value)
            end)
  end

  defp collect_fragment(visitor, [hd|tl]) do
    visitor
    |> collect_fragment(hd)
    |> collect_fragment(tl)
  end

  defp collect_fragment(visitor, item) do
    visitor
  end
end
