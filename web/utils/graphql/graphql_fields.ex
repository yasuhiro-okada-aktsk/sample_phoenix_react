defmodule SamplePhoenixReactApp.GraphQlAst.Fields do
  require Logger

  @moduledoc '''
    [kind: SelectionSet, selections: [[kind: Field, name: "a1"], [kind: Field, name: "a2"], [kind: Field, name: "a1"]]]
    => [kind: SelectionSet, selections: [[kind: Field, name: "a1"], [kind: Field, name: "a2"]]]
  '''
  def remove_duplicated([{:kind, _} | _] = item) do
    if Keyword.has_key?(item, :selections) do
      item = item
      |> Keyword.update!(:sections, &walk(MapSet.new(), &1))
    end

    item
  end

  defp walk( walker, [[{:kind, _} | _] = hd|tl]) do
    result = []

    name = Keyword.get(hd, :name)
    unless MapSet.member?(walker, name) do
      walker = MapSet.put(walker, name)
      result = hd
    end

    result ++ walk(walker, tl)
  end

  defp walk( walker, item) do
    item
  end
end