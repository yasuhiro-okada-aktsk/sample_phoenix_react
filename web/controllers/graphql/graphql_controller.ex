defmodule SamplePhoenixReactApp.Graphql.GraphqlController do
  use SamplePhoenixReactApp.Web, :controller

  require Logger

  def query(conn, %{"query" => query}) do
    graphql = GraphQL.parse(query)

    operation = graphql
    |> Keyword.get(:definitions)
    |> hd()
    #Logger.debug Apex.ap operation

    unless Keyword.get(operation, :operation) == :query do
      raise "unknown operation : #{inspect Keyword.get(operation, :operation)}"
    end

    variables = Keyword.get(operation, :variableDefinitions)
    selectionSet = Keyword.get(operation, :selectionSet)

    #Apex.ap variables
    Logger.debug inspect selectionSet
    Apex.ap selectionSet

    nomalize_selection selectionSet

    json conn, %{}
  end

  # SelectionSet
  defp nomalize_selection([kind: :SelectionSet, loc: _, selections: selections]) do
    Logger.debug "nomalize SelectionSet"
    Logger.debug inspect selections
    #Apex.ap selections

    nomalize_selection selections
  end

  defp nomalize_selection([kind: :Field, loc: _, name: name, selectionSet: selectionSet]) do
    Logger.debug "nomalize Field"
    Logger.debug inspect selectionSet
    #Apex.ap selections
    nomalize_selection selectionSet
  end

  defp nomalize_selection([kind: :Field, loc: _, name: name, arguments: arguments, selectionSet: selectionSet]) do
    Logger.debug "nomalize Field (arguments)"
    #Apex.ap selections
  end

  defp nomalize_selection([hd|tl]) do
    Logger.debug "nomalize list"
    #Logger.debug inspect hd
    #Apex.ap hd
    nomalize_selection hd
    nomalize_selection tl
  end

  defp nomalize_selection([]) do
    # noop
  end

  defp nomalize_selection(x) do
    Logger.debug "nomalize unhandled"
    Logger.debug x
  end
end
