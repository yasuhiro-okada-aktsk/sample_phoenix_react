defmodule SamplePhoenixReactApp.GraphQlUtils do
  require Logger

  def parse(query) do
    graphql = GraphQL.parse(query)
    normalized = normalize graphql

    #Apex.ap graphql
    Apex.ap normalize_debug graphql
    #Apex.ap normalized

    normalized
  end

  def test_normalize(graphql) do
    normalize(graphql)
  end

  def test_normalize_debug(graphql) do
    normalize_debug(graphql)
  end

  ## for debug
  defp normalize_debug([{:kind, _ = kind} | _ = optional] = item) do
    item = item
    |> Keyword.delete(:loc)

    Enum.map(item,
      fn {key, value} ->
        case key do
          :name -> { :name, to_string(value) }
          _ -> { key, normalize_debug(value) }
        end
      end)
  end

  defp normalize_debug([hd|tl]) do
    [normalize_debug(hd)| normalize_debug(tl)]
  end

  defp normalize_debug(item) do
    item
  end

  defp normalize([{:kind, _ = :Field} | _ = optional] = item) do
    item = [{:field, to_string(Keyword.get(item, :name))}]

    if Keyword.has_key?(optional, :arguments) do
      item = item ++ [{:arguments, normalize(Keyword.get(optional, :arguments))}]
    end

    if Keyword.has_key?(optional, :selectionSet) do
      # TODO get_into?
      selections = optional
      |> Keyword.get(:selectionSet)
      |> Keyword.get(:selections)

      item = item ++ [{:selections, normalize(selections)}]
    end

    optional = optional
    |> Keyword.delete(:name)
    |> Keyword.delete(:loc)
    |> Keyword.delete(:arguments)
    |> Keyword.delete(:selectionSet)

    unless length(optional) == 0 do
      Apex.ap optional
      raise "unhandled optionals"
    end

    item
  end

  defp normalize([{:kind, :SelectionSet} | _ = optional] = item) do
    selections = optional
    |> Keyword.get(:selections)
    |> normalize
  end

  defp normalize([{:kind, :InlineFragment} | _ = optional] = item) do
    optional
    |> Keyword.get(:selectionSet)
    |> normalize
  end

  defp normalize([{:kind, _ = kind} | _] = item) do
    item = item
    |> remove_kind
    |> Keyword.delete(:loc)

    Enum.map(item,
      fn {key, value} ->
        case key do
          :name -> {:name, to_string(value)}
          :definitions -> hd normalize(value)
          :selectionSet -> {:selections, normalize(Keyword.get(value, :selections))}
          _ -> {key, normalize(value)}
        end
      end)
  end

  defp normalize([hd|tl]) do
    item = [normalize hd]

    unless length(tl) == 0 do
      item = item ++ normalize(tl)
    end

    item
  end

  defp normalize(item) do
    item
  end

  defp remove_kind [{:kind, _ = kind} | _] = item do
      if kind in [:Document, :OperationDefinition, :SelectionSet] do
        item = Keyword.delete(item, :kind)
      end

      item
  end
end