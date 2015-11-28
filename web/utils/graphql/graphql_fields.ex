defmodule SamplePhoenixReactApp.GraphQlAst.Fields do
  require Logger

  @moduledoc '''
    [kind: SelectionSet, selections: [[kind: Field, name: "a1"], [kind: Field, name: "a2"], [kind: Field, name: "a1"]]]
    => [kind: SelectionSet, selections: [[kind: Field, name: "a1"], [kind: Field, name: "a2"]]]
  '''
  def remove_duplicated([{:kind, _} | _] = item) do
    item
    |> Enum.map(
      fn {key, value} ->
        case key do
          :selections -> {key, walk(MapSet.new(), value)}
          _-> { key, remove_duplicated(value) }
        end
      end)
  end

  def remove_duplicated([hd|tl]) do
    [remove_duplicated(hd)|remove_duplicated(tl)]
  end

  def remove_duplicated(item) do
    item
  end

  defp walk( walker, [[{:kind, _} | _] = hd|tl]) do
    result = []

    name = Keyword.get(hd, :name)
    unless MapSet.member?(walker, name) do
      walker = MapSet.put(walker, name)
      result = [remove_duplicated(hd)]
    end

    tl = walk(walker, tl)
    unless length(tl) == 0 do
      result = result ++ tl
    end

    result
  end

  defp walk( walker, item) do
    item
  end
end