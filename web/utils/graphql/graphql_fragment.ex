defmodule SamplePhoenixReactApp.GraphQlAst.Fragment do
  require Logger

  @moduledoc '''
  [kind: :FragmentDefinition, name: "f", selectionSet: [selections: ["s1", "s2"]]],
  [kind: :FragmentSpread, name: "f"]
  => ["s1", "s2"]

  [kind: :FragmentDefinition, name: "f", selectionSet: [selections: ["s1", "s2"]]],
  ["a1", "a2", [kind: :FragmentSpread, name: "f"]]
  => ["a1", "a2", "s1", "s2"]
  '''
  def spread(graphql) do
    graphql
    |> collect_fragment
    |> spread(graphql)
  end

  defp spread(fragments, graphql) do
    spreaded = spread_item(fragments, graphql)

    if has_fragment(spreaded) do
      spreaded = spread(fragments, spreaded)
    end

    spreaded
  end

  defp spread_item(fragments, [{:kind, :FragmentSpread} | _] = item) do
    name = item
    |> Keyword.get(:name)
    |> to_string

    fragments
    |> Map.get(name)
    |> Keyword.get(:selectionSet)
    |> Keyword.get(:selections)
  end

  defp spread_item(fragments, [{:kind, :FragmentDefinition} | _]) do
    nil
  end

  defp spread_item(fragments, [{:kind, _} | _] = item) do
    item
    |> Enum.map(
      fn {key, value} ->
        { key, spread_item(fragments, value) }
      end)
  end

  defp spread_item(fragments, [[{:kind, :FragmentSpread} | _] = hd|tl]) do
    spread_item(fragments, hd)
    |> List.flatten spread_item(fragments, tl)
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

  def has_fragment(graphql) do
    has_fragment(false, graphql)
  end

  defp has_fragment(visitor, [{:kind, :FragmentSpread} | _]) do
    true
  end

  defp has_fragment(visitor, [{:kind, _} | _] = item) do
    item
    |> Enum.reduce(visitor,
            fn ({key, value}, visitor) ->
              has_fragment(visitor, value)
            end)
  end

  defp has_fragment(visitor, [hd|tl]) do
    visitor
    |> has_fragment(hd)
    |> has_fragment(tl)
  end

  defp has_fragment(visitor, _) do
    visitor
  end
end
